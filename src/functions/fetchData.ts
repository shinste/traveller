import { getDocs, Query } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

const fetchData = async (q: Query<DocumentData, DocumentData>) => {
  let data;
  try {
    const querySnapshot = await getDocs(q);
    data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return { data };
};
export default fetchData;
