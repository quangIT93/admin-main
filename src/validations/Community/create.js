
const validator = require('validator');

const createCommunityValidation = (post) => {

  if (post.title.trim() === "") {
    return {
      isError: true,
      message: "Tên công việc không hợp lệ",
      field: "title",
    };
  }
  return {
    isError: false,
  };
};

export default createCommunityValidation;
