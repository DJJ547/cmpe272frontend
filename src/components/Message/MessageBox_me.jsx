import React, { useState } from "react";

export default function MessageBox({ User, messages, profile_pic_sender }) {
  return (
    <div className="flex justify-end">
      <div className="mb-4 w-40">
        <div className="font-semibold text-right p-1">{User}</div>
        <div className="text-sm text-gray-600 shadow p-2 round">{messages}</div>
      </div>
      <div className="mb-4">
        <img src={profile_pic_sender} className="rounded-full h-16 w-16 inline-block p-2" />
      </div>
    </div>
  );
}
