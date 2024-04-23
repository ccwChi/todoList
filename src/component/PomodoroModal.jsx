/* eslint-disable react/prop-types */
import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";

const PomodoroModal = ({
  openModal,
  onSettingCheck,
  settingData,
  setSettingData,
  resetTimer,
  onClose,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const converData = {
      time: data.time * 60,
      shortBreak: data.shortBreak * 60,
      longBreak: data.longBreak * 60,
      loopTime: 4,
      autoBreakSwitch: false,
    };
    setSettingData(converData);
    resetTimer();
    onSettingCheck(converData);
  };
  return (
    <>
      <Modal show={openModal} size="md" popup onClose={onClose}>
        <Modal.Header className=""></Modal.Header>
        <Modal.Body>
          <div>
            <h3 className="text-xl ps-6 font-medium text-gray-900 dark:text-white">
              番茄鐘設定
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6 p-6 "
            >
              <div className="flex gap-4">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="time"
                    id="time"
                    defaultValue={settingData?.time / 60}
                    className="block pt-3 ps-2  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("time", {
                      require: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                  />
                  <label
                    htmlFor="time"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    番茄計時
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="shortBreak"
                    id="shortBreak"
                    defaultValue={settingData?.shortBreak / 60}
                    className="block pt-3 ps-2  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("shortBreak", {
                      require: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                  />
                  <label
                    htmlFor="shortBreak"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    短休息
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="longBreak"
                    id="longBreak"
                    defaultValue={settingData?.longBreak / 60}
                    className="block pt-3 ps-2  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("longBreak", {
                      require: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                  />
                  <label
                    htmlFor="longBreak"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    長休息
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="loopTime"
                    id="loopTime"
                    defaultValue={settingData?.loopTime}
                    className="block pt-3 ps-2  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("loopTime", {
                      require: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                  />
                  <label
                    htmlFor="loopTime"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    長休息
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <Label>自動下一階段計時</Label>
                <Checkbox
                  {...register("autoBreakSwitch")}
                  defaultChecked={settingData?.autoBreakSwitch}
                  className="dark:bg-gray-600 dar"
                />
              </div>

              <Button type="submit" className="text-black dark:text-white">確定</Button>
            </form>
          </div>

          <div className="w-full"></div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PomodoroModal;

// const timerSettingList = [
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
// ];

{
  /* <div className="inline-flex items-center justify-between">
                <Label>計時</Label>
                <input
                  {...register("time", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.time / 60}
                  placeholder="分"
                />
              </div> */
}
{
  /* <div className="inline-flex items-center justify-between">
                <Label>短休息</Label>
                <input
                  {...register("shortBreak", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.shortBreak / 60}
                />
              </div> */
}
{
  /* <div className="inline-flex items-center justify-between">
                <Label>長休息</Label>
                <input
                  {...register("longBreak", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.longBreak / 60}
                />
              </div> */
}

{
  /* <div className="inline-flex items-center justify-between">
                <Label>長休息週期</Label>
                <input
                  {...register("loopTime", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.loopTime}
                />
              </div> */
}
