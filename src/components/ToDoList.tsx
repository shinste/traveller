import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TripData } from "../types";
import NewToDo from "./NewToDo";
import useFetchToDos from "../hooks/useToDos";
import { useAuth } from "../contexts/authContext";
import convertDate from "../functions/convertDate";
import dayjs from "dayjs";
import updateToDo from "../functions/updateToDo";
import CheckIcon from "@mui/icons-material/Check";
interface ToDoListProps {
  selectedTrip: TripData;
}
const ToDoList: React.FC<ToDoListProps> = ({ selectedTrip }) => {
  const { currentUser } = useAuth();
  const [newToDo, setNewToDo] = useState(false);
  const [update, setUpdate] = useState("");
  const { toDoData } = useFetchToDos(update);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newToDoState, setNewToDoState] = useState(toDoData);
  const [selectedToDos, setSelectedToDos] = useState<string[]>([]);
  const statusColors: { [key: string]: string } = {
    Optional: "orange",
    Necessary: "green",
    Urgent: "red",
  };

  const handleClick = (id: string) => {
    setNewToDoState(
      toDoData.map((toDo) => {
        if (toDo.id === id) {
          toDo.checked = !toDo.checked;
        }
        return toDo;
      })
    );
    if (selectedToDos.includes(id)) {
      setSelectedToDos(selectedToDos.filter((value) => value !== id));
    } else {
      setSelectedToDos([...selectedToDos, id]);
    }
  };

  const handleUpdate = async () => {
    console.log(selectedToDos, "selectedtodos");
    const status = await updateToDo(toDoData, selectedToDos);
    if (status) {
      setSelectedToDos([]);
      setError("");
      setSuccess("Successfully Updated");
    } else {
      setError("Something went wrong with updating the To Dos");
    }
  };

  useEffect(() => {
    setNewToDoState(toDoData);
  }, [toDoData]);
  useEffect(() => {
    setNewToDo(false);
  }, [selectedTrip]);
  return (
    <div className="Trip-content-divs">
      <h3>To Do List</h3>
      {error && error}
      {success && success}
      <div id="Todo-list">
        {!newToDo ? (
          <div
            id="New-todo-button"
            className="Todo-regular-div"
            onClick={() => setNewToDo(true)}
          >
            <p id="New-todo-p">Add a new task...</p>
            <AddIcon id="Plus" />
          </div>
        ) : (
          <NewToDo
            setNewToDo={setNewToDo}
            selectedTripName={selectedTrip.name}
            setUpdate={setUpdate}
          />
        )}

        {newToDoState.map((toDo, index) => {
          if (toDo.tripID === currentUser?.email + selectedTrip.name) {
            return (
              <div
                className="Todo-regular-div Vertical-flex Left-align mt-2"
                key={index}
                style={{
                  border: `2px ${selectedTrip.color} solid`,
                  width: "100%",
                }}
              >
                <div className="Flex-space">
                  <div id="Todo-info">
                    <p id="Todo-description" className="p">
                      {toDo.description}
                    </p>
                    <p id="Todo-deadline" className="p">
                      {dayjs(toDo.deadline).format("MMMM D, YYYY")}
                    </p>
                    <p
                      className="p"
                      style={{ color: statusColors[toDo.status] }}
                    >
                      {toDo.status}
                    </p>
                  </div>
                  <div style={{ width: "15%" }}>
                    <div
                      onClick={() => handleClick(toDo.id)}
                      id="Checkbox"
                      style={{ border: `5px ${selectedTrip.color} solid` }}
                    >
                      {toDo.checked && (
                        <CheckIcon
                          color="primary"
                          sx={{ height: "100%", width: "100%" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <button onClick={handleUpdate}>Update!</button>
      </div>
    </div>
  );
};

export default ToDoList;
