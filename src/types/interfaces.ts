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
  text: string;
  banner: string;
  viewCount: number;
  likeCount: number;
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
