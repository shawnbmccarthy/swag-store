exports = function(user_id){
  const collection = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  console.log(user_id);
  return collection.findOne({user_id: user_id});
};