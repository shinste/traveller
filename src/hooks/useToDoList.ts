import { useEffect, useState } from "react";
import useToDos from "../hooks/useToDos";
import updateItems from "../functions/updateItems";
import deleteEntry from "../functions/deleteEntry";
import { TripData } from "../types";

const useToDoList = (selectedTrip: TripData) => {
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
      const status = await updateItems(toDoData, selectedToDos);
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
  return {
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
  };
};

export default useToDoList;
