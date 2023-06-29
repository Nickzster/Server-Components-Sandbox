"use client";

import React, { ReactNode, useEffect, useState } from "react";
import DemoContainer from "../components/DemoContainer";

const ClientWrapper = (props: { children: ReactNode }) => {
  const [state, setState] = useState("I am a starting state!");

  const updateState = () => {
    setState("I am a new state that changed via client side!");
  };

  return (
    <DemoContainer isServer={false}>
      <p>Client Wrapper</p>
      <p>{state}</p>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1em",
          borderRadius: "1em",
        }}
        onClick={() => updateState()}
      >
        Click me to change the state!
      </button>
      {props.children}
    </DemoContainer>
  );
};

export default ClientWrapper;
