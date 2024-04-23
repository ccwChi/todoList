import { create } from "zustand";
import { persist } from "zustand/middleware";

export const todoStore = create(
  persist(
    (set) => ({
      todoData: {
        741741: { title: "todo", data: [] },
        852852: { title: "ongoing", data: [] },
        963963: { title: "finish", data: [] },
      },
      addTask: (title, columnId) =>
        set((store) => {
          const newTask = {
            title,
            id: Date.now().toString(),
            createTime: new Date(),
            startTime: columnId === "852852" ? new Date() : "",
            completionTime: columnId === "963963" ? new Date() : "",
          };
          switch (columnId) {
            case "741741":
              return {
                todoData: {
                  ...store.todoData,
                  741741: {
                    ...store.todoData[741741],
                    data: [...store.todoData[741741].data, newTask],
                  },
                },
              };
            case "852852":
              return {
                todoData: {
                  ...store.todoData,
                  852852: {
                    ...store.todoData[852852],
                    data: [...store.todoData[852852].data, newTask],
                  },
                },
              };
            case "963963":
              return {
                todoData: {
                  ...store.todoData,
                  963963: {
                    ...store.todoData[963963],
                    data: [...store.todoData[963963].data, newTask],
                  },
                },
              };
            default:
              // 处理所有其他情况，或者可以抛出一个错误
              throw new Error(`Unhandled columnId: ${columnId}`);
          }
        }),
      moveTask: (result) => {
        set((store) => {
          const tasks = store.todoData;
          const { source, destination, draggableId } = result;
          if (source.droppableId !== destination.droppableId) {
            const sourceColumn = tasks[source.droppableId];
            const destColumn = tasks[destination.droppableId];
            const sourceItems = [...sourceColumn.data];
            const destItems = [...destColumn.data];
            const [removed] = sourceItems.splice(
              sourceItems.findIndex((task) => task.id === draggableId),
              1
            );
            if (destination.droppableId === "741741") {
              removed.startTime = "";
              removed.completionTime = "";
            } else if (destination.droppableId === "852852") {
              removed.startTime = new Date();
              removed.completionTime = "";
            } else if (destination.droppableId === "963963") {
              removed.completionTime = new Date();
            }
            destItems.splice(destination.index, 0, removed);
            return {
              todoData: {
                ...tasks,
                [source.droppableId]: {
                  ...sourceColumn,
                  data: sourceItems,
                },
                [destination.droppableId]: {
                  ...destColumn,
                  data: destItems,
                },
              },
            };
          } else {
            const column = tasks[source.droppableId];
            const copiedItems = [...column.data];
            const [removed] = copiedItems.splice(
              copiedItems.findIndex((task) => task.id === draggableId),
              1
            );
            if (destination.droppableId === "741741") {
              removed.startTime = "";
              removed.completionTime = "";
            } else if (destination.droppableId === "852852") {
              removed.startTime = new Date();
              removed.completionTime = "";
            } else if (destination.droppableId === "963963") {
              removed.completionTime = new Date();
            }
            copiedItems.splice(destination.index, 0, removed);
            return {
              todoData: {
                ...tasks,
                [source.droppableId]: {
                  ...column,
                  data: copiedItems,
                },
              },
            };
          }
        });
      },
      editTask: (taskData, editData) => {
        set((store) => {
          const columnId = taskData.columnId;
          return {
            todoData: {
              ...store.todoData,
              [columnId]: {
                ...store.todoData[columnId],
                data: [
                  ...store.todoData[columnId].data.map((task) => {
                    if (task.id === taskData.id) {
                      return {
                        ...task,
                        title: editData.title, // 更改 title
                        content: editData.content, // 新增 content
                      };
                    } else {
                      return task;
                    }
                  }),
                ],
              },
            },
          };
        });
      },
      deleteTask: (columnId, taskId) => {
        set((store) => {
          const deleteIndex = store.todoData[columnId].data.findIndex(
            (task) => task.id === taskId
          );
          return store.todoData[columnId].data.splice(deleteIndex, 1);
        });
      },
    }),
    { name: "ccwWeb" }
  )
);
