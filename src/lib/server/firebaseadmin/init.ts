import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import 'dotenv/config';


const app = initializeApp({
  credential: applicationDefault()
})

const adminAuth = getAuth(app)

export default adminAuth


