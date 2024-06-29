// import { NextResponse } from "next/server";

// export function middleware(request: Request) {
//   console.log(request);

//   //Without matcher, an infinite loop of redirects occur for each route
//   return NextResponse.redirect(new URL("/about", request.url));

// }

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  //For which all routes th redirect should occur
  matcher: ["/account"],
};
