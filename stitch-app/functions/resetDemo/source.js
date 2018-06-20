/*
  This function will reset the database to an initial demo state
  1) Reset Product Inventory
     a) Set all products inventory to 100
     b) Set onesie and Umbrella to 0
  2) Reset Demo Users
     a) Update orders to 1 previous orders
     b) Clear the notify array
     c) Clear the cart subdocument
     d) Clear the browsed_products array
*/
exports = function(){
  // Jane's 10gen Google User, Jane's gmail Google User
  const user_ids = ["5b106408b8b9984781410483", "5b1ec609cfb737f114be80d1", "5b0fed928f25b92336bb0b76", "5b1fde858f25b99214e2da0a"];
  // Product.id for Onesie, Umbrella
  const product_ids = ["299816215", "299826775"];
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const users = db.collection("users");
  const products = db.collection("products");
  const orders = [{
    id: "123",
    date_created: new Date('2017-12-24T03:24:00'),
    status: "completed",
    total: 190,
    products: [
      {
        id: "299865757",
        name: "Marmot Mens Tempo Jacket", 
        image: {
          large: "/images/products/marmot/large_mens.jpg",
          thumb: "/images/products/marmot/thumb_mens.jpg"
        }, 
        price: 95, 
        quantity: 1
      },
      {
        id: "299935287",
        name: "Marmot Ladies Tempo Jacket", 
        image: {
          large: "/images/products/marmot/large_ladies.jpg",
          thumb: "/images/products/marmot/thumb_ladies.jpg"
        }, 
        price: 95, 
        quantity: 1
      }
    ]
  }];
  
  products.updateMany({}, {$set: {inventory: 100}})
    .then(() => {
      console.log('All inventories set to 100');
      return products.updateMany({id: {$in: product_ids}}, {$set: {inventory: 0}})
        .then(() => {
          console.log(`Following product inventory set to 0: ${product_ids.join(', ')}`);
        });
    });
    
  users.updateMany({user_id: {$in: user_ids}}, {$set: {
    cart: {},
    notify: [],
    browsed_products: [],
    orders
  }})
    .then(() => {
      console.log('Users have been reset.');
    });

  return true;
};