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

const Sandbox = () => {
  const items: string[] = InMemoryDB.connect().readDb();

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Sandbox</h1>
      <div className="flex">
        <TodoList items={items} />
      </div>
      <br />
      <Client />
    </div>
  );
};

export default Sandbox;
