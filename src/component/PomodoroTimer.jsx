import { Button } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { GrPowerReset, GrPauseFill } from "react-icons/gr";
import { HiPause } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import PomodoroModal from "./PomodoroModal";

const PomodoroTimer = () => {
  const [openModal, setOpenModal] = useState(false);

  const [settingData, setSettingData] = useState({
    time: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 5 * 60,
    loopTime: 4,
    autoBreakSwitch: false,
  });
  const [time, setTime] = useState(settingData.time);
  const [loopTime, setLoopTime] = useState(settingData.loopTime);
  const [autoBreakSwitch, setAutoBreakSwitch] = useState(
    settingData.autoBreakSwitch
  );
  const [isActive, setIsActive] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      // console.log("a");
    } else if (time === 0) {
      setIsActive(false);
      showNotification();
      // console.log("b");
      if (isBreaking) {
        setTime(settingData.time);
        setIsBreaking(false);
        setIsActive(true);
        // console.log("c");
      } else {
        if (autoBreakSwitch && !!loopTime) {
          if (loopTime === 1) {
            setTime(settingData.longBreak);
            setLoopTime(settingData.loopTime);
            setIsBreaking(true);
            // console.log("d");
          } else {
            setLoopTime((prev) => prev - 1);
            setTime(settingData.shortBreak);
            setIsBreaking(true);
            // console.log("e");
          }
          setIsActive(true);
          // console.log("f");
        } else if (autoBreakSwitch && !loopTime) {
          setTime(settingData.shortBreak);
          setIsBreaking(true);
          setIsActive(true);
          // console.log("g");
        } else if (!autoBreakSwitch) {
          resetTimer();
          // console.log("h");
        }
      }
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  useEffect(() => {
    const savedTimerState = JSON.parse(localStorage.getItem("timer_state"));
    if (savedTimerState) {
      const timerSetting = JSON.parse(localStorage.getItem("timerSetting"));
      if (timerSetting) {
        setSettingData(timerSetting);
      }
    }

    if (savedTimerState !== null) {
      const { isActive, endDate, remainingTime } = savedTimerState;
      if (isActive) {
        const currentTime = Date.now();
        const delta = endDate - currentTime;
        if (delta > 0) {
          setTime(Math.ceil(delta / 1000));
          setIsActive(true);
        } else {
          localStorage.removeItem("timer_state");
          localStorage.removeItem("timerSetting");
        }
      } else {
        setTime(remainingTime);
      }
    }
  }, []);

  const setTimerActive = () => {
    setIsActive(!isActive);
    const timerState = {
      isActive: !isActive,
      endDate: Date.now() + time * 1000,
      remainingTime: time,
    };
    localStorage.setItem("timer_state", JSON.stringify(timerState));
  };

  const resetTimer = () => {
    setTime(settingData.time);
    setIsActive(false);
    localStorage.removeItem("timer_state");
    localStorage.removeItem("timerSetting");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Timer", {
        body: "Time is up!",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Pomodoro Timer", {
            body: "Time is up!",
          });
        }
      });
    }
  };

  const onSettingCheck = (converData) => {
    setOpenModal(false);
    setTime(converData.time);
    localStorage.setItem("timerSetting", JSON.stringify(converData));
  };


  return (
    <div className="flex w-fit h-fit gap-2  ">
      <Button
        className=" shadow-gray-500 shadow-sm w-full px-2 rounded-md font-bold text-black dark:text-white"
        gradientDuoTone="cyanToBlue"
        onClick={setTimerActive}
      >
        {formatTime(time)}
      </Button>
      <Button
        className=" shadow-gray-300 shadow-sm px-2 flex justify-center items-center rounded-md"
        color="light"
        onClick={setTimerActive}
      >
        {isActive ? <HiPause /> : <FaPlay />}
      </Button>
      <Button
        className=" shadow-gray-300 shadow-sm px-2 flex justify-center items-center rounded-md"
        color="light"
      >
        <GrPowerReset className="" onClick={resetTimer} />
      </Button>
      <Button
        className=" shadow-gray-300 shadow-sm px-2 flex justify-center items-center  rounded-md"
        color="light"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <IoSettingsOutline />
      </Button>
      <PomodoroModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onSettingCheck={onSettingCheck}
        settingData={settingData}
        setSettingData={setSettingData}
        setOpenModal={setOpenModal}
        resetTimer={resetTimer}
        setTime={setTime}
      />
    </div>
  );
};

export default PomodoroTimer;
