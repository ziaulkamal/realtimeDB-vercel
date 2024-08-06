import admin from 'firebase-admin';

const serviceAccount = JSON.parse();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL_DB
  });
}

export { admin };
