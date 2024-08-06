import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vercel-credential-default-rtdb.firebaseio.com"
  });
}

export { admin };
