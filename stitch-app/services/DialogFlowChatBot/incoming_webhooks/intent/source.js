// Try running in the console below.

exports = function(payload, response) {
  const mdb = context.services.get('mongodb-atlas');
  const mdb_data = mdb.db('chat').collection('conversation');
  const products = mdb.db('swagstore').collection('products');

  var item_color;
  var item_type;
  var item_size;
  
  var body = {};
  if (payload.body) {
    body = EJSON.parse(payload.body.text());
    mdb_data.insertOne(body);
    item_type = body.queryResult.parameters.product;
    if (typeof body.queryResult.parameters.color != "undefined" && body.queryResult.parameters.color.length > 0) {
      item_color = body.queryResult.parameters.color; 
    } else {
      item_color = "";
    }
    if (typeof body.queryResult.parameters.size != "undefined" && body.queryResult.parameters.size.length > 0) {
      item_size = body.queryResult.parameters.size; 
    } else {
      item_size = "";
    }
  }
  
  // TODO Used for debugging - remove for demo
  const logs = mdb.db('logs').collection('jesse');
  var log_data = {"created_at":new Date()};
  log_data.item_color = item_color;
  log_data.item_type = item_type;
  
  var product_data = {};
  
  var query = {};
  
  if (typeof item_type != "undefined" && item_type.length > 0) {
    query.type = item_type;
  }
  
  if (typeof item_color != "undefined" && item_color.length > 0) {
    query.color = item_color;
  }

  
  products.findOne(query).then(productFound => {
      //TODO - remove for demo (debugging only)
      log_data.productFound = JSON.stringify(productFound);
      if (typeof productFound.color != "undefined") {
        log_data.color_exists = true;
        product_data.fulfillmentText = "I found you a " 
                                      + productFound.color 
                                      + " " + productFound.name 
                                      + ". Check it out here: https://mdb-swag-store.netlify.com/products/" + productFound.id ;
        product_data.fulfillmentMessages = [
          {
            "card": {
              "title": productFound.name,
              "subtitle": "I found you a " + productFound.color + " " + productFound.name,
              "imageUri": "https://mdb-swag-store.netlify.com/" + productFound.image.large,
              "buttons": [
                {
                  "text": "Buy Now",
                  "postback": "https://mdb-swag-store.netlify.com/products/" + productFound.id
                }
              ]
            }
          }
        ];
        response.setBody(JSON.stringify(product_data));
      } else if (typeof productFound.type != "undefined") {
        log_data.color_exists = false;
        product_data.fulfillmentText = "I found you a " 
                                      + productFound.name 
                                      + ". Check it out here: https://mdb-swag-store.netlify.com/products/" + productFound.id ;
        product_data.fulfillmentMessages = [
          {
            "card": {
              "title": productFound.name,
              "subtitle": "I found you a " + productFound.name,
              "imageUri": "https://mdb-swag-store.netlify.com/" + productFound.image.large,
              "buttons": [
                {
                  "text": "Buy Now",
                  "postback": "https://mdb-swag-store.netlify.com/products/" + productFound.id
                }
              ]
            }
          }
        ];
        response.setBody(JSON.stringify(product_data));
      } else {
        product_data.fulfillmentText = "Sorry, I couldn't find a match. Please try again.";
        response.setBody(JSON.stringify(product_data));
        log_data.reponse = JSON.stringify(product_data);
      }
  }).catch(function(error, productFound) {
    log_data.nomatch = false;
    log_data.error = JSON.stringify(error);
    log_data.body.queryResult = body.queryResult;
    log_data.productFound = JSON.stringify(productFound);
    product_data.fulfillmentText = "Sorry, I couldn't find a match. Please try again.";
    response.setBody(JSON.stringify(product_data));
  });
  logs.insertOne(log_data);
  
  // End function here - ignore notes/comments below
  
  // if (typeof item_color != "undefined" && typeof item_type != "undefined") {
  //   products.findOne({ 
  //     "color": item_color, 
  //     "type": item_type 
  //   }).then(productFound => {
  //       log_data.productFound = JSON.stringify(productFound);
  //       product_data.fulfillmentText = "I found you a " 
  //                                       + productFound.color 
  //                                       + " " + productFound.name 
  //                                       + ". Check it out here: https://mdb-swag-store.netlify.com/products/" + productFound.id ;
  //       response.setBody(JSON.stringify(product_data));
  //   }).catch(function(error, productFound) {
  //     log_data.nomatch = false;
  //     log_data.error = JSON.stringify(error);
  //     log_data.body.queryResult = body.queryResult;
  //     log_data.productFound = JSON.stringify(productFound);
  //   });
  // } else {
  //   log_data.nomatch = true;
  //   log_data.body.queryResult = body.queryResult;
  // }
  
  
  
  /*
  db.products.createIndex(
    {name: "text", category: "text", about: "text"}, 
    {
      weights: {name: 10, category: 5, about: 1}, 
      name: "ProductSearchTextIndex" 
    })
    
  {
    $text:
      {
        $search: <string>,
        $language: <string>,
        $caseSensitive: <boolean>,
        $diacriticSensitive: <boolean>
      }
    }
    
    db.articles.find( { $text: { $search: "coffee" } } )
    
    db.articles.aggregate(
     [
       { $match: { $text: { $search: "cake" } } },
       { $group: { _id: null, views: { $sum: "$views" } } }
     ]
  )

  */ 
  
  
  // if (typeof item_color != "undefined" && typeof item_type != "undefined") {
  //   var cursor = products.aggregate([
  //     {
  //       "$match": { "$text": { "$search": item_type } }
  //     }
  //   ]);
  //   var doc = cursor.toArray()[0];
  //   log_data.productFound = JSON.stringify(doc);
  //   product_data.fulfillmentText = doc.sku;
  //   response.setBody(JSON.stringify(product_data));
  //   // .then(productsFound => {
  //   //   var myArray = productsFound.toArray();
  //   //     log_data.productFound = JSON.stringify(myArray[0]);
  //   //     product_data.fulfillmentText = productFound.sku;
  //   //     response.setBody(JSON.stringify(product_data));
  //   // }).catch(function(error, productFound) {
  //   //   log_data.nomatch = false;
  //   //   log_data.error = JSON.stringify(error);
  //   //   log_data.body.queryResult = body.queryResult;
  //   //   log_data.productFound = JSON.stringify(productFound);
  //   // });
  // } else {
  //   log_data.nomatch = true;
  //   log_data.body.queryResult = body.queryResult;
  // }
  


};
