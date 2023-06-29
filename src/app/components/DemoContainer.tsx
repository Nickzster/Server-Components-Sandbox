import React, { ReactNode } from "react";

const DemoContainer = ({
  children,
  isServer = false,
}: {
  children: ReactNode;
  isServer?: boolean;
}) => {
  return (
    <>
      <div
        style={{
          border: `2px solid ${isServer ? "red" : "black"}`,
          padding: "1em",
          margin: "1em",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default DemoContainer;
