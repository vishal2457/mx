import { APP_SETTINGS } from '../app-settings';

export const FirebaseConfig = {
  type: 'service_account',
  project_id: APP_SETTINGS.FIREBASE_PROJECT_ID,
  private_key_id: APP_SETTINGS.FIREBASE_PRIVATE_KEY_ID,
  private_key: APP_SETTINGS.FIREBASE_PRIVATE_KEY,
  client_email: APP_SETTINGS.FIREBASE_CLIENT_EMAIL,
  client_id: APP_SETTINGS.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: APP_SETTINGS.FIREBASE_CLIENT_CERT_URL,
  universe_domain: 'googleapis.com',
};
