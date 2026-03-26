'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Send } from 'lucide-react';

const footerLinks = {
  '产品功能': ['AI路线规划', '实时库存查询', '小红书文案生成'],
  '关于我们': ['团队介绍', '联系我们', '隐私政策']
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo区 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">瞬时游</span>
            </div>
            <p className="text-gray-400 mb-4">Z世代微度假AI决策引擎</p>
          </div>

          {/* 链接列表 */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 邮件订阅 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">订阅每周出逃计划</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入你的邮箱"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                订阅
              </button>
            </form>
            {isSubscribed && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm mt-2">
                订阅成功！
              </motion.p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 瞬时游团队 | 阿里云Serverless提供算力支持 | 浙江省大学生创业项目</p>
        </div>
      </div>
    </footer>
  );
}