interface IUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  twitter?: string;
  mail?: string;
  instagram?: string;
  bookmarks?: string;
  accessToken?: string;
}

interface IUsers {
  users: IUser[];
  page: number;
  amountPages?: number;
  amountUsers?: number;
}

interface IFullUser extends IUser {
  countPosts: number;
  countFollowers: number;
}

interface ITag {
  id: number;
  name: string;
  count?: number;
}

interface ITags {
  tags: ITag[];
  page: number;
  amountPages?: number;
  amountTags?: number;
}

interface IPost {
  id: number;
  title: string | null;
  content: string | null;
  banner: string | null;
  tags: Array<ITag> | null;
  viewCount: number | null;
  updatedDate: Date;
  createdDate: Date;
  userId: string;
  likesCount?: number;
}

interface IPosts {
  posts: IPost[];
  page: number;
  amountPages: number;
  amountPosts: number;
}

interface IFormDataProfile {
  name: string;
  bio: string;
  mail: string;
  twitter: string;
  instagram: string;
  photo: string;
}

interface IPostWithUser extends IPost {
  user: IUser;
}

interface IPostsWithUser {
  posts: Array<IPostWithUser>;
  page: number;
  amountPages?: number;
  amountPosts?: number;
}

interface IComment {
  id: number;
  message: string;
  parentId: number | null;
  createdDate: Date;
  updatedDate: Date;
  postId: number;
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
    email: string;
  };
}

interface IBackendError {
  data: {
    errors?: string[];
    message: string;
    status: number;
  };
}

interface IChatAIMessage {
  role: string;
  content: string;
}

interface ISubscriber {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
}

interface INotification {
  id: number;
  message: string;
}

export type {
  IUser,
  IPost,
  IPosts,
  IFormDataProfile,
  IPostWithUser,
  ITag,
  IComment,
  IBackendError,
  IChatAIMessage,
  IPostsWithUser,
  IFullUser,
  ISubscriber,
  ITags,
  IUsers,
  INotification,
};
