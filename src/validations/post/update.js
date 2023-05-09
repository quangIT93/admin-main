import { validatePhoneNumber } from "utils";

const updatePostValidation = (post) => {
  if (!post.title.trim()) {
    return {
      isError: true,
      message: "Tiêu đề không hợp lệ",
      field: "title",
    };
  }
  if (!post.companyName) {
    return {
      isError: true,
      message: "Tên công ty không hợp lệ",
      field: "companyName",
    };
  }
  if (!post.wardId) {
    return {
      isError: true,
      message: "Quận/Huyện không hợp lệ",
      field: "wardId",
    };
  }
  if (!post.address) {
    return {
      isError: true,
      message: "Tên đường không hợp lệ",
      field: "address",
    };
  }
  // if (post.phoneContact && !validatePhoneNumber(post.phoneContact)) {
  //   return {
  //     isError: true,
  //     message: "Số điện thoại không hợp lệ",
  //     field: "phoneContact",
  //   };
  // }
  if (
    !Number.isInteger(post.isDatePeriod) ||
    post.isDatePeriod < 0 ||
    post.isDatePeriod > 1
  ) {
    return {
      isError: true,
      message: "Thông tin không hợp lệ",
      field: "isDatePeriod",
    };
  }
  if (
    !post.startTime ||
    !post.endTime ||
    new Date(post.startTime).toString() === "Invalid Date" ||
    new Date(post.endTime).toString() === "Invalid Date"
  ) {
    return {
      isError: true,
      message: "Thời gian làm việc không hợp lệ",
      field: "startTime | endTime",
    };
  }
  if (!Number.isInteger(post.salaryMin) || post.salaryMin < 1000) {
    return {
      isError: true,
      message: "Giá trị lương không hợp lệ",
      field: "salaryMin",
    };
  }
  if (!Number.isInteger(post.salaryMax) || post.salaryMax < 1000) {
    return {
      isError: true,
      message: "Giá trị lương không hợp lệ",
      field: "salaryMax",
    };
  }
  if (!Number.isInteger(post.salaryType)) {
    return {
      isError: true,
      message: "Phương thức tính lương không hợp lệ",
      field: "salaryType",
    };
  }
  if (
    !Number.isInteger(post.isWorkingWeekend) ||
    post.isWorkingWeekend < 0 ||
    post.isWorkingWeekend > 1
  ) {
    return {
      isError: true,
      message: "Thông tin không hợp lệ",
      field: "isWorkingWeekend",
    };
  }
  if (
    !Number.isInteger(post.isRemotely) ||
    post.isRemotely < 0 ||
    post.isRemotely > 1
  ) {
    return {
      isError: true,
      message: "Thông tin không hợp lệ",
      field: "isRemotely",
    };
  }
  if (!post.description.trim()) {
    return {
      isError: true,
      message: "Thông tin mô tả bài viết không hợp lệ",
      field: "description",
    };
  }
  if (post.categoryIds.length === 0) {
    return {
      isError: true,
      message: "Vui lòng chọn danh mục ngành nghề",
      field: "category",
    };
  }

  return {
    isError: false,
  };
};

export default updatePostValidation;
