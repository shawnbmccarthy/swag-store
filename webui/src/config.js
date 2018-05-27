export const facebook = {
    clientID: 'INSERT-CLIENT-ID-HERE',
    clientSecret: 'INSERT-CLIENT-SECRET-HERE',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};
  
export const google = {
    clientID: '943838529374-2hu7u6fod392b4058h8nuool4dsn9ts0.apps.googleusercontent.com',
    clientSecret: 'aHhIKdfneX_rrsfEpYLuinXI',
    callbackURL: 'https://stitch.mongodb.com/api/client/v2.0/auth/callback',
};

export const stitch = {
    appId: 'swag-kopai'
}