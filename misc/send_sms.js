const twilio = require("twilio");
const config = require("../config/send_sms")

accountSid = config.TWILIO_SID
authToken = config.TWILIO_AUTHTOKEN
const client = require("twilio")(config.accountSid, config.authToken);

client.messages
  .create({
    body: "Thank you message has been received please stay put, you will will be attended to ASAP",
    from: "+18329254018",
    to: `${req.body.phoneNo}`
  })