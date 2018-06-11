/**
 * @notifyMe 
 * Provides notification via twitter for a product in stock to a single user.
 *
 *  params: product_id.  ID of the product to notify.  product.id
 *          user_id.  ID of the user to be notified.
 */
exports = function(user_id, product_id){

  const db = context.services.get("mongodb-atlas").db("swagstore");
  const users = db.collection("users");
  const products = db.collection("products");
  products.findOne({"id": product_id})
    .then(product => {
      console.log("Product: " + product.id);
      console.log("User: " + user_id + "...");
      // users.findOne({"user_id": user_id})
      // .then(user => {
        let user = {
          firstname: 'joe',
          lastname: 'mamma',
          user_id: user_id,
          phone: '+12158666036'
        };
        console.log("User: " + user.user_id);
        let noteDoc = {
          name: user.firstname + ' ' + user.lastname,
          number: user.phone
        };
        console.log("Note: " + noteDoc);
        console.log("Product: " + product_id);
        
        return products.updateOne({
          "id": product_id
        },{
          "$push": { "notify": noteDoc }
        });
    });
};