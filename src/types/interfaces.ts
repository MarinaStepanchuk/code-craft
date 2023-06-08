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

interface ITag {
  id: number;
  name: string;
  count?: number;
}

interface IPost {
  id: number;
  title: string | null;
  content: string | null;
  banner: string | null;
  Tags: Array<ITag> | null;
  viewCount: number | null;
  updatedAt: Date;
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

export type { IUser, IPost, IFormDataProfile, IPostWithUser, ITag };
