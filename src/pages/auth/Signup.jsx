import React, { useState } from "react";

export default function Login() {
  const [password, setPassword] = React.useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const name = event.target.elements.name.value;
    const reenterPassword = event.target.elements.reenterPassword.value;
    if (reenterPassword != password) {
      alert("Passwords do not match");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'email already registered') {
          alert(data.message);
        }
        else{
          alert("Signup Successful");
          window.location.href = "/auth/login";
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">
        HR Portal
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email address"
          />
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          <input
            type="password"
            name="reenterPassword"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Renter Password"
            onChange={handlePasswordChange}
          />
          <p className="text-gray-900 mt-4">
            already have an account?
            <a
              href="/auth/login"
              className="text-sm text-blue-500 -200 hover:underline mt-4"
            >
              Log in
            </a>
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
