exports = function(args) {
  const db = context.services.get("mongodb-atlas").db("swagstore");
  const products = db.collection("products");
  return products.updateMany({ inventory: { $lt: 1 } }, { $set: { "inventory" : 100 } });
};