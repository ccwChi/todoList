/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AlertModal from "../../component/AlertModal";
import { todoStore } from "../../store/todoStore";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/display-name
const TodoListModal = React.memo(
  ({ openModal, onClose, deliveryInfo }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState([]);

    const defaultValues = {
      title: deliveryInfo ? deliveryInfo.title : "",
      content: deliveryInfo?.content ? deliveryInfo.content : "",
    };

    const methods = useForm({
      defaultValues,
    });
    const {
      handleSubmit,
      register,
      reset,
      formState: { isDirty },
    } = methods;

    const editTask = todoStore((store) => store.editTask);
    const deleteTask = todoStore((store) => store.deleteTask);

    useEffect(() => {
      if (deliveryInfo) {
        reset(defaultValues);
      }
    }, [deliveryInfo]);

    const onSubmit = (data) => {
      console.log(deliveryInfo, "sasa", data);
      editTask(deliveryInfo, data);
      reset();
      onClose();
    };

    const checkDirty = () => {
      if (isDirty) {
        setIsAlertOpen(true);
      } else {
        onClose();
      }
    };

    const handleAgree = () => {
      if (deleteInfo.length > 0) {
        deleteTask(deleteInfo[0], deleteInfo[1]);
        setDeleteInfo([]);
      }
      setIsAlertOpen(false);
      onClose();
    };

    return (
      <>
        {deliveryInfo && (
          <div>
            {openModal && (
              <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 bg-gray-800"
                onClick={() => {
                  checkDirty();
                  setDeleteInfo([]);
                }}
              >
                <div
                  className="relative p-4 w-full max-w-md"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        {/* {edit === "title" ? ( */}
                        <input
                          className="block pt-3 ps-2  w-full text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          {...register(
                            "title"
                            //   , { ref: titleRef }
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteInfo([
                              deliveryInfo.columnId,
                              deliveryInfo.id,
                            ]);
                            setIsAlertOpen(true);
                          }}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <FaTrash />
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className="p-4 md:p-5 space-y-4">
                        <textarea
                          id="message"
                          {...register("content")}
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-inherit rounded-lg border-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Leave a comment..."
                        ></textarea>
                      </div>
                      <div className="p-4 md:p-5 flex justify-end">
                        <button
                          type="submit"
                          className="px-5 py-2.5 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          確定
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <AlertModal
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          agreeAction={handleAgree}
          content={deleteInfo.length > 0 ? "確定刪除?" : undefined}
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

export default TodoListModal;
