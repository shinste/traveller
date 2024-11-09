import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import { useTripsContext } from "../contexts/tripContext";
import { ToDoData } from "../types";
import dayjs from "dayjs";

const useToDos = (updater: string) => {
  const [toDoData, setToDoData] = useState<ToDoData[]>([]);
  const { currentUser } = useAuth();

  const fetchToDos = async () => {
    const tripsRef = collection(db, "todos");
    const q = query(tripsRef, where("user", "==", currentUser?.email));
    try {
      const querySnapshot = await getDocs(q);
      let rawToDos: ToDoData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data().user,
        description: doc.data().description || "",
        deadline: doc.data().deadline,
        tripID: doc.data().tripID,
        status: doc.data().status,
        checked: doc.data().checked,
      }));

      // Organize to dos so that they show in order of urgent, necessary, and optional, then
      // chronological order within those sections
      rawToDos = rawToDos.sort((a, b) =>
        dayjs(a.deadline).isBefore(dayjs(b.deadline)) ? -1 : 1
      );
      const urgentToDos = rawToDos.filter((toDo) => toDo.status === "Urgent");
      const necessaryToDos = rawToDos.filter(
        (toDo) => toDo.status === "Necessary"
      );
      const optionalToDos = rawToDos.filter(
        (toDo) => toDo.status === "Optional"
      );
      const mappedToDos = [...urgentToDos, ...necessaryToDos, ...optionalToDos];
      setToDoData(mappedToDos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchToDos();
    console.log("fetch reset");
  }, [updater]);

  return { toDoData };
};

export default useToDos;
