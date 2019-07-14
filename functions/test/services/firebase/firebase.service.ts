import { DocumentReference, Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { Service } from 'typedi';

@Service()
export class Firebase {
    app: admin.app.App;
    db: Firestore;
    defaultUser: DocumentReference;
    initialized: Promise<boolean>
    private onInitialized: (success: boolean) => void;
    private onInitializationError: (error: Error) => void;

    constructor() {
        console.log('firebase constructing');
        this.app = admin.initializeApp({
            projectId: process.env.PROJECT_ID
        });
        this.db = this.app.firestore();
        this.initialized = new Promise((resolve, reject) => {
            this.onInitialized = resolve;
            this.onInitializationError = reject;
        })
    }

    async initialize() {
        try {
            this.defaultUser = this.db.collection('users').doc();
            await this.defaultUser.create({
                characters: []
            });
            this.onInitialized(true);
        } catch (error) {
            this.onInitializationError(error);
            throw error;
        }
    }

}