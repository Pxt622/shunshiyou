'use client';

import { motion } from 'framer-motion';

export default function HeroTitleSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto mb-8 px-4"
    >
      <svg 
        viewBox="0 0 900 100" 
        className="w-full h-auto hidden md:block"
        style={{ fontFamily: "'Alimama ShuZhiTi', 'PingFang SC', sans-serif" }}
      >
        <defs>
          {/* AI 渐变 */}
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          {/* 藏宝图渐变 */}
          <linearGradient id="treasureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          {/* 阴影滤镜 */}
          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(59, 130, 246, 0.2)"/>
          </filter>
        </defs>

        {/* 5分钟， */}
        <text x="50" y="75" fontSize="72" fontWeight="bold" fill="#111827">
          5分钟，
        </text>

        {/* AI（带渐变和装饰线） */}
        <text x="230" y="75" fontSize="72" fontWeight="bold" fill="url(#aiGradient)" filter="url(#textShadow)">
          AI
        </text>
        
        {/* AI 下划线 */}
        <motion.path
          d="M 235 85 Q 260 80 285 85"
          stroke="url(#aiGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        />

        {/* 生成你的 */}
        <text x="310" y="75" fontSize="72" fontWeight="bold" fill="#111827">
          生成你的
        </text>

        {/* 周末藏宝图（带下划线） */}
        <text x="570" y="75" fontSize="72" fontWeight="bold" fill="url(#treasureGradient)">
          周末藏宝图
        </text>
        
        {/* 藏宝图装饰下划线 */}
        <motion.rect
          x="575"
          y="82"
          width="320"
          height="8"
          fill="#FEF3C7"
          rx="4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{ transformOrigin: 'left' }}
        />
      </svg>

      {/* 移动端简化版 */}
      <div className="md:hidden text-center">
        <h1 className="font-shuzhi text-4xl sm:text-5xl text-gray-900 leading-tight">
          <span>5分钟，</span>
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">AI</span>
          <span>生成你的</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
            周末藏宝图
          </span>
        </h1>
      </div>
    </motion.div>
  );
}