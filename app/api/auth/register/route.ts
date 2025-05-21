import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'اطلاعات ناقص است' }, { status: 400 });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'کاربری با این ایمیل وجود دارد' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'ثبت‌نام موفق' }, { status: 200 });
  } catch (error) {
    console.error("خطا در ثبت‌نام:", error);
    return NextResponse.json({ error: 'خطا در ثبت‌نام' }, { status: 500 });
  }
}
