"use server";

import { revalidatePath } from "next/cache";
import InMemoryDB from "../db";

export const addTodoItem = (text: string) => {
  console.log("Adding item: ", text);
  InMemoryDB.connect().addToDb(text);
  revalidatePath("/sandbox");
};
