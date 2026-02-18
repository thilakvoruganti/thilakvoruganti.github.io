const isProduction = process.env.NODE_ENV === 'production';

const firebaseConfig = Object.freeze({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || '',
});

const requiredAnalyticsKeys = ['apiKey', 'appId', 'measurementId'];
const missingAnalyticsKeys = requiredAnalyticsKeys.filter((key) => !firebaseConfig[key]);

if (missingAnalyticsKeys.length && !isProduction) {
  // Surface misconfiguration early during local development
  console.warn(
    `[env] Missing Firebase analytics keys: ${missingAnalyticsKeys.join(', ')}`
  );
}

const analyticsConfig = Object.freeze({
  enabled: isProduction && missingAnalyticsKeys.length === 0,
  missingKeys: missingAnalyticsKeys,
});

export { analyticsConfig, firebaseConfig, isProduction };
