const task = function (username, subject, message) {
  console.log(
    `Sending email to ${username} with subject ${subject} and message ${message}`
  );
};

const handler = (data) => {
  task(data.username, data.subject, data.message);
};

module.exports = {
  handler,
};
