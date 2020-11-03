const axios = require('axios');
const dotenv = require("dotenv").config();
const moment = require('moment')

const getSession = async () => {
  const reqHeaders = { 
    headers: {
      'Content-Type': 'application/json', 
      'x-inbenta-key': 'nyUl7wzXoKtgoHnd2fB0uRrAv0dDyLC+b4Y6xngpJDY='
    }
  };
  const data = { secret: process.env.SECRET_KEY }
  const sessionResponse = await axios.post('https://api.inbenta.io/v1/auth', data, reqHeaders)
  return sessionResponse.data
}

const checkSessionExpiration = (session) => {
  return moment.unix() > session.expiration
}

module.exports = {
  getSession,
  checkSessionExpiration,
}
