import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TripData } from "../types";
import NewToDo from "./NewToDo";
import useToDos from "../hooks/useToDos";
import { useAuth } from "../contexts/authContext";
import convertDate from "../functions/convertDate";
import dayjs from "dayjs";
import updateItems from "../functions/updateItems";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import deleteEntry from "../functions/deleteEntry";
import useToDoList from "../hooks/useToDoList";
interface ToDoListProps {
  selectedTrip: TripData;
}
const ToDoList: React.FC<ToDoListProps> = ({ selectedTrip }) => {
  const {
    error,
    success,
    newToDo,
    setNewToDo,
    setUpdate,
    newToDoState,
    statusColors,
    deleteTodo,
    handleX,
    handleClick,
    handleUpdate,
    selectedToDos,
  } = useToDoList(selectedTrip);

  return (
    <div
      className="Trip-content-divs"
      style={{
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
            selectedTripId={selectedTrip.id}
            setUpdate={setUpdate}
          />
        )}

        {newToDoState.map((toDo, index) => {
          if (toDo.tripID === selectedTrip.id) {
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
                    {dayjs(toDo.deadline).isSame(dayjs(), "day") && (
                      <p id={"Today-indicator"}>Today!!!</p>
                    )}

                    <p
                      className="p"
                      style={{
                        color: dayjs(toDo.deadline).isSame(dayjs(), "day")
                          ? "b40101"
                          : "#a9a9a9",
                        fontSize: dayjs(toDo.deadline).isSame(dayjs(), "day")
                          ? "15px"
                          : "10px",
                        fontWeight: dayjs(toDo.deadline).isSame(dayjs(), "day")
                          ? "bold"
                          : "normal",
                      }}
                    >
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
