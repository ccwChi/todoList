import React, { useState, useEffect, useRef } from "react";
import { Button, Label } from "flowbite-react";
import { todoStore } from "../../store/todoStore";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoListModal from "./TodoListModal";

// eslint-disable-next-line react/display-name
const TodoList = React.memo(
  () => {
    // 建立新卡片用
    const [text, setText] = useState("");
    const [newCard, setNewCard] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const onClose = () => {
      setOpenModal(false);
      setDeliveryInfo(null);
    };
    // store裡面的函數
    const tasks = todoStore((store) => store.todoData);
    const addTask = todoStore((store) => store.addTask);
    const moveTask = todoStore((store) => store.moveTask);
    const onDragEnd = (result) => {
      if (!result.destination) return;
      moveTask(result);
    };

    // ↓↓處理遺失焦點後新建卡片的處理
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
      setText(e.target.value);
    };

    const handleInputBlur = (columnId) => {
      if (text.trim()) {
        addTask(text, columnId);
        setText("");
      }
      setNewCard(false);
    };

    useEffect(() => {
      if (newCard) inputRef.current.focus();
    }, [newCard]);
    // ↑↑處理遺失焦點後新建卡片的處理

    return (
      <>
        <div className="flex flex-col p-4">
          <p className="text-rose-500 text-sm font-serif ">* 番茄鐘僅能在 {">"} 640 px 螢幕下可使用</p>
          <p className="text-rose-500 text-sm font-serif ">* 本頁面特點在拖拉式 todo 清單及重整不會重置的番茄鐘</p>
          <div className="flex sm:flex-1 gap-4 overflow-x-auto flex-col sm:flex-row mt-4">
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {Object.entries(tasks).map(([columnId, column]) => {
                return (
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className="min-w-[180px] h-fit flex flex-col flex-1 rounded-lg border border-gray-200 bg-slate-200 shadow-md dark:border-gray-700 dark:bg-gray-600  w-full p-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        // onClick={() => console.log(column)}
                      >
                        <Label className="pb-2">{column.title}</Label>
                        {column.data.map((task, index) => (
                          <Draggable
                            draggableId={task.id}
                            index={index}
                            key={task.id}
                          >
                            {(provided) => (
                              <div
                                className="mt-2 h-fit flex flex-col flex-1 rounded-lg border border-gray-200 bg-slate-50 shadow-md dark:border-gray-700 dark:bg-gray-500  w-full p-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => {
                                  setOpenModal(true);
                                  setDeliveryInfo({
                                    ...task,
                                    columnId,
                                  });
                                }}
                              >
                                <p>{task.title}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {newCard === columnId && (
                          <div className="mt-2 flex flex-col flex-1 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-600  w-full p-2">
                            <div className="flex">
                              <input
                                ref={inputRef}
                                value={text}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur(columnId)}
                                className="m-2 text-gray-900 dark:text-white border-0border-gray-400 w-full bg-transparent text-sm focus:outline-none focus:ring-0"
                              />
                            </div>
                          </div>
                        )}
                        <Button
                          className="my-2 p-0 h-8 text-black dark:text-white"
                          // color="inherent"
                          onClick={() => {
                            setNewCard(columnId);
                          }}
                        >
                          + 新增
                        </Button>
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </div>
        </div>
        <TodoListModal
          onClose={onClose}
          openModal={openModal}
          deliveryInfo={deliveryInfo}
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    // 比較 prevProps 和 nextProps，返回 true 表示組件不需要重新渲染
    return (
      prevProps.openModal === nextProps.openModal &&
      prevProps.deliveryInfo === nextProps.deliveryInfo
    );
  }
);

export default TodoList;
