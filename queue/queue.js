const { Queue } = require("bullmq");

const redisConnection = { host: "localhost", port: 6379 };

//create a queue
const queue = {
  name: "my-queue",
  queueObject: new Queue("my-queue", { connection: redisConnection }),
};

const addQueueItem = async (item) => {
  await queue.queueObject.add("my-queue", item, {
    removeOnComplete: true,
    removeOnFail: false,
  });
};

module.exports = { addQueueItem };
