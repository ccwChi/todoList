import { Button, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/display-name
const TodoListModal = React.memo(
  ({ openModal, onClose, deliveryInfo }) => {
    //   const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState(null);
    const defaultValues = {
      title: deliveryInfo ? deliveryInfo.title : "",
      lastName: deliveryInfo ? deliveryInfo.title : "",
    };

    const methods = useForm({
      defaultValues,
    });

    const {
      control,
      handleSubmit,
      register,
      reset,
      watch,
      formState: { isDirty },
    } = methods;

    const titleRef = useRef(null);

    useEffect(() => {
      if (deliveryInfo) {
        reset(defaultValues);
      }
    }, [deliveryInfo]);

    useEffect(() => {
      if (edit === "title") titleRef.current.focus();
    }, [edit]);

    const onSubmit = (data) => {
      console.log(data);
    };

    return (
      <>
        {deliveryInfo && (
          <Modal
            dismissible
            show={openModal}
            onClose={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header
                onClick={() => {
                  setEdit("title");
                }}
              >
                {edit === "title" ? (
                  <input
                    {...register("title", {
                      require: true,
                      validate: (value) => value > 0,
                    })}
                    ref={titleRef}
                    onBlur={(e) => {
                      e.preventDefault();
                      setEdit(null);
                    }}
                    className="bg-inherit border-none ring-0 focus:ring-0"
                  />
                ) : (
                  <>{watch("title")}</>
                )}
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <input {...register("lastName")} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">I accept</Button>
                <Button color="gray" onClick={() => onClose()}>
                  Decline
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
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
