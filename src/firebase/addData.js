import { db, firebase_app } from "./config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default async function addData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, String(colllection), String(id)), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}