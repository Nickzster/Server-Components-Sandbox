import { headers } from "next/headers";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //console.log("Middleware!!");
  //request.headers.set("Foo", "Bar");
}
