import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TripData } from "../types";
import NewToDo from "./NewToDo";
import useToDos from "../hooks/useToDos";
import { useAuth } from "../contexts/authContext";
import convertDate from "../functions/convertDate";
import dayjs from "dayjs";
import updateToDo from "../functions/updateToDo";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import deleteEntry from "../functions/deleteEntry";
interface ToDoListProps {
  selectedTrip: TripData;
}
const ToDoList: React.FC<ToDoListProps> = ({ selectedTrip }) => {
  const { currentUser } = useAuth();
  const [newToDo, setNewToDo] = useState(false);
  const [update, setUpdate] = useState("");
  const { toDoData } = useToDos(update);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newToDoState, setNewToDoState] = useState(toDoData);
  const [selectedToDos, setSelectedToDos] = useState<string[]>([]);
  const [deleteTodo, setDeleteTodo] = useState<string[]>([]);
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
    if (selectedToDos.length > 0) {
      const status = await updateToDo(toDoData, selectedToDos);
      if (status) {
        setSelectedToDos([]);
        setError("");
        setSuccess("Successfully Updated");
      } else {
        setError("Something went wrong with updating the To Dos");
      }
    }
    if (deleteTodo.length > 0) {
      deleteEntry(deleteTodo, "todos");
      setNewToDoState(
        newToDoState.filter((todo) => !deleteTodo.includes(todo.id))
      );
      setDeleteTodo([]);
    }
  };

  const handleX = (id: string) => {
    if (deleteTodo.includes(id)) {
      setDeleteTodo(deleteTodo.filter((todo) => todo !== id));
    } else {
      setDeleteTodo([...deleteTodo, id]);
    }
  };

  useEffect(() => {
    setNewToDoState(toDoData);
  }, [toDoData]);
  useEffect(() => {
    setNewToDo(false);
  }, [selectedTrip]);
  useEffect(() => {
    setSelectedToDos([]);
    setDeleteTodo([]);
  }, []);
  return (
    <div
      className="Trip-content-divs"
      style={{
        // border: `3px ${selectedTrip.color} solid`,
        // boxShadow: `${selectedTrip.color} 2px 2px 1px`,
        // backgroundColor: selectedTrip.color,
        width: "30%",
        marginLeft: "1rem",
      }}
    >
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
                      id="Todo-status"
                      className="p"
                      style={{ color: statusColors[toDo.status] }}
                    >
                      {toDo.status}
                    </p>
                  </div>
                  <div id="Todo-action" style={{ width: "50%" }}>
                    <div id="Delete-button-div">
                      <button
                        className="Bland-button"
                        onClick={() => handleX(toDo.id)}
                      >
                        <CloseIcon
                          className="Delete-button"
                          fontSize="large"
                          sx={{
                            color: deleteTodo.includes(toDo.id) ? "red" : null,
                          }}
                        />
                      </button>
                    </div>
                    <button
                      className="Bland-button"
                      onClick={() => handleClick(toDo.id)}
                    >
                      <div id="Checkbox">
                        {toDo.checked && (
                          <CheckIcon
                            color="primary"
                            sx={{ height: "100%", width: "100%" }}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
        {/* <button onClick={() => console.log(selectedToDos)}>eck</button> */}
      </div>
      {(selectedToDos.length > 0 || deleteTodo.length > 0) && (
        <div className="Appear-div">
          <button
            className="btn btn-outline-primary"
            style={{ backgroundColor: "#B6D3FD", fontSize: "25px" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
