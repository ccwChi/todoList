import { todoStore } from "../store/todoStore";

const useMoveTask = (result) => {
  const tasks = todoStore((store) => store.todoData);
  const { source, destination, draggableId } = result;
  const sourceColumn = Object.keys(tasks).find(
    (key) => tasks[key].id.toString() === source.droppableId
  );
  const destColumn = Object.keys(tasks).find(
    (key) => tasks[key].id.toString() === destination.droppableId
  );
  const sourceTasks = tasks[sourceColumn].data;
  const destTasks = tasks[destColumn].data;
  let removed;
  if (Object.keys(source).includes("index")) {
    removed = sourceTasks.splice(source.index, 1);
  } else {
    removed = sourceTasks.splice(
      sourceTasks.findIndex((task) => task.id === draggableId),
      1
    );
  }
  destTasks.splice(destination.index, 0, ...removed);
  return { sourceColumn, sourceTasks, destColumn, destTasks };
};

export { useMoveTask };
