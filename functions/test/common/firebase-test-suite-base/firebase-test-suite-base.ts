import { ContainerInstance, Service } from 'typedi';
import { Firebase } from '../services';

@Service()
export class FirebaseTestSuiteBase {
    firebase: Firebase;
    constructor(container: ContainerInstance) {
        this.firebase = container.get(Firebase);
    }

    async before() {
        await this.firebase.initialize();
    }
}