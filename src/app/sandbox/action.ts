"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import InMemoryDB from "../db";

export const addTodoItem = async (text: string, session: string) => {
  console.log("Action called!");
  console.log("Adding item: ", text);
  //const res = await fetch("https://www.google.com");
  //console.log(res);
  // console.log(headers().values());
  InMemoryDB.connect().addToDb(text, session);
  revalidatePath("/sandbox");
};
