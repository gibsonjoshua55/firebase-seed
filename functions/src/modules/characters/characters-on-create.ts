import * as functions from 'firebase-functions';

/**
 * Adds the character's reference to the characters array
 * of the given user from referenced by the ownerRef
 */
export const charactersOnCreate = functions.firestore.document('characters/{characterId}').onCreate(async (snapshot, context) => {
    const ownerRef = snapshot.get('ownerRef');

    const ownerData = (await ownerRef.get()).data();
    const characters = [];
    if (ownerData && ownerData.characters) {
        console.log(JSON.stringify(ownerData.characters));
        characters.push(...ownerData.characters);
    }
    characters.push(snapshot.ref);
    console.log(JSON.stringify(characters));
    await ownerRef.update({
        characters
    });
})