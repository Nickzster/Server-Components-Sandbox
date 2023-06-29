"use client";
import React, { useState } from "react";
import DemoContainer from "../components/DemoContainer";

const ClientCard = (props: {
  message: string;
  updateMessage: () => Promise<string>;
}) => {
  const [message, setMessage] = useState(props.message);

  const updateMessage = async () => {
    const newMessage = await props.updateMessage();
    setMessage(newMessage);
  };

  return (
    <DemoContainer isServer={false}>
      <h2>Client Card</h2>
      {message}
      <br />
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1em",
          borderRadius: "1em",
        }}
        onClick={() => updateMessage()}
      >
        Click me to change the message!
      </button>
    </DemoContainer>
  );
};

export default ClientCard;
