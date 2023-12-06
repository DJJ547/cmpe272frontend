import React, { useEffect, useState } from "react";
import { Number } from "../components/Clock/Number";
import { Word } from "../components/Clock/Word";
import { format } from 'date-fns';

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Clock(h24 = true) {
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [year, setYear] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [day, setDay] = useState(0);
  const [pm, setPm] = useState(false);
  const [display, setDisplay] = useState("");
  const [punchSucceed, setPunchSucceed] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);

  // function msToTime() {
  //   const datetime = new Date();
  //   let seconds = datetime.getSeconds();
  //   let minutes = datetime.getMinutes();
  //   let hours = datetime.getHours();

  //   hours = hours < 10 ? "0" + hours : hours;
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   seconds = seconds < 10 ? "0" + seconds : seconds;

  //   return hours + ":" + minutes + ":" + seconds;
  // }

  function handlePunch(punchType) {
    setShowDisplay(true);
    const time = new Date();
    let currentTime = time.getTime();
    currentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss')

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: punchType,
        time: currentTime,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}dashboard/clock`, options)
      .then((response) => response.json())
      .then((data) => {
        setDisplay(data.message);
        setPunchSucceed(!data.error);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const update = () => {
      const datetime = new Date();
      let hour = datetime.getHours();
      if (!h24) {
        hour = hour % 12 || 12;
      }
      setMonth(datetime.getMonth());
      setDate(datetime.getDate());
      setYear(datetime.getFullYear());
      setHour(hour);
      setMinute(datetime.getMinutes());
      setSecond(datetime.getSeconds());
      setDay(datetime.getDay());
      setPm(datetime.getHours() >= 12);
    };

    update();

    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="m-[10px] rounded-[10px] bg-[#0d1621] flex flex-col items-center overflow-hidden pl-[20px] pr-[20px] py-[20px]">
        <div className="space-x-3 text-[3rem]">
          <Word value={months[month - 1]} />
          <Number value={date} />
          <Word value={","} />
          <Number value={year} />
        </div>
        <div className="text-[2rem] flex flex-row items-center justify-center gap-[33px] px-[10px] py-[0] pt-[10px]">
          {days.map((value, index) => (
            <Word key={value} value={value} hidden={index != day} />
          ))}
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="flex-[1] text-[5rem] m-0 p-0 top-[0]">
            <Number value={hour} />
            <Word value={":"} />
            <Number value={minute} />
            <Word value={":"} />
            <Number value={second} />
          </div>
          <div className="self-end text-[2.5rem] flex gap-[10px] mb-[25px]">
            <Word value={"AM"} hidden={pm} />
            <Word value={"PM"} hidden={!pm} />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-10 text-white font-bold m-10">
        <button
          onClick={() => handlePunch("start_shift")}
          className="rounded-[10px] bg-[#0d1621] p-5"
        >
          Start Shift
        </button>
        <button
          onClick={() => handlePunch("start_lunch")}
          className="rounded-[10px] bg-[#0d1621] p-5"
        >
          Start Lunch
        </button>
        <button
          onClick={() => handlePunch("end_lunch")}
          className="rounded-[10px] bg-[#0d1621] p-5"
        >
          End Lunch
        </button>
        <button
          onClick={() => handlePunch("end_shift")}
          className="rounded-[10px] bg-[#0d1621] p-5"
        >
          End Shift
        </button>
      </div>

      {showDisplay ? (
        <div
          className={`border-2 border-solid text-lg ${
            punchSucceed
              ? "border-green-500 text-green-500"
              : "border-red-500 text-red-500"
          } p-10`}
        >
          <p>{display}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
