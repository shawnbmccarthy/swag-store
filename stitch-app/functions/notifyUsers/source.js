exports = function(event){
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const users = db.collection("users");
  const events = db.collection("events");
  const twilio = context.services.get("twilio");
  
  const product = event.fullDocument;
  const eventDoc = event;
  delete eventDoc._id;
  
  eventDoc.date_created = new Date();
  events.insertOne({event: eventDoc});

  let inStockNotif = function(user, product){
    // Add item to cart, then send text, then change the notification array
    return context.functions.execute("addToCart", product.id, 1, user.user_id)
    .then(() => {
      return twilio.send({
        to: user.phone,
        from: context.values.get("twilioNumber"),
        body: `Hi ${user.firstname}!  We wanted to let you know that ${product.name} is back in stock.  We have added it to your cart at https://mdb-swag-store.netlify.com/cart` 
      });
    })
    .then(() => {
      let newNotif = JSON.parse(JSON.stringify(user.notify));
      let index = user.notify.indexOf(product.id);
      if(index < 1 && user.notify.length == 1){
        return users.updateOne({"_id":user._id},{"$set": {"notify": []}});
      } else {
        return users.updateOne({"_id":user._id},{"$set": {"notify": newNotif.splice(index,1)}});
      }
    });
  };
  
  try{
    return users.find({"notify": product.id}).toArray().then(notifyUsers => {
      return Promise.all(notifyUsers.map(function(user) {return inStockNotif(user, product)}));
    });
  } 
  catch(error){
    console.log(eror);
  }
};