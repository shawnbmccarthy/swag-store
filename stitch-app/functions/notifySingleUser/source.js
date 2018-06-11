/**
 * @notifySingleUser 
 * Provides notification via twitter for a product in stock to a single user.
 *
 *  params: product_id.  ID of the product to notify.  product.id
 *          user_id.  ID of the user to be notified.
 */

 
  exports = function(product_id, user_id){
  const mongodb = context.services.get("mongodb-atlas");
  const users = mongodb.db("swagstore").collection("users");
  const products = mongodb.db("swagstore").collection("products");
  const twilio = context.services.get("twilio");
  console.log("Twilio Number: " + context.values.get("twilioNumber"));
  // test sending SMS via the twilio service
  // twilio.send({
  //   to: "+12158666036",
  //   from: '+12018066646',
  //   body: "Hi Mike - We're letting you know that your product is back in stock!"
  // });
  users
    .findOne({"user_id":user_id})
    .then(user => {
      console.log( "Hi " + user.firstname + " - MongoDB SWAG Store here... We're letting you know that is back in stock!");
      products.findOne({"id":product_id}).then(product=> {
        twilio.send({
          to: user.phone,
          from: context.values.get("twilioNumber"),
          body: "Hi " + user.firstname + " - MongoDB SWAG Store here... We're letting you know that " + product.name + " is back in stock!"
        });
        console.log( "Hi " + user.firstname + " - MongoDB SWAG Store here... We're letting you know that " + product.name + " is back in stock!");
      });
    });
    return true;
};