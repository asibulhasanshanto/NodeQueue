const task = function (i) {
  console.log(`Task ${i} running`);
};

const handler = (i) => {
  task(i);
};

module.exports = {
  task,
  handler,
};
