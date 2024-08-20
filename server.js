const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebase');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <form action="/send-notification" method="POST">
      <input type="text" name="token" placeholder="Device Token" required /><br/>
      <input type="text" name="title" placeholder="Title" required /><br/>
      <textarea name="description" placeholder="Description" required></textarea><br/>
      <button type="submit">Send Notification</button>
    </form>
  `);
});

app.post('/send-notification', (req, res) => {
  const { token, title, description } = req.body;

  const message = {
    notification: {
      title: title,
      body: description,
    },
    token: token,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send('Failed to send notification');
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
