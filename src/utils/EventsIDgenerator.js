const generatePostId = () => {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  const number = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");

  return `IEEE${month}${date}${number}`;
};

export default { generatePostId };