import React from "react";
import ClientCard from "./ClientCard";
import DemoContainer from "../components/DemoContainer";

const ServerCard = () => {
  const updateMessage = async () => {
    "use server";
    return "I am a new message that changed via server actions!";
  };

  const initialMessage = "I am a message!";

  return (
    <DemoContainer isServer={true}>
      <h2>Server Card</h2>
      <ClientCard message={initialMessage} updateMessage={updateMessage} />
    </DemoContainer>
  );
};

export default ServerCard;
