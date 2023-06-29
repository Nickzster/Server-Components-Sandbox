import React from "react";
import ClientWrapper from "./ClientWrapper";
import ServerCard from "./ServerCard";
import DemoContainer from "../components/DemoContainer";

const Experiment = () => {
  return (
    <>
      <p>
        <span style={{ color: "red", textDecoration: "underline" }}>
          Red Border
        </span>{" "}
        is a server component.
      </p>
      <p>
        <span style={{ color: "black", textDecoration: "underline" }}>
          Black Border
        </span>{" "}
        is a client component.
      </p>
      <DemoContainer isServer={true}>
        <h1>Experiment</h1>
        <ClientWrapper>
          <ServerCard />
        </ClientWrapper>
      </DemoContainer>
    </>
  );
};

export default Experiment;
