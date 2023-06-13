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
  tags: Array<ITag> | null;
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

interface IPostWithUser extends IPost {
  user: IUser;
}

interface IExpandedPost extends IPostWithUser {
  countLikes: number;
  isLiked: boolean;
}

interface IComment {
  id: number;
  message: string;
  parentId: number | null;
  createdDate: Date;
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
    email: string;
  };
}

export type { IUser, IPost, IFormDataProfile, IPostWithUser, ITag, IExpandedPost, IComment };
