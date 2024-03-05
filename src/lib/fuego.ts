import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

type Config = Parameters<typeof firebase.initializeApp>[0];

const firebaseConfig = {
  apiKey: process.env['NEXT_PUBLIC_FB_API_KEY'],
  authDomain: process.env['NEXT_PUBLIC_FB_AUTH_DOMAIN'],
  projectId: process.env['NEXT_PUBLIC_FB_PROJECT_ID'],
  storageBucket: process.env['NEXT_PUBLIC_FB_STORAGE_BUCKET'],
  messagingSenderId: process.env['NEXT_PUBLIC_FB_MESSAGING_SENDER_ID'],
  appId: process.env['NEXT_PUBLIC_FB_APP_ID'],
  measurementId: process.env['NEXT_PUBLIC_FB_MEASUREMENT_ID'],
};

export class Fuego {
  public db: ReturnType<firebase.app.App['firestore']>;
  public auth: typeof firebase.auth;
  public functions: typeof firebase.functions;
  public storage: typeof firebase.storage;
  public analytics: typeof firebase.analytics;
  constructor(config: Config) {
    this.db = !firebase.apps.length
      ? firebase.initializeApp(config).firestore()
      : firebase.app().firestore();
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.storage = firebase.storage;
    this.analytics = firebase.analytics;
  }
}

const fuego = new Fuego(firebaseConfig);

export { fuego };
