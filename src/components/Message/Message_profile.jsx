import React, { useEffect, useState } from "react";
import ContactBox from "./ContactBox";
import Draggable from "react-draggable";

export default function Message_profile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [recentContacts, setRecentContacts] = useState([]);
  const handleSearch = () => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}employee-search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data); */
        setSearchResults(data);
      });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === "second") {
      fetch(`${process.env.REACT_APP_API_URL}recent-contacts?employee_no=${JSON.parse(localStorage.getItem("employee_information")).employee_no}`)
      .then((response) => response.json())
      .then((data) => {
        setRecentContacts(data);
        /* console.log(recentContacts); */
    });
    }
  };

 

  return (
    <Draggable>
    <div className="flex flex-col h-full bg-white rounded-md shadow-md">
      <div className="p-4 bg-indigo-500 text-white font-semibold rounded-t-md mr-2">
        <h1>Contact</h1>
      </div>

      <div className="flex-grow overflow-auto p-2 h-[600px] w-full">
        <div className="flex">
          <button
            className={`${
              activeTab === "first" ? "bg-gray-300" : "bg-gray-100"
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            onClick={() => switchTab("first")}
          >
            <img src="https://cdn2.iconfinder.com/data/icons/minimal-set-five/32/minimal-48-512.png" className="h-5 w-5 inline-block mr-2" />
            SEARCH
          </button>
          <button
            className={`${
              activeTab === "second" ? "bg-gray-300" : "bg-gray-100"
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            onClick={() => switchTab("second")}
          >
            <img src="https://static-00.iconduck.com/assets.00/recent-icon-512x505-rl8e45ef.png" className="h-5 w-5 inline-block mr-2" />
            RECENT
          </button>
        </div>

        {activeTab === "first" && (
          <div className="w-full tab-content" id="tab1-content">
            <div className="flex flex-col my-1 rounded">
              <input
                className="flex-grow rounded-l-md border-gray-300 border p-2 outline-none"
                type="text"
                placeholder="Search by name or employee number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleSearch}
              />
              <div>
                {searchResults.map((result) => (
                  <ContactBox
                    Fullname={result[1] + " " + result[2]}
                    Employee_No={result[0]}
                    profilePic={result[3]}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "second" && (
          recentContacts.map((result) => (
            <ContactBox
              Fullname={result[1] + " " + result[2]}
              Employee_No={result[0]}
              profilePic={"https://upload.wikimedia.org/wikipedia/commons/6/61/Font_Awesome_5_solid_user-alt.svg"}
            />
          ))
          )}
      </div>
    </div>
    </Draggable>
  );
}
