import React from "react";
import Client from "./client";
import InMemoryDB from "../db";

const MY_SUPER_DUPER_SECRET_VALUE_THAT_SHOULD_NOT_BE_LEAKED = "secretsauce";

const operationThatUsesSecret = async (text: string) => {
  InMemoryDB.connect().addToDb(text);
  console.log(MY_SUPER_DUPER_SECRET_VALUE_THAT_SHOULD_NOT_BE_LEAKED);
  await fetch("https://www.google.com");
};

const Sandbox = () => {
  const items: string[] = InMemoryDB.connect().readDb();

  // BETTER: Write sensitive operations as part of a different closure + reference it.
  const addTodoItem = async (text: string) => {
    "use server";
    await operationThatUsesSecret(text);
    return InMemoryDB.connect().readDb();
  };

  // BAD: This will leak the secret to the client via the network tab:
  // const addTodoItem = async (text: string) => {
  //   "use server";
  //   InMemoryDB.connect().addToDb(text);
  //   console.log(MY_SUPER_DUPER_SECRET_VALUE_THAT_SHOULD_NOT_BE_LEAKED);
  //   return InMemoryDB.connect().readDb();
  // };

  console.log("Returning items", items);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Sandbox</h1>
      <Client addTodoItem={addTodoItem} items={items} />
    </div>
  );
};

export default Sandbox;
