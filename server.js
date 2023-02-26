const { addQueueItem } = require("./queue/queue.js");

for (let i = 0; i < 10; i++) {
  addQueueItem({ iteration: i });
}
