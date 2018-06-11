exports = function(){
  const users = context.services.get("mongodb-atlas").db("swagstore").collection("users");
  return users.findOne({"user_id": context.user.id})
    .then(user => {
      if(!user) {
        console.log('User does not exist');
        return users.insertOne({"user_id": context.user.id})
          .then(result => {
            return {
              _id: result.insertedId,
              user_id: context.user.id,
              authData: context.user.data
            };
          });
      } else {
        user.authData = context.user.data;
        return user;
      }
    })
    .then(user => {
      return context.functions.execute("getproductsfromgcp")
        .then(personalized_recs => {
          return { ...user, personalized_recs };
        });
    });
};