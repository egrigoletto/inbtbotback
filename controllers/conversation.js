const axios = require('axios');
const dotenv = require("dotenv").config();

const getConversationToken = async (sessionToken) => {
  const reqHeaders = { 
    headers: {
      'Content-Type': 'application/json', 
      'x-inbenta-key': process.env.INBENTA_KEY,
      'x-inbenta-source': 'webchat',
      'x-inbenta-env': 'development',
      'Authorization': sessionToken
    }
  };
  const data = {
    answers: {
      sideBubbleAttributes: [
        "SIDEBUBBLE_TEXT"
      ],
      answerAttributes: [
        "ANSWER_TEXT"
      ],
      skipLastCheckQuestion: true,
      maxOptions: 5,
      maxRelatedContents: 1
    },
    lang: "pt-br",
    timezone: "America/Sao_Paulo"
}
  const conversationResponse = await axios.post('https://api.inbenta.io/v1/conversation', data, reqHeaders)
  return conversationResponse.data
}

module.exports = {
  getConversationToken
}
