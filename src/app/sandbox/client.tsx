"use client";

import { ChangeEvent, useState } from "react";

import { useTransition } from "react";

import { addTodoItem } from "./action";

const Client = (props: { session: string }) => {
  const { session } = props;
  const [newTodo, setNewTodo] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleAddNewTodo = () =>
    startTransition(() => addTodoItem(newTodo, session));

  return (
    <div className="flex flex-row">
      <input
        type="text"
        placeholder="New Todo..."
        name="newTodo"
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        className="p-2"
      />
      <button
        onClick={handleAddNewTodo}
        className="bg-black text-white p-4 ml-2"
      >
        Add Item
      </button>
    </div>
  );
};

export default Client;
