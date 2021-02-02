const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Profile = require("./../models/Profile");

const passport = require("passport");
const validateProfileInput = require("./../validations/profile");
const validateExperienceInput = require("./../validations/experience");
const validateEducationInput = require("./../validations/education");
const multer = require("multer");
const sharp = require("sharp");
const image = multer({
  // dest: 'avtaar',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
});

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const errors = {};
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");
    // console.log(profile);
    if (!profile) {
      errors.noprofile = "There is no profile for this account";
      return res.status(400).send(errors);
    }
    // console.log(profile);
    await profile.save();
    res.send(profile);
  }
);

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id });
    // console.log(profile.interests)

    const profiles = await Profile.find({
      interests: profile.interests[0],
      name: { $ne: profile.name },
    }).populate("user");
    // console.log(profiles);
    // const profiles=Profile.find({})
    res.send(profiles);
  }
);

router.get("/username/:username", async (req, res) => {
  const errors = {};
  const user = await User.findOne({
    username: req.params.username,
  });
  if (!user) {
    errors.nouser = "There is no user of this username";
    return res.status(400).send(errors);
  }
  const profile = await Profile.findOne({
    user: user._id,
  }).populate("user");

  if (!profile) {
    errors.noprofile = "There is no profile for this user";
    return res.status(400).send(errors);
  }
  res.send(profile);
});

router.post(
  "/",

  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
      // console.log(req.body)
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.company) profileFields.company = req.body.company;

    if (typeof req.body.interests != undefined) {
      req.body.interests = req.body.interests.split(",");
      profileFields.interests = req.body.interests;
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.githubusername) profileFields.social.githubusername=req.body.githubusername;
    const profile = await Profile.findOne({
      user: req.user.id,
    });
console.log(profileFields)
    if (profile) {
      //update
      const updatedProfile = await Profile.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $set: profileFields,
        },
        {
          new: true,
        }
      );

      try {
        await updatedProfile.save();
        return res.send(updatedProfile);
      } catch (e) {
        return res.status(500).send({
          errorhere: e,
        });
      }
    }

    const newProfile = new Profile(profileFields);
    try {
      await newProfile.save();
      res.send(newProfile);
    } catch (e) {
      res.status(500).send({
        error: e,
      });
    }
  }
);

router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //Valid
    if (!isValid) {
      return res.status(400).send(errors);
    }

    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.noprofile = "Profile does not exist";
      return res.status(404).send(errors);
    }

    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };
    //Add to experience array
    profile.experience.unshift(newExp);
    try {
      await profile.save();
      res.send(profile);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      errors.noprofile = "Profile not exist";
      return res.status(400).send(errors);
    }
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };
    profile.education.unshift(newEdu);
    try {
      await profile.save();
      res.send(profile);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

//@route delete /profile/experience/experienceid
//@desc  delete experience
//@access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const errors = {};

    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.noprofile = "Profile does not exist";
      return res.status(404).send(errors);
    }

    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    //Spilice array
    profile.experience.splice(removeIndex, 1);
    try {
      await profile.save();
      res.send(profile);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
//@route delete /profile/education/education_id
//@desc  delete education
//@access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const errors = {};
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      errors.profile = "Profile does not exist";
      return res.status(404).send(errors);
    }
    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);

    try {
      await profile.save();
      res.send(profile);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const errors = {};
    try {
      await Profile.findOneAndRemove({
        user: req.user.id,
      });
    } catch (e) {
      res.status(500).send({
        profileerror: e,
      });
    }
    try {
      await User.findOneAndRemove({
        _id: req.user.id,
      });
      res.send({
        sucess: true,
      });
    } catch (e) {
      res.status(500).send({
        usererror: e,
      });
    }
  }
);




router.post(
  "/profileimage/upload",
  passport.authenticate("jwt", { session: false }),
  image.single("image"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    req.user.avtaar = buffer;
    await req.user.save();
    res.send("Sucess");
  }
);

module.exports = router;
