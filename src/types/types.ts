type ActiveComment = {
  id: number;
  type: 'replying' | 'editing';
};

type NotificationMessageType = {
  type: 'like' | 'dislike' | 'follow' | 'unfollow' | 'comment' | 'reply';
  message: string;
  userId?: string;
  postId?: number;
  userName?: string;
  postTitle?: string;
  comment?: string;
};

export type { ActiveComment, NotificationMessageType };
