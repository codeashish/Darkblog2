const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 40,
    },
    age: {
      type: Number,
      min: 3,
      max: 110,
    },
    phonenumber: {
      type: Number,
      minlength: 6,
      maxlength: 12,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    social: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      githubusername: {
        type: String,
      },
      linkedin:{
          type:String
      }
    },
    title: {
      type: String,
    },
    company:{
        type:String
    },
    
    location: {
      type: String,
    },

    website: {
      type: String,
    },
    interests: {
      type: [String],
    },
    bio: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    experience: [
      {
        title: {
          type: String,
          // require: true
        },
        company: {
          type: String,
          // require: true
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
          // required: true
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          // require: true
        },
        degree: {
          type: String,
          // require: true
        },
        fieldofstudy: {
          type: String,
          // required: true
        },
        from: {
          type: Date,
          // required: true
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
