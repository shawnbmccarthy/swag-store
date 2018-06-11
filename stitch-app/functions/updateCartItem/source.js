exports = function(productId, quantity=0){
  const users = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  return users.findOne({ user_id: context.user.id, "cart.products.id": productId })
    .then(user => {
      if(quantity === 0) {
        // delete product
        user.cart.products = user.cart.products.filter(product => product.id !== productId);
      } else {
        // update quantity
        user.cart.products = user.cart.products.map(product => {
          if(product.id === productId) {
            product.quantity = quantity;
          }
          return product;
        });
      }
      
      return users.updateOne(
        {user_id: context.user.id},
        {"$set": { cart: user.cart }}
      );
    })
    .then(result => {
      return context.functions.execute("updateCartTotals");
    })
    .then(result => {
      return users.findOne({user_id: context.user.id}, {_id: 0, cart: 1});
    });
};