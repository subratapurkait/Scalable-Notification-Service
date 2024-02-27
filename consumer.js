// consumer.js
const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 3001;
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'notifications';

app.use(express.json());

app.get('/receiveNotification', async (req, res) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    console.log('Consumer waiting for messages...');
    channel.consume(QUEUE_NAME, (message) => {
      const msg = message.content.toString();
      console.log(`Received message: ${msg}`);
      // Process notification (e.g., send email, SMS, etc.)
      channel.ack(message);
    });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Consumer service is running on port ${PORT}`);
});
