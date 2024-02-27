# Scalable-Notification-Service
RabbitMQ, Node, Express

after installing rabbitmq 
start - rabbitmq command prompt
type this and hit enter - rabbitmq-plugins enable rabbitmq_management

# Project Title

A brief description of what this project does and who it's for


Here's a basic architectural diagram:


                                     +-------------------+
                                     |   Load Balancer   |
                                     +---------+---------+
                                               |
                                  +------------+------------+
                                  |                         |
                         +--------v---------+       +-------v--------+
                         |   Notification  |       |   Notification  |
                         |   Service #1    |       |   Service #2    |
                         +-----------------+       +-----------------+
                                  |                         |
                         +--------v---------+       +-------v---------+
                         |   Message Queue  |       |   Message Queue |
                         |   (RabbitMQ)     |       |   (RabbitMQ)    |
                         +--------+---------+       +-------+---------+
                                  |                         |
                         +--------v---------+       +-------v--------+
                         |   Backend Storage|       | Backend Storage|
                         |   (MongoDB)      |       | (MongoDB)      |
                         +-----------------+       +-----------------+


## API Reference

#### Receive all notifications

```http
  GET http://localhost:8080/receiveNotification
```

#### Send all notifications

```http
  GET http://localhost:8080/sendNotification
```
