import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebase";
import { Dayjs } from "dayjs";

const createToDo = async (
  selectedTripId: string,
  newDescription: string,
  newDeadline: Dayjs,
  newStatus: string,
  currentUserEmail: string
) => {
  const toDoRef = collection(db, "todos");
  try {
    const docRef = await addDoc(toDoRef, {
      tripID: selectedTripId,
      user: currentUserEmail,
      description: newDescription,
      deadline: newDeadline.format("YYYY-MM-DD"),
      status: newStatus,
      checked: false,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return "";
  }
};

export default createToDo;
