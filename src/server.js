const app = require('./app');
const dotenv = require("dotenv").config();
const HOST = '0.0.0.0';
const accessPort = process.env.PORT || 8080

app.listen(accessPort, () => {
  console.log('Server Online at port', accessPort)
})