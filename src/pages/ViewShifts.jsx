import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "../static/schedule/calendar";
import cn from "../static/schedule/cn";
import { format } from "date-fns";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function ViewShifts() {
  // const days = ["S", "M", "T", "W", "T", "F", "S"];
  // const currentDate = dayjs();
  // const [today, setToday] = useState(currentDate);
  // const [selectDate, setSelectDate] = useState(currentDate);

  const stringToTime = (timeStr) => {
    if (timeStr === null) return null;
    // Convert the original date string to a JavaScript Date object
    const originalDate = new Date(timeStr);

    // Format the date using Intl.DateTimeFormat
    const formattedDateString = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC", // Optional, adjust to your timezone
    }).format(originalDate);
    return formattedDateString;
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}dashboard/employee/schedule`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTableData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-screen-full m-auto mt-8">
      <h2 className="w-full text-2xl font-bold mb-4">Shifts Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border">Shift ID</th>
            <th className="py-2 px-4 border-b border">Assign Shift Start</th>
            <th className="py-2 px-4 border-b border">Assign Lunch Start</th>
            <th className="py-2 px-4 border-b border">Assign Lunch End</th>
            <th className="py-2 px-4 border-b border">Assign Shift End</th>
            <th className="py-2 px-4 border-b border">Actual Shift Start</th>
            <th className="py-2 px-4 border-b border">Actual Lunch Start</th>
            <th className="py-2 px-4 border-b border">Assign Lunch End</th>
            <th className="py-2 px-4 border-b border">Assign Shift End</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((shift) => (
            <tr>
              <td className="border p-2">{shift[0]}</td>
              <td className="border p-2">{stringToTime(shift[2])}</td>
              <td className="border p-2">{stringToTime(shift[3])}</td>
              <td className="border p-2">{stringToTime(shift[4])}</td>
              <td className="border p-2">{stringToTime(shift[5])}</td>
              <td className="border p-2">{stringToTime(shift[6])}</td>
              <td className="border p-2">{stringToTime(shift[7])}</td>
              <td className="border p-2">{stringToTime(shift[8])}</td>
              <td className="border p-2">{stringToTime(shift[9])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <div className="flex gap-10 sm:divide-x justify-center mx-auto h-screen items-center sm:flex-row flex-col p-10">
    //   <div className="w-full h-full">
    //     <div className="flex justify-between items-center">
    //       <h1 className="select-none font-semibold">
    //         {months[today.month()]}, {today.year()}
    //       </h1>
    //       <div className="flex items-center ">
    //         <GrFormPrevious
    //           className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
    //           onClick={() => {
    //             setToday(today.month(today.month() - 1));
    //           }}
    //         />
    //         <h1
    //           className=" cursor-pointer hover:scale-105 transition-all"
    //           onClick={() => {
    //             setToday(currentDate);
    //           }}
    //         >
    //           Today
    //         </h1>
    //         <GrFormNext
    //           className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
    //           onClick={() => {
    //             setToday(today.month(today.month() + 1));
    //           }}
    //         />
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-7">
    //       {days.map((day, index) => {
    //         return (
    //           <h1
    //             key={index}
    //             className="text-sm text-center h-14 w-14 grid place-content-center text-black font-bold select-none"
    //           >
    //             {day}
    //           </h1>
    //         );
    //       })}
    //     </div>

    //     <div className=" grid grid-cols-7">
    //       {generateDate(today.month(), today.year()).map(
    //         ({ date, currentMonth, today }, index) => {
    //           return (
    //             <div
    //               key={index}
    //               className={cn(currentMonth ? "" : "text-gray-400", today ? "bg-gray-500 text-white" : "", "transition ease-in-out delay-50 hover:bg-gray-500 hover:text-white cursor-pointer file:p-1 text-center h-32 grid place-content-start text-sm border-solid border-2 border-gray-400")}
    //             >
    //               <h1
    //                 className={cn(

    //                   selectDate.toDate().toDateString() ===
    //                     date.toDate().toDateString()
    //                     ? "bg-black text-white"
    //                     : "",
    //                   "h-10 w-10 rounded-full grid place-content-center transition-all select-none"
    //                 )}
    //                 onClick={() => {
    //                   setSelectDate(date);
    //                 }}
    //               >
    //                 {date.date()}
    //               </h1>
    //             </div>
    //           );
    //         }
    //       )}
    //     </div>
    //   </div>
    //   {/* <div className="h-96 w-96 sm:px-5">
    // 		<h1 className=" font-semibold">
    // 			Schedule for {selectDate.toDate().toDateString()}
    // 		</h1>
    // 		<p className="text-gray-400">No meetings for today.</p>
    // 	</div> */}
    // </div>
  );
}
