const Patch = {
  main: '/',
  me: '/me',
  profile: '/profile',
  publications: '/publications',
  signIn: '/signin',
  signUp: '/signup',
  newPost: '/newpost',
  post: '/post',
  author: '/author',
  bookmarks: '/bookmarks',
  feeds: '/feeds',
  searchPublications: '/search/publications',
  searchUsers: '/search/users',
  searchTags: '/search/tags',
  tag: '/tag',
};

const ErrorMessages = {
  unknown: 'Something went wrong, send your request later.',
  invalidData: 'The data entered is incorrect',
  invalidEmail: 'the email is not valid',
  invalidPassword:
    'password should have a minimum length of 8 symbols, at least one letter, one digit, one special character',
  passwordMismatch: "the passwords don't match",
  fieldIsEmpty: 'field is empty',
  tooBigPhoto: 'File size should not exceed 400kb',
  errorUserUpdate: 'Failed to update user data, try again later',
  errorLoadingImage: 'Error loading image, try again later or use another image',
  post: {
    errorBanner: 'The post must contain a banner.',
    errorTitle: 'The post must have a header of at least 3 characters in length.',
    errorContent: 'The post text is missing.',
    errorTags: 'The post must contain at least 1 tag.',
  },
  errorPostLoading: 'Loading error. Reload the page or try again later.',
  errorBookmarks: 'Failed to save bookmark.',
  errorResponse: 'Failed to receive data, please try again later.',
  errorRemoveSubscriber: 'Failed to remove signature, try again later.',
};

const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const regPassword =
  // eslint-disable-next-line no-useless-escape
  /(?=.*[0-9])(?=.*[!@#$%^&:;~\?\/\*\.\,\[\]\-\+\(\)\<\>])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&:;~\?\/\*\.\,\[\]\-\+\(\)\<\>]{8,}/g;

const colors = {
  primaryColor: '#d4331e',
  secondaryColor: '#86a1ae',
  secondaryDark: '#05386B',
  textDark: '#05386B',
  textLight: '#dee2d9',
};

const initialChatValue = [
  {
    role: 'assistant',
    content: "Hi 👋 ! It's good to see you!",
  },
  {
    role: 'assistant',
    content: 'How can I help you?',
  },
];

const baseUrl = 'https://code-craft-app.vercel.app/';

const rootMetadata = {
  title: 'Code Craft',
  description: 'Platform for posting articles on various topicsGenerated by create next app',
  keywords:
    'programming software development coding web development mobile development computer science programming languages algorithms data structures software engineering object-oriented programming agile methodology front-end development back-end development devops cloud computing machine learning artificial intelligence cybersecurity blockchain technology internet of things user experience user interface responsive design software testing version control debugging continuous integration open source',
  openGraph: {
    url: baseUrl,
    images: [
      'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Flog.jpg?alt=media&token=7f6061b8-c5f1-4558-b968-3a622926077e',
    ],
    title: 'Code Craft',
    description: 'Platform for posting articles on various topicsGenerated by create next app',
  },
  twitter: {
    title: 'Code Craft',
    description: 'Platform for posting articles on various topicsGenerated by create next app',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Flog.jpg?alt=media&token=7f6061b8-c5f1-4558-b968-3a622926077e',
    ],
  },
};

export {
  Patch,
  ErrorMessages,
  regEmail,
  regPassword,
  colors,
  initialChatValue,
  rootMetadata,
  baseUrl,
};
