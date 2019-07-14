import '@testdeck/di-typedi';
import { config } from 'dotenv';
import 'reflect-metadata';
import { Container } from 'typedi';
import { Firebase } from './services';

config();
Container.get(Firebase).initialize().then(() => {
    console.log('Firebase initialized');
}).catch((error) => {
    console.error(error);
})