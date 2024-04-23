import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const TodoListModal = React.memo(({ deliveryInfo }) => {
  const [edit, setEdit] = useState(null);
  const defaultValues = {
    title: deliveryInfo ? deliveryInfo.title : "",
    lastName: deliveryInfo ? deliveryInfo.title : "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, register, reset } = methods;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("title")}
            ref={titleRef}
            onBlur={() => {
              setEdit(null);
            }}
          />
        </div>
        {/* Modal body */}
        <button type="submit">Add new product</button>
      </form>
    </>
  );
});

export default TodoListModal;
