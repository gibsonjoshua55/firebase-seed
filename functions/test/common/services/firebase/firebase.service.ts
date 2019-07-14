import { DocumentReference, Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { Service } from 'typedi';

@Service()
export class Firebase {
    app: admin.app.App;
    db: Firestore;
    defaultUser: DocumentReference;
    initialized: Promise<boolean>

    constructor() {
        console.log('firebase constructing');
        this.app = admin.initializeApp({
            projectId: process.env.PROJECT_ID
        });
        this.db = this.app.firestore();
    }

    async initialize() {
        this.defaultUser = this.db.collection('users').doc();
        await this.defaultUser.create({
            characters: []
        });
    }

}