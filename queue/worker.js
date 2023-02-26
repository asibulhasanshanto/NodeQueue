const { Worker, QueueEvents } = require("bullmq");
const redisConnection = { host: "localhost", port: 6379 };
const { handler, task } = require("./task.js");

const queueEvents = new QueueEvents("my-queue", {
  connection: redisConnection,
});

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`\nJob ${jobId} is waiting`);
});

queueEvents.on("active", ({ jobId, prev, ...others }) => {
  console.log(`\nJob ${jobId} is active. previous state: ${prev}`);
});

queueEvents.on("completed", ({ jobId, returnvalue, prev, ...others }) => {
  console.log(
    `\nJob ${jobId} is completed. previous state: ${prev} and return value: ${returnvalue}`
  );
});

queueEvents.on("failed", ({ jobId, failedReason, prev, ...others }) => {
  console.log(
    `\nJob ${jobId} is failed. previous state: ${prev} and failed reason: ${failedReason}`
  );
});

const worker = new Worker(
  "my-queue",
  async (job) => {
    // console.log(job.data);
    await handler(job.data.iteration);
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!\n\n`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}\n\n`);
});

console.log("my-queue", " worker started", new Date().toTimeString());
