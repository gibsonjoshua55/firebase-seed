import { DocumentReference } from '@google-cloud/firestore';
import { suite, test } from '@testdeck/jest';
import { ContainerInstance } from 'typedi';
import { timeout } from '../../common';
import { Firebase } from '../../services';

type UserType = {
    characters: DocumentReference[]
} | undefined;

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
        expect(userData).toBeDefined();
        if (userData) {
            let characterExists = false;
            userData.characters.forEach((character) => {
                if (character.id === characterDoc.id) {
                    characterExists = true;
                }
            });
            expect(characterExists).toEqual(true);
        }
    }
}