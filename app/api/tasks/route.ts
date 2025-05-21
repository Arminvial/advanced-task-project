import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getUserIdFromSession } from "@/lib/auth";
import Task from "@/models/task"; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromSession();
    await connectDB(); 

    const tasks = await Task.find({ userId }); 

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json({ error: "خطا در دریافت تسک‌ها" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromSession();
    const body = await request.json();

    await connectDB(); 

    const newTask = new Task({
      ...body,
      userId,
    });

    const result = await newTask.save(); 

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
