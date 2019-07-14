import { config } from 'dotenv'
config();

console.log(process.env.FIRESTORE_EMULATOR_HOST);
import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './modules';