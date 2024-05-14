// import functions = require("firebase-functions");
// import admin = require("firebase-admin");
// import express = require("express");
// import cors = require("cors");
// import jwt = require("jsonwebtoken");
// import { configInfo } from "../../config";

// admin.initializeApp(configInfo.firebaseConfig);
// const firestore = admin.firestore();

// const app = express();
// app.use(cors({ origin: true }));

// // Firebase CLI를 사용하여 SECRET_KEY 값을 환경변수로 저장해둠
// // const SECRET_KEY = functions.config().jwt.secret_key;

// // 로컬환경에서
// const SECRET_KEY = require("dotenv").config();
// const TOKEN_EXPIRATION = "24h";

// // 회원가입 API
// app.post("/api/signup", async (req, res) => {
//   const { email, password, nickName } = req.body;

//   try {
//     // Firebase 인증 createUser방법을 사용하여 이메일과 비밀번호를 전달하여 새 사용자 레코드를 생성
//     const userRecord = await admin.auth().createUser({ email, password });
//     const userId = userRecord.uid;

//     await firestore.collection("users").doc(userId).set({
//       email,
//       nickName,
//     });

//     // jwt.sign()을 사용해 사용자 ID가 포함된 JWT 토큰을 생성
//     const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
//     return res.status(201).json({ accessToken: token });
//   } catch (error: any) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// // 로그인 API
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userRecord = await admin.auth().getUserByEmail(email);
//     const userId = userRecord.uid;

//     const userSnapshot = await firestore.collection("users").doc(userId).get();
//     const userData = userSnapshot.data();

//     if (!userData) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 패스워드 검증은 Firebase의 사용자 관리 기능을 사용하는 것이 좋습니다.
//     const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
//     return res.status(200).json({ accessToken: token });
//   } catch (error: any) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// exports.api = functions.https.onRequest(app);
