'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Map, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false); // 默认显示注册
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('正在处理...');
    
    // 根据状态决定调用的 API 端点 (登录和注册)
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 pb-12 px-4">
      {/* GitHub 风格：页面顶部的大 Logo */}
      <Link href="/" className="mb-12">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
          <Map className="w-9 h-9 text-white" />
        </div>
      </Link>

      <div className="w-full max-w-[340px] sm:max-w-[400px]">
        {/* 1. 标题区 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">
            {isLogin ? '登录到瞬时游' : '注册新账号'}
          </h1>
          {!isLogin && (
            <p className="mt-2 text-sm text-gray-600">
              只需几秒钟，开启您的智能行程规划。
            </p>
          )}
        </div>

        {/* 2. 表单卡片区 */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 用户名 */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    placeholder="shunshiyou"
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isLogin ? '用户名或邮箱' : '邮箱地址'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="user@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  密码
                </label>
                {isLogin && (
                  <Link href="#" className="text-xs text-blue-600 hover:text-blue-700">
                    忘记密码?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* 提交按钮 (参考 GitHub 绿色按钮) */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2da44e] hover:bg-[#2c974b] text-white rounded-lg font-semibold text-center transition shadow-sm"
            >
              {isLogin ? '登录' : '创建账号'}
            </button>
            
            {message && <p className="text-center text-sm text-red-600 pt-2">{message}</p>}
          </form>
        </div>

        {/* 3. 切换状态区 (参考 GitHub 底部) */}
        <div className="border border-gray-200 p-6 rounded-xl text-center text-sm text-gray-700">
          {isLogin ? '瞬时游新手？' : '已经有账号？'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? '创建一个账号' : '登录'}
          </button>
          。
        </div>
      </div>
    </div>
  );
}