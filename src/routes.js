const routes = require('express').Router();
const session = require('../controllers/session');
const conversation = require('../controllers/conversation');
const messages = require('../controllers/messages');
const dotenv = require("dotenv").config();


routes.get('/', async (req, res) => {
  const response = {
    message: "OK"
  }
  res
  .status(200)
  .send(response)
});

routes.get('/test', async (req, res) => {
  const response = {
    message: "Ok"
  }
  res
  .status(200)
  .send(response)
});

routes.get('/session', async (req, res) => {
  const response = await session.getSession();
  if (response.message) {
    res
    .status(500)
    .send(response.message)
  } else if(response.accessToken) {
    res
  .status(200)
  .send({
    accessToken: response.accessToken,
    expiration: response.expiration
  })
  } else {
    res.status(204)
  }
});

routes.post('/conversation', async (req, res) => {
  let sessionData = req.body.sessionData;
  if (!session.checkSessionExpiration(sessionData))
    sessionData = await session.getSession()
  const conversationData = await conversation.getConversationToken(sessionData.accessToken)
  res
  .status(200)
  .send([conversationData, sessionData])
})

routes.post('/sendMessage', async (req, res) => {
  const conversationData = req.body.conversationData;
  const messageSent = req.body.message;
  const messageData = await messages.retrieveAnswers(conversationData, messageSent);
  res
  .status(200)
  .send(messageData)
})

module.exports = routes;
