"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

const TodoList = (props: { items: string[] }) => {
  if (props.items.length === 0) return <p>No items in the list!</p>;

  return (
    <div className="flex flex-col">
      {props.items.map((item, idx) => (
        <p key={`${item}-${idx}`}>{item}</p>
      ))}
    </div>
  );
};

interface IClientProps {
  addTodoItem: (text: string) => Promise<string[]>;
  items: string[];
}

const Client = ({ addTodoItem, items }: IClientProps) => {
  const [newTodo, setNewTodo] = useState("");
  const [todoItems, updateTodoItems] = useState(items);

  const handleAddNewTodo = async () => {
    const newItems = await addTodoItem(newTodo);
    updateTodoItems(newItems);
    setNewTodo("");
  };

  const itemsToDisplay = useMemo(() => todoItems.reverse(), [todoItems]);

  return (
    <>
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
      <br />
      <div className="flex">
        <TodoList items={itemsToDisplay} />
      </div>
    </>
  );
};

export default Client;
