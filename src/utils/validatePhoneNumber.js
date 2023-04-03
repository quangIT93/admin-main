const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegexWith0 = new RegExp(/^(0[2|3|5|7|8|9])+([0-9]{8,9})\b$/);
  const phoneNumberRegexWith84 = new RegExp(/^(84)+([0-9]{10,11})\b$/);
  return (
    phoneNumberRegexWith0.test(phoneNumber) ||
    phoneNumberRegexWith84.test(phoneNumber)
  );
};

export default validatePhoneNumber;
