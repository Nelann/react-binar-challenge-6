const randomize = (array) => {
  return array.sort(() => Math.random() - array.length);
};

export default randomize;
