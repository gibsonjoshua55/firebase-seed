import { DocumentReference } from '@google-cloud/firestore';
import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { ContainerInstance } from 'typedi';
import { Firebase } from '../../services';

type UserType = {
    characters: DocumentReference[]
} | undefined

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@suite
export class CharactersSuite {
    firebase: Firebase;
    constructor(container: ContainerInstance) {
        this.firebase = container.get(Firebase);
    }

    @test
    async charactersOnCreate() {
        // wait for service initialization
        await this.firebase.initialized;
        const userDoc = this.firebase.defaultUser;

        // create character
        const characterDoc = this.firebase.db.collection('characters').doc();
        await characterDoc.create({
            ownerRef: userDoc
        });

        // wait for function to run
        await timeout(1000);

        // expect user to have the newly created character
        const userData: UserType = (await userDoc.get()).data() as UserType;
        expect(userData).to.not.be.undefined;
        if (userData) {
            let characterExists = false;
            userData.characters.forEach((character) => {
                if (character.id === characterDoc.id) {
                    characterExists = true;
                }
            });
            expect(characterExists).to.be.true;
        }
    }
}