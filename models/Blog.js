const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 1,
      maxlength: 150,
    },
    subtitle: {
      type: String,
      minlength: 2,
      maxlength: 100,
    },
    imageid:{
      type:String
    },
    topics: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],

    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    comment: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            text: {
              type: String,
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    text: {
      type:String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username:{
      type:String,

    },
    useravtaar:{
      type:Buffer
    }

  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
