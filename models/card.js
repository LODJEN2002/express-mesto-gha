const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /https?:\/\/\S+/.test(v);
        },
        message: (props) => `${props.value} Это не url!`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
