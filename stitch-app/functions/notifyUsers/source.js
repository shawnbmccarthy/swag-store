exports = function(event){
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const users = db.collection("users");
  const events = db.collection("events");
  const twilio = context.services.get("twilio");
  
  const product = event.fullDocument;
  var eventDoc = event;
  delete eventDoc._id;
  eventDoc.date_created = new Date();

  events.insertOne({event: eventDoc});
  console.log("Eventdoc: " + JSON.stringify(eventDoc));
  return users.find({"notify.id": product.id})
    .toArray()
    .then(notifyUsers => {
      notifyUsers.forEach(user => {
        // Add item to cart
        context.functions.execute("addToCart", product.id, 1, user.user_id)
        .then(() => {
          // Send Text
          return twilio.send({
            to: user.phone,
            from: context.values.get("twilioNumber"),
            body: `Hi ${user.firstname}!  We wanted to let you know that ${product.name} is back in stock.  We have added it to your cart at https://https://mdb-swag-store.netlify.com/cart` 
          });
        })
        .then(() => {
          // Update notify Array
          let newNotif = user.notify;
          let index = newNotif.indexOf(product.id);
          if(index < 1){
            return users.updateOne({"_id":user._id},{"$set": {"notify": []}});
          } else {
            return users.updateOne({"_id":user._id},{"$set": {"notify": newnotif.splice(index,1)}});
          }
        });
      });
      return true;
    });
};