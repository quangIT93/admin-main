import { validatePhoneNumber } from "utils";

const createPostValidation = (post) => {
  if (post.title.trim() === "") {
    return {
      isError: true,
      message: "Tên công việc không hợp lệ",
      field: "title",
    };
  }
  if (post.companyName.trim() === "") {
    return {
      isError: true,
      message: "Tên công ty không hợp lệ",
      field: "companyName",
    };
  }
  if (post.wardId.trim() === "") {
    return {
      isError: true,
      message: "Phường/Xã không hợp lệ",
      field: "wardId",
    };
  }
  if (post.address.trim() === "") {
    return {
      isError: true,
      message: "Tên đường không hợp lệ",
      field: "address",
    };
  }
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
    new Date(post.startTime).toString() === "Invalid Date" ||
    new Date(post.endTime).toString() === "Invalid Date"
  ) {
    return {
      isError: true,
      message: "Thời gian làm việc không hợp lệ",
      field: "startTime | endTime",
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
  if (
    !Number.isInteger(post.salaryMin) ||
    !Number.isInteger(post.salaryMax) ||
    +post.salaryMin > +post.salaryMax
  ) {
    return {
      isError: true,
      message: "Tiền lương không hợp lệ",
      field: "salaryMin | salaryMax",
    };
  }
  if (
    !Number.isInteger(post.salaryType) ||
    post.salaryType < 1 ||
    post.salaryType > 5
  ) {
    return {
      isError: true,
      message: "Thông tin không hợp lệ",
      field: "salaryType",
    };
  }
  if (
    !Number.isInteger(post.moneyType) ||
    post.moneyType < 1 ||
    post.moneyType > 2
  ) {
    return {
      isError: true,
      message: "Thông tin không hợp lệ",
      field: "moneyType",
    };
  }
  // if (post.phoneNumber && !validatePhoneNumber(post.phoneNumber)) {
  //   return {
  //     isError: true,
  //     message: "Số điện thoại không hợp lệ",
  //     field: "phoneNumber",
  //   };
  // } else if (post.phoneNumber === "") {
  //   return {
  //     isError: true,
  //     message: "Số điện thoại của bạn không được để trống",
  //     field: "phoneNumber",
  //   };
  // }
  if (!post.description.trim()) {
    return {
      isError: true,
      message: "Thông tin mô tả không hợp lệ",
      field: "description",
    };
  }
  if (post.description.trim().length > 4000) {
    return {
      isError: true,
      message: `Thông tin mô tả vượt quá 4000 kí tự (${
        post.description.trim().length
      })`,
      field: "description",
    };
  }
  if (post.categories.length === 0) {
    return {
      isError: true,
      message: "Vui lòng chọn danh mục công việc",
      field: "category",
    };
  }
  return {
    isError: false,
  };
};

export default createPostValidation;
