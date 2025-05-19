import dbConnect from "@/dbConnect/dbConnect";
import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const { fullname, age } = await req.json();

    console.log(fullname, age);

    return NextResponse.json(
      { message: "api run successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
