const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 3000;
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'notifications';

app.use(express.json());

const NUM_NOTIFICATIONS = 1000; // Adjust as needed


app.get('/sendNotification', async (req, res) => {
  try {
    // const { message } = req.body;
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    
    for (let i = 0; i < NUM_NOTIFICATIONS; i++) {
        const message = `Notification ${i + 1}`;
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
        console.log(`Sent notification: ${message}`);
      }
    console.log(`Produced ${NUM_NOTIFICATIONS} notifications.`);
    // channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    const timerID = setTimeout(async function () {
        await channel.close();
        await connection.close(); process.exit(0); }, 60000);
        clearTimeout(timerID)
    // await channel.close();
    // await connection.close();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Producer service is running on port ${PORT}`);
});
