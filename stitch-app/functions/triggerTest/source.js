exports = function(event){
  const twilio = context.services.get("twilio");
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const events = db.collection("events");
  const users = db.collection("users");
  //Test sending SMS via the twilio service
  // twilio.send({
  //   to: "+12158666036",
  //   from: '+12018066646',
  //   body: "Event " + event.operationType
  // });
  return true;
};