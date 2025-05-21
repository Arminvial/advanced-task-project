/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getUserIdFromSession } from "@/lib/auth";
import Task from "@/models/task"; 

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const userId = await getUserIdFromSession();

    const tasks = await Task.find({ userId });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("خطا در دریافت تسک‌ها:", error);
    return NextResponse.json({ error: "خطا در دریافت تسک‌ها" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const result = await Task.findByIdAndDelete(params.id);

    if (!result) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("خطا در حذف تسک:", error);
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    delete body._id;

    const result = await Task.findByIdAndUpdate(params.id, body, { new: true });

    if (!result) {
      return NextResponse.json({ message: "هیچ تسکی ویرایش نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "ویرایش با موفقیت انجام شد", task: result });
  } catch (error) {
    console.error("خطا در ویرایش تسک:", error);
    return NextResponse.json({ error: "خطا در ویرایش تسک" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { status } = await req.json();

    if (!['pending', 'in_progress', 'completed'].includes(status)) {
      return NextResponse.json({ message: "وضعیت نامعتبر است" }, { status: 400 });
    }

    const result = await Task.findByIdAndUpdate(params.id, { status }, { new: true });

    if (!result) {
      return NextResponse.json({ message: "هیچ تسکی تغییر وضعیت نیافت" }, { status: 404 });
    }

    return NextResponse.json({ message: "وضعیت تسک با موفقیت تغییر کرد", task: result });
  } catch (error) {
    console.error("خطا در تغییر وضعیت تسک:", error);
    return NextResponse.json({ error: "خطا در تغییر وضعیت تسک" }, { status: 500 });
  }
}
