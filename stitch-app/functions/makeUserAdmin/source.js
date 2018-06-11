exports = function(user_id){
  const users = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  return users.updateOne({"user_id": user_id},{ $set: { "admin" : 1 }});
};