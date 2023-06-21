type NotificationMessage = {
  type: 'like' | 'dislike' | 'follow' | 'unfollow' | 'comment' | 'reply';
  userId?: string;
  postId?: number;
  userName?: string;
  postTitle?: string;
  comment?: string;
};

const createNotificationMessage = ({
  type,
  postId,
  userName,
  userId,
  postTitle,
  comment,
}: NotificationMessage): string => {
  switch (type) {
    case 'like':
      return JSON.stringify({
        type,
        postId,
        userName,
        userId,
        message: `liked your post`,
        postTitle,
      });
    case 'dislike':
      return JSON.stringify({
        type,
        postId,
        userName,
        userId,
        message: `removed the likes from your post`,
        postTitle,
      });
    case 'follow':
      return JSON.stringify({
        type,
        userId,
        userName,
        message: `subscribed to you`,
      });
    case 'unfollow':
      return JSON.stringify({
        type,
        userId,
        userName,
        message: `unsubscribed from you`,
      });
    case 'comment':
      return JSON.stringify({
        type,
        postId,
        postTitle,
        comment,
        message: `has a new comment`,
      });
    default:
      return '';
  }
};

export default createNotificationMessage;
