const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { bool } = require("sharp");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avtaar: {
      type: Buffer,
    },
    totallikes: {
      type: Number,
      default: 0,
    },
    totalcomments: {
      type: Number,
      default: 0,
    },
    verified:{
      type:Boolean,
      default:false
    },
    receivenews:{
      type:String,
      default:'notagree'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.createjwttoken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "14d",
    }
  );
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userobj = user.toObject();

  delete userobj.avtaar;
  return userobj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
