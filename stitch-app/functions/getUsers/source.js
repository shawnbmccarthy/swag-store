/**
 * @getUsers 
 * Provides an array of all users - no filter
 *
 *  params: none
 */
exports = function(){
  const collection = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  return collection.find({}).toArray();
};