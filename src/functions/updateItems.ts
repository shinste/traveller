import { ToDoData, TripEvent } from "../types";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const updateItems = async (
  updateInfo: any[],
  selectedItemIds: string[],
  events?: boolean
) => {
  const batch = writeBatch(db);
  // Updating To Do
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
    // Trip Changes
  } else {
    for (let i = 0; i < updateInfo.length; i++) {
      console.log(
        selectedItemIds.includes(updateInfo[i].id),
        updateInfo[i].id,
        selectedItemIds
      );
      if (selectedItemIds.includes(updateInfo[i].id)) {
        const docRef = doc(db, "trips", updateInfo[i].id);
        // Updating event start and end date from dashboard
        if (updateInfo[i].start && updateInfo[i].end) {
          batch.update(docRef, {
            startDate: updateInfo[i].start.toString().slice(0, 10),
            endDate: updateInfo[i].end.toString().slice(0, 10),
          });
          // Updating event info from trips page
        } else {
          batch.update(docRef, {
            name: updateInfo[i].name,
            location: updateInfo[i].location,
            color: updateInfo[i].color,
            startDate: updateInfo[i].startDate,
            endDate: updateInfo[i].endDate,
            startTime: updateInfo[i].startTime,
            endTime: updateInfo[i].endTime,
            description: updateInfo[i].description,
          });
        }
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
