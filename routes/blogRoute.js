const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateBlogInput = require("./../validations/Blog.js");
const Blog = require("./../models/Blog");
const User = require("./../models/User");
const Profile = require("./../models/Profile");
const validateCommentInput = require("./../validations/comment");
const multer = require("multer");
const sharp = require("sharp");
const BlogImage = require("./../models/Blogimage");

const image = multer({
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
});

router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      date: -1,
    });
    res.send(blogs);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/particular/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateBlogInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    if(!req.body.imageid){
      errors.photo='Please upload atleast 1 photo'
      return res.status(400).send(errors)
    }
    const Images = await BlogImage.findById(req.body.imageid);

    const blogField = {};
    console.log(req.body.text)
    if(req.body.text) blogField.text=req.body.text
    blogField.user = req.user.id;
    blogField.username = req.user.username;
    if (req.user.avtaar) blogField.useravtaar = req.user.avtaar;
    if (req.body.title) blogField.title = req.body.title;
    if (req.body.subtitle) blogField.subtitle = req.body.subtitle;
    if (req.body.imageid) blogField.imageid = req.body.imageid;

    if (req.body.tags) {
      req.body.tags = req.body.tags.replace(/\s+/g, "").slice(1).split("#");
      blogField.tags = req.body.tags;
    }
    if (req.body.topics) {
      req.body.topics = req.body.topics.replace(/\s+/g, "").slice(1).split("@");
      blogField.topics = req.body.topics;
    }

    const newBlog = new Blog(blogField);
    try {
      await newBlog.save();
      Images.blogid = newBlog._id;
      await Images.save();
      res.send(newBlog);
    } catch (e) {
      res.status(400).send({
        nopost: "No Blog Found",
      });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.send({ sucess: true });
    } catch (e) {
      res.status.send({
        nopost: "Blog Not Found",
      });
    }
  }
);

router.post(
  "/like/:blogid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogid);
      console.log(
        blog.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      );
      if (blog) {
        if (
          blog.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).send({
            alreadyliked: "User already likes",
          });
        }
        //Add user id to likes array
        blog.likes.unshift({
          user: req.user.id,
        });
        await blog.save();
        res.send(blog);
      }
    } catch (e) {
      res.status(400).send({
        profileError: "Profile not found",
      });
    }
  }
);

router.post(
  "/unlike/:blogid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogid);

      if (
        blog.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .send({ notLiked: "User has not liked the post" });
      }
      const removeIndex = blog.likes.map(
        (item) => item.user.toString() === req.user.id
      );
      blog.likes.splice(removeIndex, 1);
      await blog.save();
      res.send(blog);
    } catch (e) {
      res.status(500).send({
        profilerror: "Profile not found",
      });
    }
  }
);

router.post(
  "/comment/:blogid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    try {
      const blog = await Blog.findById(req.params.blogid);
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
      };
      blog.comment.unshift(newComment);
      await blog.save();
      res.send(blog);
    } catch (e) {
      res.status(500).send({
        error: e,
      });
    }
  }
);

router.post(
  "/comment/reply/:blogId/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }

    const blog = await Blog.findById(req.params.blogId);
    const comment = blog.comment.filter(
      (item) => item._id.toString() === req.params.commentId
    );

    if (!comment) {
      return res.status(400).send({ nocomment: "Comment not found" });
    }
    const newReply = {
      user: req.user.id,
      name: req.user.name,
      text: req.body.text,
    };

    comment[0].replies.unshift(newReply);
    try {
      await blog.save();
      res.send(blog);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/comment/:blogid/:commentid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogid);

      if (
        blog.comment.filter(
          (comment) => comment._id.toString() === req.params.commentid
        ).length == 0
      ) {
        return res
          .status(400)
          .send({ commentnotexist: "Comment does not exist" });
      }
      const removeIndex = blog.comment
        .map((comment) => comment._id.toString())
        .indexOf(req.params.commentid);
      blog.comment.splice(removeIndex, 1);
      await blog.save();
      res.send(blog);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/comment/reply/:blogId/:commentId/:replyid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      const comment = blog.comment.filter(
        (item) => item._id.toString() === req.params.commentId
      );
      const replyArray = comment[0].replies.filter(
        (item) => item._id.toString() === req.params.replyid
      );
      if (replyArray.length == 0) {
        return res
          .status(400)
          .send({ commentnotexist: "Comment does not exist" });
      }
      // console.log(replyArray)
      const removeIndex = replyArray
        .map((item) => item._id.toString())
        .indexOf(req.params.replyid);
      //  console.log(comment[0].replies)
      //  console.log(removeIndex)

      comment[0].replies.splice(removeIndex, 1);
      // console.log(blog)
      await blog.save();
      res.send(blog);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
router.post(
  "/image",
  passport.authenticate("jwt", { session: false }),
  image.array("image", 6),
  async (req, res) => {
    let bufferarray = [];
    for (let i = 0; i < req.files.length; i++) {
      const image = await sharp(req.files[i].buffer).png().toBuffer();
      bufferarray.push(image);
    }

    // console.log(bufferarray)
    const imagedata = {
      image: bufferarray,
      username: req.user.username,
    };

    try {
      const response = await new BlogImage(imagedata);
      await response.save();
      res.send(response._id.toString());
    } catch (e) {
      res.status(500).send({
        error: e,
      });
    }
  }
);

router.get(
  "/:imageid/avtaar/:index",

  async (req, res) => {
    let errors = {};

    try {
      const blogImg = await BlogImage.findById(req.params.imageid);
      if (!blogImg) {
        errors.image = "Invalid Request";
      }
      res.set("Content-Type", "image/png");

      res.send(blogImg.image[req.params.index]);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
