interface IUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  twitter?: string;
  mail?: string;
  instagram?: string;
}

interface IPost {
  id: number;
  title: string | null;
  content: string | null;
  banner: string | null;
  tags: Array<string> | null;
  viewCount: number | null;
  updatedDate: Date;
  UserId: string;
}

interface IFormDataProfile {
  name: string;
  bio: string;
  mail: string;
  twitter: string;
  instagram: string;
  photo: string;
}

interface IPostWithUser {
  post: IPost;
  user: IUser;
}

export type { IUser, IPost, IFormDataProfile, IPostWithUser };
