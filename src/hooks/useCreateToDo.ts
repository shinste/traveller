import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../contexts/authContext";
import createToDo from "../functions/createToDo";

const useCreateToDo = (
  setNewToDo: (newToDo: boolean) => void,
  selectedTripId: string,
  setUpdate: (update: string) => void
) => {
  const [newDescription, setNewDescription] = useState("Edit this Description");
  const [editDescription, setEditDescription] = useState(false);
  const [editDeadline, setEditDeadline] = useState(false);
  const [newDeadline, setNewDeadline] = useState(dayjs());
  const [newStatus, setNewStatus] = useState("Necessary");
  const descriptionRef = useRef("Edit this Description");
  const { currentUser } = useAuth();
  const currentUserEmail = currentUser?.email as string;

  const handleCancel = () => {
    setNewToDo(false);
    setEditDescription(false);
    setNewDescription("Edit this Description");
    setNewDeadline(dayjs());
  };

  const handleSaveEdit = () => {
    if (editDescription) {
      setNewDescription(descriptionRef.current);
    }
    setEditDescription(!editDescription);
  };

  const handleSaveDeadline = () => {
    if (editDeadline) {
    }
    setEditDeadline(!editDeadline);
  };

  const handleCreate = async () => {
    const success = await createToDo(
      selectedTripId,
      newDescription,
      newDeadline,
      newStatus,
      currentUserEmail
    );
    if (success) {
      setUpdate(success);
      setNewToDo(false);
    } else {
      console.log("failure");
    }
  };
  return {
    newDescription,
    setNewDescription,
    editDescription,
    setEditDescription,
    editDeadline,
    setEditDeadline,
    newDeadline,
    setNewDeadline,
    newStatus,
    setNewStatus,
    descriptionRef,
    currentUser,
    currentUserEmail,
    handleSaveEdit,
    handleSaveDeadline,
    handleCancel,
    handleCreate,
  };
};

export default useCreateToDo;
