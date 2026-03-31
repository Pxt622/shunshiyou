import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json();

    // 1. 密码哈希加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. 插入数据库
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    return NextResponse.json({ message: '注册成功' }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: '用户名或邮箱已存在' }, { status: 400 });
    }
    return NextResponse.json({ message: '服务器错误' }, { status: 500 });
  }
}