import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import { useTripsContext } from "../context";
import { ToDoData } from "../types";

const useFetchToDos = (updater: string) => {
  const [toDoData, setToDoData] = useState<ToDoData[]>([]);
  const { currentUser } = useAuth();
  // const { refresh } = useTripsContext();

  const fetchToDos = async () => {
    const tripsRef = collection(db, "todos");
    const q = query(tripsRef, where("user", "==", currentUser?.email));
    try {
      const querySnapshot = await getDocs(q);
      const mappedToDos: ToDoData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data().user,
        description: doc.data().description || "",
        deadline: doc.data().deadline,
        tripID: doc.data().tripID,
        status: doc.data().status,
        checked: doc.data().checked,
      }));
      setToDoData(mappedToDos);
      console.log(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
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

export default useFetchToDos;
