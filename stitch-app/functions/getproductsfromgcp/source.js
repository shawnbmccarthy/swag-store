exports = function() {
  //services
  const gcp = context.services.get("GoogleCloudRec");
  const mongodb = context.services.get("mongodb-atlas");
  //my swagstore collection
  const users = mongodb.db("swagstore").collection("users");
  const products = mongodb.db("swagstore").collection("products");

  return users.findOne({user_id: context.user.id})
    .then(user => {
      if(!user.gcpId) {
        return [];
      }
      //URL to GCP cloud endpoint
      const url = `https://jfmlrecengine.appspot.com/recommendation?userId=${user.gcpId}`;
      return gcp.get({ url }).then(response => { 
        console.log("Retrieved Recommendations");
        return EJSON.parse(response.body.text());
      })
      .then(result => {
        // Get the product info for the array of product ids
        return products.find({id: {"$in": result.articles}}, {_id:0, id:1, name:1, image:1}).toArray();
      })
      .then(products => {
        console.log(JSON.stringify(products));
        // Write the products to the user document
        return users.updateOne({"gcpId": user.gcpId}, { $set: { "personalized_recs" : products}})
          .then(() => { return products });
      });
    });
};

