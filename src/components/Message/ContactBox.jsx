import react, {useState} from 'react';
import MessageOutline from './MessageOutline';
export default function ContactBox({Fullname, Employee_No, profilePic}) {
    const openChatWindow = () => {
        localStorage.setItem('openChatWindow', JSON.stringify({showChatWindow: true, otherUserID: Employee_No, otherUserName: Fullname}));
        window.location.reload();
    };
    
    return(
        <div className="px-1 flex hover:bg-blue-50 hover:scale-105 mt-1 py-1 transform active:scale-75 transition-transform hover:cursor-pointer" onClick={openChatWindow}>
            <div className="mr-4">
                <img src={profilePic} className="rounded-full h-8 w-8 inline-block" />
            </div>
            <div>
                <p className="hover:text-blue-dark font-bold">{Fullname}</p>
                <p className="text-xs text-gray-500">Employee No: {Employee_No}</p>
            </div>
        </div>
    )
}