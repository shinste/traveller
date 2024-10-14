import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const deleteEntry = (deleteList: string[], collectionName: string) => {
  deleteList.forEach((id) => {
    const docRef = doc(db, collectionName, id);
    deleteDoc(docRef)
      .then(() => {
        console.log(id)
        console.log(`Successful Delete from ${collectionName}`);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  });
};

export default deleteEntry;
