import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import MessageBox_me from "./MessageBox_me";
import Draggable from 'react-draggable';

export default function MessageOutline() {
  const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
  const me = JSON.parse(localStorage.getItem("employee_information"));
  const openChatWindow = JSON.parse(localStorage.getItem('openChatWindow'));
  
  const [chatWindowState, setChatWindowState] = useState({
    showChatWindow: openChatWindow ? openChatWindow.showChatWindow : false,
    otherUserID: openChatWindow ? openChatWindow.otherUserID : '',
    otherUserName: openChatWindow ? openChatWindow.otherUserName : '',
  });
  const messagesEndRef = React.useRef(null);
  
  const [components, setComponents] = useState([]);


  //current user's messages
  const handleSend = (e) => {
    e.preventDefault();

    const message = {
        sender: me.employee_no,
        receiver: chatWindowState.otherUserID,
        message: e.target[0].value,
    };
    console.log(message);
    socket.emit("message", message);
    e.target[0].value = "";
  };
  //listen for other user's message
  useEffect(() => {
    fetchChatHistory(me.employee_no, chatWindowState.otherUserID);
    socket.on('message', (data) => {
        if (data.sender === me.employee_no) {
            //create a messagebox_me for my messages
            const newComponent = React.createElement(MessageBox_me, {
                User: me.full_name,
                messages: data.message,
                profile_pic_sender: "https://upload.wikimedia.org/wikipedia/commons/6/61/Font_Awesome_5_solid_user-alt.svg",
            },`${data.sender}-${Date.now()}`);
            setComponents((prevComponents) => [...prevComponents, newComponent]);
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
        }
        else{
            //create a messagebox for other user's messages
            const newComponent = React.createElement(MessageBox, {
              User: chatWindowState.otherUserName,
              messages: data.message,
              profile_pic_receiver: "https://upload.wikimedia.org/wikipedia/commons/6/61/Font_Awesome_5_solid_user-alt.svg",
            },`${data.sender}-${Date.now()}`);
            setComponents((prevComponents) => [...prevComponents, newComponent]);
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
          }
    });

  }, []);

  const fetchChatHistory = (sender, receiver) => {
    // Fetch chat history from the server
    fetch(`${process.env.REACT_APP_API_URL}chat-history?sender=${sender}&receiver=${receiver}`)
      .then((response) => response.json())
      .then((data) => {
        // Render the chat history
        const components = data.chat_history.map((message) => {
          if (message[1] === me.employee_no) {
            //create a messagebox_me for my messages
            const newComponent = React.createElement(MessageBox_me, {
              User: me.full_name,
              messages: message[0],
              profile_pic_sender: data.profile_pic_sender,
            },`${message.sender}-${Date.now()}`);
            return newComponent;
          }
          else{
            //create a messagebox for other user's messages
            const newComponent = React.createElement(MessageBox, {
              User: chatWindowState.otherUserName,
              messages: message[0],
              profile_pic_receiver: data.profile_pic_receiver,
            },`${message.sender}-${Date.now()}`);
            return newComponent;
          }
        });
        setComponents(components);
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  };
  window.addEventListener('beforeunload', (ev) => {
    //ev.preventDefault();
    socket.disconnect();
  });
  const closewindow = () => {
    socket.disconnect();
    localStorage.removeItem('openChatWindow');
    setChatWindowState({
      showChatWindow: false
    });
  }
  return chatWindowState.showChatWindow ?(
    <Draggable>
    <div className="">
      <div className="flex flex-col h-full bg-white rounded-md shadow-md">
        <div className="p-4 bg-indigo-500 text-white font-semibold rounded-t-md flex justify-between">
          <h1>Chatting with {chatWindowState.otherUserName}</h1>
          <button onClick={closewindow} type="button" class="bg-white rounded-md inline-flex items-center justify-center text-red-500 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>
        <div className="flex-grow overflow-auto p-6 h-[600px]" id="message_Box">
            {/* Messages go here */}
            {components.map((Component, index) => (
                <div key={index}>{Component}</div>
            ))}
            {/* More messages... */}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <form className="flex" onSubmit={handleSend}>
            <input
              className="flex-grow rounded-l-md border-gray-300 border p-2 outline-none"
              placeholder="Type a message"
            />
            <button className="bg-indigo-500 text-white rounded-r-md px-4">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    </Draggable>
  ):null;
}