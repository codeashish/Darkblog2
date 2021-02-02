const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("./../validations/register");
const validateLoginInput = require("./../validations/login");
const User = require("./../models/User");
const multer = require("multer");
const sharp = require("sharp");
const passport = require("passport");
const {sendWelcomeEmail} = require("./../emails/account");
const { send } = require("@sendgrid/mail");




const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }
  const usernameexist = await User.findOne({
    username: req.body.username,
  });
  if (usernameexist) {
    errors.username = "Username already taken";
    return res.status(400).send(errors);
  }
  const emailexist = await User.findOne({
    email: req.body.email,
  });
  if (emailexist) {
    errors.email = "Email already exist try Login";
    return res.status(400).send(errors);
  }
  

  try {
    const user = new User(req.body);
    const token = await user.createjwttoken();
    await user.save();
    const link=`http://localhost:8080/users/9GgULSXsEUtwjl7p/vdpewxdzf725knhdzyqqryg5yxbj6i/${user._id}/ivac8m953z8vwpqqxmjuaitbwdz4zu`
    sendWelcomeEmail(user,link)
    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    errors.username = "User not Found";
    return res.status(400).send(errors);
  }
  const verified= user.verified;
  if(!verified){
    errors.verified="Email is not verified.Please verify your email"
    return res.status(400).send(errors)
  }
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) {
    errors.password = "Password not matched";
    return res.status(400).send(errors);
  }
  const token = await user.createjwttoken();

  res.send({
    user,
    token,
  });
});

router.get('/9GgULSXsEUtwjl7p/vdpewxdzf725knhdzyqqryg5yxbj6i/:id/ivac8m953z8vwpqqxmjuaitbwdz4zu',async(req,res)=>{
  try{
  const user=await User.findById(req.params.id)
  if(user.verified){
    res.status(400).send('Unauthorized to this page')
  }
  user.verified=true
  await user.save()
  res.send('You are verified...You can close this page and have login')
  }catch(e){
    res.status(500).send({errors:e})
  }
})



router.post(
  "/image/upload",
  passport.authenticate("jwt", {
    session: false,
  }),
  upload.single("File"),
  async (req, res) => {
console.log(req.file)
    try {
      const user = await User.findById(req.user.id);
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 40,
          height: 40,
        })
        .png()
        .toBuffer();
      user.avtaar = buffer;
      await user.save();
      res.send(user);
    } catch (e) {
      res.send({ errors: e });
    }
  }
);

router.delete(
  "/image/delete",
  passport.authenticate(
    "jwt",
    {
      session: "false",
    },
    upload.single("avtaar")
  ),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    user.avtaar = undefined;
    await user.save();
    return res.send(user);
  }
);

router.get("/:username/avtaar", async (req, res) => {
  let errors = {};
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    if (!user || user.avtaar) {
      errors.avtaar = "Invalid request";
    }
    res.set("Content-Type", "image/png");
    res.send(user.avtaar);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
