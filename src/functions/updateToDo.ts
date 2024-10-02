import { ToDoData } from "../types";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const updateToDo = async (toDoInfo: ToDoData[], selectedToDo: string[]) => {
  const batch = writeBatch(db);
  console.log(selectedToDo, "selected");
  console.log(toDoInfo, "to be updated");
  for (let i = 0; i < toDoInfo.length; i++) {
    if (selectedToDo.includes(toDoInfo[i].id)) {
      const docRef = doc(db, "todos", toDoInfo[i].id);
      batch.update(docRef, {
        tripID: toDoInfo[i].tripID,
        user: toDoInfo[i].user,
        description: toDoInfo[i].description,
        status: toDoInfo[i].status,
        deadline: toDoInfo[i].deadline,
        checked: toDoInfo[i].checked,
      });
    }
  }
  try {
    await batch.commit();
    console.log("Batch update successful!");
    return true;
  } catch (error) {
    console.error("Error in batch update: ", error);
    return false;
  }
};

export default updateToDo;
