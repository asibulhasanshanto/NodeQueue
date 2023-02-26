const { addQueueItem } = require("./queue/queue.js");

const emails = [
  {
    username: "user1",
    subject: "subject1",
    message: "message1",
  },
  {
    username: "user2",
    subject: "subject2",
    message: "message2",
  },
  {
    username: "user3",
    subject: "subject3",
    message: "message3",
  },
];

const main = async () => {
  for (const email of emails) {
    await addQueueItem(email);
  }
};

main();
