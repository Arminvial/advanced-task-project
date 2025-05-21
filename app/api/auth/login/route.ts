import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import User from "@/models/users"; 

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'اطلاعات ناقص است' }, { status: 400 });
  }

  try {
    await connectDB(); 

    
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return NextResponse.json({ message: 'کاربر پیدا نشد' }, { status: 404 });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'اطلاعات ورود اشتباه است' }, { status: 400 });
    }

    return NextResponse.json({ message: 'ورود موفق' }, { status: 200 });
  } catch (error) {
    console.error("خطا در ورود:", error);
    return NextResponse.json({ error: 'خطا در ورود' }, { status: 500 });
  }
}
