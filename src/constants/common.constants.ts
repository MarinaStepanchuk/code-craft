const Patch = {
  main: '/',
  profile: '/profile',
};

const ErrorMessages = {
  unknown: 'Something went wrong, send your request later.',
  invalidEmail: "the email is not valid",
  invalidPassword: "password should have a minimum length of 8 symbols, at least one letter, one digit, one special character",
  passwordMismatch: "the passwords don't match",
  fieldIsEmpty: "field is empty",
  tooBigPhoto: 'File size should not exceed 400kb',
  errorUserUpdate: 'Failed to update user data, try again later',
  errorLoadingImage:'Error loading image, try again later or use another image',
  post: {
    errorBanner: 'The post must contain a banner.',
    errorTitle: 'The post must have a header of at least 3 characters in length.',
    errorContent: 'The post text is missing.',
    errorTags: 'The post must contain at least 1 tag.',
  }
};

const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

// eslint-disable-next-line no-useless-escape
const regPassword = /(?=.*[0-9])(?=.*[!@#$%^&:;~\?\/\*\.\,\[\]\-\+\(\)\<\>])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&:;~\?\/\*\.\,\[\]\-\+\(\)\<\>]{8,}/g;

const colors = {
  primaryColor: '#d4331e',
  secondaryColor: '#86a1ae',
  secondaryDark: '#05386B',
  textDark: '#05386B',
  textLight: '#dee2d9'
}

export { Patch, ErrorMessages, regEmail, regPassword, colors };
