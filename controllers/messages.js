const axios = require('axios');
const dotenv = require("dotenv").config();

const retrieveAnswers = async (conversationData, sentMessage) => {
  const reqHeaders = { 
    headers: {
      'Content-Type': 'application/json', 
      'x-inbenta-key': process.env.INBENTA_KEY,
      'x-inbenta-session': conversationData.sessionToken,
    }
  };
  const data = { 
    message: sentMessage,
    option: '10',
    directCall: 'DIRECT_CALL',
  }
  const sessionResponse = await axios.post('https://api.inbenta.io/v1/conversation/message', data, reqHeaders)
  return sessionResponse.data
}


module.exports = {
  retrieveAnswers,
}
