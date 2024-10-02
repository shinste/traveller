import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useRef, useState } from "react";
import BasicDate from "./BasicDate";
import dayjs from "dayjs";
import DropDown from "./DropDown";
import { NewToDoProps } from "../types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import createToDo from "../functions/createToDo";

const NewToDo: React.FC<NewToDoProps> = ({
  setNewToDo,
  selectedTripName,
  setUpdate,
}) => {
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
      selectedTripName,
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

  return (
    <div className="New-border Todo-regular-div">
      <div className="Width-100">
        <p className="Temp-todo-labels">Description</p>
        <div className="Align-todo">
          {!editDescription ? (
            <p className="Temp-new-display">{newDescription}</p>
          ) : (
            <input
              maxLength={45}
              defaultValue={newDescription}
              onChange={(e) => (descriptionRef.current = e.target.value)}
            />
          )}
          <button className="Bland-button" onClick={handleSaveEdit}>
            {editDescription ? <SaveIcon /> : <EditIcon />}
          </button>
        </div>

        <div>
          <p className="Temp-todo-labels">Deadline</p>
          <div className="Align-todo">
            {!editDeadline ? (
              <p className="Temp-new-display">
                {newDeadline.format("MMMM D, YYYY")}
              </p>
            ) : (
              <BasicDate defaultValue={newDeadline} setDate={setNewDeadline} />
            )}
            <button className="Bland-button" onClick={handleSaveDeadline}>
              {editDeadline ? <SaveIcon /> : <EditIcon />}
            </button>
          </div>
        </div>

        <div className="Status-div">
          <p className="Temp-todo-labels">Status</p>
          <div className="Drop-down-div">
            <DropDown defaultStatus={newStatus} setNewStatus={setNewStatus} />
          </div>
        </div>
      </div>

      <div className="Vertical-flex">
        <button className="Bland-button" onClick={handleCancel}>
          <CloseIcon id="Cancel" />
        </button>
        <button
          disabled={editDeadline || editDescription}
          style={{ opacity: editDeadline || editDescription ? ".3" : "1" }}
          className="Bland-button"
          onClick={handleCreate}
        >
          <CheckIcon id="Save" />
        </button>
      </div>
    </div>
  );
};

export default NewToDo;
