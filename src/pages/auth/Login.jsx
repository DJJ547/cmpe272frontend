import React from "react";

export default function Login() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee_no = e.target.elements.employee_no.value;
    const password = e.target.elements.password.value;
    
    fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employee_no, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.message === "success"){
        localStorage.setItem('employee_information', JSON.stringify(data.data));
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('state', JSON.stringify(data.data.state));
        window.location.href = "/dashboard";
      }
      else{
        alert(data.message);
      }
    }
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">HR Portal</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="employee_no"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Enter employee number"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          {/* <p className="text-gray-900 mt-4">
            Don't have an account?
            <a href="/auth/signup" className="text-sm text-blue-500 -200 hover:underline mt-4">
              Signup
            </a>
          </p> */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
