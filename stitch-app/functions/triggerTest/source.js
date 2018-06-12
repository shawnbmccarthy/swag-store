exports = function(){
  const mongodb = context.services.get("mongodb-atlas");
  const test = mongodb.db("swagstore").collection("test");
  const twilio = context.services.get("twilio");
  //Test sending SMS via the twilio service
  twilio.send({
    to: "+12158666036",
    from: '+12018066646',
    body: "Hi Mike - We're letting you know that your triggers test succeeded!"
  });
  return true;
};