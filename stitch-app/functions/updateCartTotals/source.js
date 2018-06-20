exports = function(user_id=context.user.id){
  
  const users = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  
  return users.findOne({user_id: user_id})
    .then(user => {
      let totalQuantity = 0;
      let totalPrice = 0;
      user.cart.products.forEach(product => {
        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + (product.price * product.quantity);
      });
      user.cart.totalQuantity = totalQuantity;
      user.cart.totalPrice = totalPrice;
      return users.updateOne(
        {user_id: user_id},
        {"$set": { cart: user.cart }}
      );
    });
};