export const environment = {
  production: true,
  auth0Config: {
    app: {
      // needed for auth0
      clientID: 'F3yjSMu8z2JCo3ru453idPnlF2S4mQVn',

      // needed for auth0cordova
      clientId: 'F3yjSMu8z2JCo3ru453idPnlF2S4mQVn',
      domain: 'sbfl.auth0.com',
      callbackURL: location.href,
      packageIdentifier: 'com.devconsult.sbfl'
    },
    web: {
      clientID: 'kRHfRGiiFAGZE3PPA4ZRFreRbAUp9B6W',
      domain: 'sbfl.auth0.com',
      responseType: 'token id_token',
      audience: 'https://sbfl.auth0.com/userinfo',
      redirectUri: 'http://localhost:4200',
      scope: 'openid profile',
      rememberLastLogin: false
    }
  },
  firebase: {
    apiKey: "AIzaSyAJhecZNU_2vw5kk6sko4d7k1nGxUSud_s",
    authDomain: "scoreboard-for-life.firebaseapp.com",
    databaseURL: "https://scoreboard-for-life.firebaseio.com",
    projectId: "scoreboard-for-life",
    storageBucket: "scoreboard-for-life.appspot.com",
    messagingSenderId: "197459977306"
  },
  newsapi: {
    apiKey: "d7744aa3fdeb4c7b80e471368aae41df"
  },
  algolia: {
    apiKey: '2035cf30189a0f71ba1c2b238bd60260',
    appId: '3ZH5P9DQWH',
    indexName: 'idx_groups',
    routing: true,
  },
  firebaseapi: {
    url: "https://us-central1-scoreboard-for-life.cloudfunctions.net/api"
  },
};
