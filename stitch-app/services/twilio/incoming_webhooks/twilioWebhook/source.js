/*
  mlynn: receive incoming sms and evaluate the from number.  If it's coming from a valid user and that user has
  admin privileges, then replenish stock items.
*/
  
exports = function(args) {
    var db = context.services.get("mongodb-atlas").db("swagstore");
    
    const twilio = context.services.get("twilio");
    console.log("Twilio Number: " + context.values.get("twilioNumber"));
    // Test sending SMS via the twilio service
    twilio.send({
      to: args.From,
      from: '+12018066646',
      body: "Inventory request received"
    });
      
    db.collection("users").findOne({
        "phone": args.From,
        "admin": true
    }).then(user => 
      {
        console.log(user);
        
        if (true) {
          context.functions.execute("replenishProducts").then(response => {
          return "function ran";
        });
      }
    });


};