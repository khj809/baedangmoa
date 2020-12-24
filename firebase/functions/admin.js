const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://baedangmoa-default-rtdb.firebaseio.com",
});

module.exports = adminApp;
