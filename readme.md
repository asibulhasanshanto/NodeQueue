# Simple Queue Branch

### This branch contains simple queue implementation with a single task and single handler for that task. The perpose of this project is to understand how the queue works and how to implement it. You can ignore the code in this branch if you already know the basics of queue.

## How to run

1. Clone the repository
2. Install dependencies
   ```bash
   yarn install
   ```
3. Run Redis server
4. Start the queue
   ```bash
   yarn queue
   ```
5. Start the main process
   ```bash
   yarn start
   ```

## How it works

![Simple queue](/assets/simple-queue.jpg)

### The picture above shows the working principle of the queue.

The main process adds a task to the queue by calling the `addIQueuItem()` function.

```javascript
const main = async () => {
  for (const email of emails) {
    await addQueueItem(email);
  }
};
```

This addQueueItem function comes from the queue module. It adds a single item to the queue named "my-queue"

```javascript
const addQueueItem = async (item) => {
  await queue.queueObject.add("my-queue", item, {
    removeOnComplete: true,
    removeOnFail: false,
  });
};
```

The worker process continuously checks for new items in the queue and when it finds one, it processes it by calling the handler function.

```javascript
const worker = new Worker(
  "my-queue",
  async (job) => {
    // console.log(job.data);
    await handler(job.data);
  },
  { connection: redisConnection }
);
```

The handler function is decleared in the task file which simply executes the task method.

```javascript
const task = function (username, subject, message) {
  console.log(
    `Sending email to ${username} with subject ${subject} and message ${message}`
  );
};

const handler = (data) => {
  task(data.username, data.subject, data.message);
};
```
