/* eslint-disable react/display-name */
import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { todoStore } from "../store/todoStore";
import { FaPlus } from "react-icons/fa";

const DropdownTodoList = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [checkedIdList, setCheckedIdList] = useState([]);
  const dropdownRef = useRef(null);

  const { handleSubmit, register, reset } = useForm({
    title: "",
  });

  const allTask = todoStore((store) => store.todoData);
  const goingTask = allTask[852852].data;
  const addTask = todoStore((store) => store.addTask);
  const moveTask = todoStore((store) => store.moveTask);

  useEffect(() => {
    setCheckedList(Array(goingTask.length).fill(false));
  }, [allTask]);

  const handleCheckboxChange = (index, taskId) => {
    const newCheckedList = [...checkedList];
    newCheckedList[index] = !checkedList[index];
    setCheckedList(newCheckedList);
    const taskIndex = checkedIdList.findIndex((task) => task[1] == taskId);
    // console.log("taskIndex", taskIndex);
    if (taskIndex === -1) {
      setCheckedIdList([...checkedIdList, [index, taskId]]);
      // console.log("[-1", [...checkedIdList, taskId]);
    } else {
      setCheckedIdList(
        checkedIdList.filter((checkedId) => checkedId[1] !== taskId)
      );
      // console.log(checkedIdList.filter((checkedId) => checkedId !== taskId));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [checkedIdList]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      reset();
    }
  };
  
  const handleClickOutSide = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // console.log(checkedIdList);
      const resultList = checkedIdList.map((checked) => {
        return {
          draggableId: checked[1],
          source: {
            droppableId: "852852",
          },
          destination: {
            droppableId: "963963",
          },
        };
      });
      if (resultList.length > 0) {
        resultList.forEach((result) => {
          moveTask(result);
        });
      }
      setCheckedIdList([]);
      setIsOpen(false);
      reset();
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    addTask(data.title, "852852");
    reset();
  };

  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => {
            toggleDropdown();
            console.log(checkedIdList);
          }}
          type="button"
          color="light"
          className=" shadow-gray-300 shadow-sm px-2 w-fit rounded-md"
        >
          進行中任務{" "}
        </Button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="z-10 absolute mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 "
              aria-labelledby="dropdownBgHoverButton"
            >
              {goingTask.map((task, index) => {
                return (
                  <React.Fragment key={task.id}>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          type="checkbox"
                          value=""
                          checked={checkedList[index]}
                          onChange={() => handleCheckboxChange(index, task.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                          {task.title}
                        </label>
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}{" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-around items-center">
                  <input
                    className="w-[120px] text-gray-900 ps-2 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                    {...register("title", { required: true })}
                    defaultValue=""
                  />
                  <Button type="submit" className=" !bg-transparent">
                    <FaPlus className=" cursor-pointer " size={8} />
                    {/* <span className="text-sm">新增</span> */}
                  </Button>
                </div>
              </form>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

export default DropdownTodoList;
