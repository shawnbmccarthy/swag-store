exports = function(){
  const mongodb = context.services.get("mongodb-atlas");
  const users = mongodb.db("swagstore").collection("users");
  const products = mongodb.db("swagstore").collection("products");
  const twilio = context.services.get("twilio");
  console.log("Twilio Number: " + context.values.get("twilioNumber"));
  // Test sending SMS via the twilio service
  // twilio.send({
  //   to: "+12158666036",
  //   from: '+12018066646',
  //   body: "Hi Mike - We're letting you know that your product is back in stock!"
  // });
  products
    .find({"notify":{"$exists":true, "$ne":[]}})
    .toArray()
    .then(docs => {
      docs.forEach(document => {
        for (var i in document.notify) {
          console.log(document.notify[i].name + '|' + document.notify[i].number);
          twilio.send({
            to: document.notify[i].number,
            from: context.values.get("twilioNumber"),
            body: "Hi " + document.notify[i].name + " - We're letting you know that " + document.name + " is back in stock!"
          });
          console.log( "Hi " + document.notify[i].name + " - We're letting you know that " + document.name + " is back in stock!");
        }
      });
    });
    return true;
};