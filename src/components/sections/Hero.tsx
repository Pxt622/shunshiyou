'use client';

import { motion } from 'framer-motion';
import { Map, Sparkles, Camera } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';

const ParticleBackground = dynamic(
  () => import('../ui/ParticleBackground'),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
  }
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white pt-20">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 顶部标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-600 text-sm font-medium mb-10 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>你的AI旅游搭子</span>
        </motion.div>

        {/* 大标题 - 一行排版（阿里妈妈数智体） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          {/* 桌面端：一行大字 */}
          <h1 className="hidden md:block font-shuzhi text-6xl lg:text-7xl xl:text-8xl text-gray-900 leading-none tracking-tight">
            <span>5分钟，</span>
            <span className="relative inline-block mx-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                AI
              </span>
              {/* AI 文字下的装饰线 */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <path
                  d="M 0 5 Q 50 0 100 5"
                  stroke="url(#aiLineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="aiLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
            <span>生成你的</span>
            <span className="relative inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              周末藏宝图
              {/* 装饰下划线 */}
              <motion.div
                className="absolute -bottom-1 left-0 h-2 bg-amber-200/60 -z-10 rounded-sm"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              />
            </span>
          </h1>

          {/* 移动端：两行（保持可读性） */}
          <h1 className="md:hidden font-shuzhi text-4xl sm:text-5xl text-gray-900 leading-tight tracking-tight">
            <div className="mb-2">
              <span>5分钟，</span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                AI
              </span>
              <span>生成</span>
            </div>
            <div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                你的周末藏宝图
              </span>
            </div>
          </h1>
        </motion.div>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          告别2小时信息筛选，让AI大模型成为你的专属旅游搭子
        </motion.p>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/plan">
            <MagneticButton 
              className="group px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-3 transition-all duration-300 text-lg font-medium"
              strength={0.2}
            >
              <Map className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              立即规划
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </MagneticButton>
          </Link>
          
          <Link href="/copywriting">
            <MagneticButton 
              className="group px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold hover:border-pink-300 hover:bg-pink-50/50 flex items-center gap-3 transition-all duration-300 text-lg font-medium"
              strength={0.2}
            >
              <Camera className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
              生成文案
            </MagneticButton>
          </Link>
        </motion.div>

        {/* 底部信任标识 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">已对接美团·高德实时数据</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <span className="font-bold text-gray-800">10万+</span>
            <span>城市探索者选择</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}