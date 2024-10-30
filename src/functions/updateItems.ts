import { ToDoData, TripEvent } from "../types";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const updateItems = async (
  updateInfo: any[],
  selectedItemIds: string[],
  events?: boolean
) => {
  const batch = writeBatch(db);
  if (!events) {
    for (let i = 0; i < updateInfo.length; i++) {
      if (selectedItemIds.includes(updateInfo[i].id)) {
        const docRef = doc(db, "todos", updateInfo[i].id);
        batch.update(docRef, {
          tripID: updateInfo[i].tripID,
          user: updateInfo[i].user,
          description: updateInfo[i].description,
          status: updateInfo[i].status,
          deadline: updateInfo[i].deadline,
          checked: updateInfo[i].checked,
        });
      }
    }
  } else {
    for (let i = 0; i < updateInfo.length; i++) {
      console.log(
        selectedItemIds.includes(updateInfo[i].id),
        updateInfo[i].id,
        selectedItemIds
      );
      if (selectedItemIds.includes(updateInfo[i].id)) {
        const docRef = doc(db, "trips", updateInfo[i].id);
        batch.update(docRef, {
          startDate: updateInfo[i].start.toString().slice(0, 10),
          endDate: updateInfo[i].end.toString().slice(0, 10),
        });
      }
    }
  }

  try {
    await batch.commit();
    console.log(updateInfo, "woot");
    return true;
  } catch (error) {
    console.error("Error in batch update: ", error);
    return false;
  }
};

export default updateItems;
