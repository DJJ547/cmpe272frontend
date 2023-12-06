import React, { useEffect, useState } from "react";
import MessageOutline from "../components/Message/MessageOutline";
import Message_profile from "../components/Message/Message_profile";
export default function Message() {
  return(
    <div className="flex w-full pr-32 pt-12">
      <div className="w-1/4">
        <Message_profile />
      </div>
      <div className="w-3/4">
        <MessageOutline />
      </div>
    </div>
  )
}
