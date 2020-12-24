const functions = require("firebase-functions");
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("./admin");

const kakaoRequestMeUrl = "https://kapi.kakao.com/v2/user/me";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function requestMe(kakaoAccessToken) {
  return fetch(kakaoRequestMeUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${kakaoAccessToken}` },
  });
}

function updateOrCreateUser(userId, displayName, photoURL) {
  const updateParams = {
    provider: "KAKAO",
    displayName,
  };
  if (photoURL) {
    updateParams["photoURL"] = photoURL;
  }

  return admin
    .auth()
    .updateUser(userId, updateParams)
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        updateParams["uid"] = userId;
        return admin.auth().createUser(updateParams);
      }
      throw error;
    });
}

function createFirebaseToken(kakaoAccessToken) {
  return requestMe(kakaoAccessToken)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const userId = `kakao:${data.id}`;
      const nickname = data.properties.nickname;
      const profileImage = data.properties.profile_image;
      return updateOrCreateUser(userId, nickname, profileImage);
    })
    .then((userRecord) => {
      const userId = userRecord.uid;
      return admin.auth().createCustomToken(userId, { provider: "KAKAO" });
    })
    .catch((err) => {
      throw err;
    });
}

app.post("/", (req, res) => {
  const token = req.body.data.token;
  if (!token) return res.status(400).send({ message: "토큰이 제공되지 않았습니다." });
  createFirebaseToken(token)
    .then((firebaseToken) => {
      res.json({ data: { firebase_token: firebaseToken } });
    })
    .catch((err) => {
      functions.logger.error(err);
      res.status(500).send({ message: "서버 에러" });
    });
});

module.exports = functions.region("asia-northeast3").https.onRequest(app);
