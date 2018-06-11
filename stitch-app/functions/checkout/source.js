exports = function(){
  /*
    Copy Products, Total Price into new Order
    Push onto User.Orders
    Clear Cart
    Update Totals
    Return Orders and Cart
  */
  const users = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  return users.findOne({ user_id: context.user.id })
    .then(user => {
      let id = "" + new Date().getUTCMilliseconds();
      user.orders = user.orders || [];
      const orders = [...user.orders];
      orders.push({
        id,
        "date_created": new Date(),
        status: "pending",
        total: user.cart.totalPrice,
        products: user.cart.products
      });
      let emptyCart = { products: [], totalPrice: 0, totalQuantity: 0 };
      
      return users.updateOne(
        {user_id: context.user.id},
        {"$set": { cart: emptyCart, orders: orders }}
      );
    })
    .then(result => {
      return users.findOne({user_id: context.user.id}, {_id: 0, cart: 1, orders: 1});
    });
};