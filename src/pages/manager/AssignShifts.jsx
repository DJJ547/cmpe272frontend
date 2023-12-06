import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";


const AssignShifts = () => {
  const [tableData, setTableData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddRow = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleStartTimeChange = (date) => {
    console.log(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    console.log(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    setEndTime(date);
  };

  const handleFormSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}dashboard/manager/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firse_name: firstName,
        last_name: lastName,
        assign_start_time: startTime,
        assign_end_time: endTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    handleCloseForm();
    // setTableData([...tableData, formData]);
  };

  const handleShiftCancel = (shiftNo) => {
    fetch(`${process.env.REACT_APP_API_URL}manager/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shift_no: shiftNo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}dashboard/manager/schedule`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTableData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="w-full text-2xl font-bold mb-4">Shifts Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border">First Name</th>
            <th className="py-2 px-4 border-b border">Last Name</th>
            <th className="py-2 px-4 border-b border">Assign Shift Start</th>
            <th className="py-2 px-4 border-b border">Assign Lunch Start</th>
            <th className="py-2 px-4 border-b border">Assign Lunch End</th>
            <th className="py-2 px-4 border-b border">Assign Shift End</th>
            <th className="py-2 px-4 border-b border">Actual Shift Start</th>
            <th className="py-2 px-4 border-b border">Actual Lunch Start</th>
            <th className="py-2 px-4 border-b border">Actual Lunch End</th>
            <th className="py-2 px-4 border-b border">Actual Shift End</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((shift, i) => (
            <tr key={i}>
              <td className="border p-2">{shift[24]}</td>
              <td className="border p-2">{shift[25]}</td>
              <td className="border p-2 bg-gray-100">{shift[6]}</td>
              <td className="border p-2 bg-gray-100">{shift[7]}</td>
              <td className="border p-2 bg-gray-100">{shift[8]}</td>
              <td className="border p-2 bg-gray-100">{shift[9]}</td>
              <td className="border p-2">{shift[10]}</td>
              <td className="border p-2">{shift[11]}</td>
              <td className="border p-2">{shift[12]}</td>
              <td className="border p-2">{shift[13]}</td>
              <td className="border p-2"><button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleShiftCancel(shift[4])}>Cancel</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddRow}
      >
        Add Shift
      </button>

      {isFormOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={handleCloseForm}
          ></div>

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded z-20">
            <form>
              <div className="flex mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shift Start Time
                </label>
                <DatePicker
                  className="w-full ml-2 border rounded"
                  selected={startTime}
                  onChange={handleStartTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  timeCaption="Time"
                  isClearable
                  placeholderText="Select date and time"
                />
              </div>

              <div className="flex mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shift End Time
                </label>
                <DatePicker
                  className="w-full ml-2 border rounded"
                  selected={endTime}
                  onChange={handleEndTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  timeCaption="Time"
                  isClearable
                  placeholderText="Select date and time"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input1"
                >
                  First Name:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="input1"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input2"
                >
                  Last Name:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="input2"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                type="button"
                onClick={handleFormSubmit}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignShifts;
