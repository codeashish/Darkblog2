const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validateBlogInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : "";
  data.topics = !isEmpty(data.topics) ? data.topics : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  } else {
    if (validator.isEmpty(data.topics)) {
      errors.topics = "Topics are required";
    } else {
      if (validator.isEmpty(data.text)) {
        errors.text = "Text is required";
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
