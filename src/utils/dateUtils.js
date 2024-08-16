// src/utils/dateUtils.js
import { format, isToday, isYesterday, differenceInMinutes, differenceInHours } from 'date-fns';

export const formatPostDate = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);

  const minutesAgo = differenceInMinutes(now, postDate);
  const hoursAgo = differenceInHours(now, postDate);

  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo < 24 && isToday(postDate)) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (isYesterday(postDate)) {
    return 'Yesterday';
  } else if (postDate.getFullYear() === now.getFullYear()) {
    return format(postDate, 'dd MMM');
  } else {
    return format(postDate, 'dd MMM yyyy');
  }
};
