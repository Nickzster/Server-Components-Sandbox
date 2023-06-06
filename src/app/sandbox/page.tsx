import React from "react";
import Client from "./client";
import InMemoryDB from "../db";

const TodoList = (props: { items: string[] }) => {
  if (props.items.length === 0) return <p>No items in the list!</p>;

  return (
    <div className="flex flex-col">
      {props.items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

const Sandbox = ({ searchParams }: { searchParams: { id?: string } }) => {
  let sessionId = searchParams.id;

  if (!sessionId)
    return (
      <h1 className="p-10 text-lg font-bold">
        Invalid session! Append an <code>?id=YOUR_NAME</code> to the URL to
        proceed.
      </h1>
    );

  const items = InMemoryDB.connect().getSessionItems(sessionId);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Sandbox</h1>
      <Client session={sessionId} />
      <br />
      <div className="flex">
        <TodoList items={items.reverse()} />
      </div>
    </div>
  );
};

export default Sandbox;
