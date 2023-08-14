export const timePost = (createdAt) => {
  const months = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];

  const createPost = new Date(createdAt);
  const now = Date.now();
  const difference = (now - createPost.getTime()) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seg`;
  if (difference >= 60 && difference < 3600)
    return `${Math.floor(difference / 60)} min`;
  if (difference >= 3600 && difference < 86400)
    return `${Math.floor(difference / 3600)} h`;
  if (difference >= 86400)
    return `${createPost.getDate()} ${
      months[createPost.getMonth()]
    } ${createPost.getFullYear()}`;
};
