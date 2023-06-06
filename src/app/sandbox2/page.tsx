import React from "react";
import Client from "./client";
import InMemoryDB from "../db";

const A_SECRET = "secretsauce";

const operationThatUsesSecret = async (text: string, session?: string) => {
  if (!session) return;
  InMemoryDB.connect().addToDb(text, session);
  console.log(A_SECRET);
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

  // BETTER: Write sensitive operations as part of a different closure + reference it.
  const addTodoItem = async (text: string) => {
    "use server";
    await operationThatUsesSecret(text, sessionId);
    console.log(sessionId);
    return InMemoryDB.connect().getSessionItems(sessionId);
  };

  // BAD: This will leak the secret to the client via the network tab:
  // const addTodoItem = async (text: string) => {
  //   "use server";
  //   InMemoryDB.connect().addToDb(text);
  //   console.log(A_SECRET);
  //   return InMemoryDB.connect().readDb();
  // };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Sandbox</h1>
      <Client addTodoItem={addTodoItem} items={items} />
    </div>
  );
};

export default Sandbox;
