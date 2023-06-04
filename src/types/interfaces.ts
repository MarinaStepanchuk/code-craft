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
  title: string;
  content: string;
  banner: string;
  tags: Array<string>;
  viewCount: number;
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

export type { IUser, IPost, IFormDataProfile };
