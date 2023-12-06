import React, { useState } from "react";
import axios from "axios";
export default function Setting() {
  const employee_information = JSON.parse(
    localStorage.getItem("employee_information")
  );
  const [newMotto, setNewMotto] = useState(employee_information.motto);
  const [newProfilePicUrl, setNewProfilePicUrl] = useState(
    employee_information.profile_pic
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee_no = employee_information.employee_no;
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`${process.env.REACT_APP_API_URL}setting/updateprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newMotto, newProfilePicUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Profile updated successfully") {
          console.log(newMotto, newProfilePicUrl);
          localStorage.setItem(
            "employee_information",
            JSON.stringify({
              ...employee_information,
              motto: newMotto,
              profile_pic: newProfilePicUrl,
            })
          );
          window.location.href = "/dashboard";
        } else {
          alert(data.message);
        }
      });
  };
  const handleMottoChange = (e) => {
    setNewMotto(e.target.value);
  };
  const handleProfilePicUrlChange = (e) => {
    setNewProfilePicUrl(e.target.value);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    const emp_no = JSON.parse(
      localStorage.getItem("employee_information")
    ).employee_no;
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.NewPassword.value;
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      emp_no: emp_no,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}auth/changePassword`, data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col mx-auto p-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Settings</h2>
        <div className="flex mx-auto w-3/4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 mt-6 mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Change password
            </h2>
            <form className="flex flex-col" onSubmit={handleChangePassword}>
              <input
                placeholder="Enter your current password"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="currentPassword"
              />
              <input
                placeholder="Enter New password"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="NewPassword"
              />

              <button
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 mt-6 mx-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="profilePicUrl"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilePicUrl"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newProfilePicUrl}
                  onChange={handleProfilePicUrlChange}
                  placeholder="http://example.com/pic.jpg"
                />
              </div>
              <div>
                <label
                  htmlFor="motto"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Motto
                </label>
                <input
                  type="text"
                  id="motto"
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newMotto}
                  onChange={handleMottoChange}
                  placeholder="Enter your new motto"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
