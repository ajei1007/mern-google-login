const express = require('express');
const logger = require('morgan');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config({
  path: path.join(__dirname, './config/dev.env'),
});

const authRouter = require('./routes/auth');

const app = express();

app.use(logger('combined'));
app.use(express.json());

app.use('/api/auth/', authRouter);

// catch 404
app.use(function (req, res, next) {
  res.status(404).send();
});

// global error handler
app.use(function (err, req, res, next) {
  console.log("start");
  res.status(500).send();
});

const PORT = process.env.PORT || 5000;


const verifyTransport = async (transport) => {
  return new Promise((resolve) => {
    transport.verify((err, success) => {
      if (err) {
        // console.log(err.message);
        resolve(err);
      } else {
        console.log(success);
        resolve(true);
      }
    });
  });
};

app.listen(PORT, async () => {
  try {
    const email = "mlsgunn@milllane.org.uk";
    const password = "A1exE11en";
    const transport = nodemailer.createTransport({
      // host: "smtp-mail.outlook.com",
      host: "smtp.office365.com",
      port: 587,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
      requireTLS: true,
    });
    const isTransportVerified = await verifyTransport(transport);
    console.log('Transport Verification Result:', isTransportVerified);
    // Continue with your logic based on the verification result
    console.log(`server started of port ${PORT}`)
  } catch (error) {
    console.error('Error verifying transport:', error);
    // Handle errors
  }

});

module.exports = app;
