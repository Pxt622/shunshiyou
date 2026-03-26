'use client';

import { motion } from 'framer-motion';
import { Map, Sparkles, Play } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';

// 动态导入粒子背景，禁用服务器端渲染（解决超时问题）
const ParticleBackground = dynamic(
  () => import('../ui/ParticleBackground'),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
  }
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>你的AI旅游搭子</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          <span className="text-brand-orange">5分钟</span>
          <span className="text-brand-blue">，</span>
          <br />
          AI生成你的周末藏宝图
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          告别2小时信息筛选，让AI大模型成为你的专属旅游搭子
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/plan">
            <MagneticButton 
              className="px-8 py-4 bg-brand-blue text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2"
              strength={0.3}
            >
              <Map className="w-5 h-5" />
              立即规划
            </MagneticButton>
          </Link>
          
          <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:border-brand-blue hover:text-brand-blue hover:shadow-lg active:translate-y-0 active:scale-95 transform">
            <Play className="w-5 h-5" />
            观看演示
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            已对接美团·高德实时数据
          </span>
          <span>|</span>
          <span>10万+城市探索者选择</span>
        </motion.div>
      </div>
    </section>
  );
}