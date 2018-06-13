/**
 * Update user document for current user with a notify array of products to be notified upon replenishment
 * params: product_id - id of product to notify once replenished.
 * Note: addToSet only appends an element to the array if it is not already present.
 */
exports = function(product_id){
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const products = db.collection("products");
  const users = db.collection("users");
  
  return products.findOne({id: product_id})
    .then(product => {
      return users.updateOne({"user_id":context.user.id},{"$addToSet": { notify: {id: product_id, name: product.name}}});
    })
    .then(() => {
      return users.findOne({"user_id":context.user.id}, {_id:0, notify: 1});
    });
};