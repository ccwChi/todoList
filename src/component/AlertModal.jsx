/* eslint-disable react/prop-types */

import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// eslint-disable-next-line react/display-name
const AlertModal = React.memo(
  ({
    isAlertOpen,
    setIsAlertOpen,
    agreeAction,
    content = "資料被修改過，確定不儲存直接離開嗎?",
  }) => {
    return (
      <>
        {isAlertOpen && (
          <Modal
            show={isAlertOpen}
            size="sm"
            // onClose={onClose}
            popup
            position={"center"}
            className="items-center justify-center "
          >
            <Modal.Body>
              <div className="text-center ">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-8 w-8 text-gray-400 dark:text-gray-200" />
                <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                  {content}
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    className="text-black px-2 dark:text-white"
                    onClick={() => {
                      agreeAction();
                    }}
                  >
                    確定
                  </Button>
                  <Button
                    className="text-black px-2 dark:text-white"
                    onClick={() => {
                      setIsAlertOpen(false);
                    }}
                  >
                    返回
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  }
);

export default AlertModal;
