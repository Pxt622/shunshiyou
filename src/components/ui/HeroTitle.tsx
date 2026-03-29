'use client';

import { motion } from 'framer-motion';

export default function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto mb-6"
    >
      <svg
        viewBox="0 0 800 300"
        className="w-full h-auto drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}
      >
        <defs>
          {/* 渐变 1：AI 生成 - 蓝紫粉科技感 */}
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6">
              <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#EC4899;#3B82F6" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#8B5CF6">
              <animate attributeName="stop-color" values="#8B5CF6;#EC4899;#3B82F6;#8B5CF6" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#EC4899">
              <animate attributeName="stop-color" values="#EC4899;#3B82F6;#8B5CF6;#EC4899" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* 渐变 2：藏宝图 - 橙金宝藏感 */}
          <linearGradient id="treasureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 渐变 3：5分钟 - 深色专业感 */}
          <linearGradient id="timeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* 滤镜：发光效果 */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* 滤镜：立体阴影 */}
          <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(59, 130, 246, 0.3)" />
          </filter>
        </defs>

        {/* 第一行：5分钟， */}
        <text
          x="400"
          y="70"
          textAnchor="middle"
          className="text-6xl md:text-7xl font-bold"
          fill="url(#timeGradient)"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
        >
          5分钟，
        </text>

        {/* 第二行：AI生成你的 */}
        <text
          x="400"
          y="150"
          textAnchor="middle"
          className="text-6xl md:text-7xl font-bold"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
        >
          <tspan fill="url(#aiGradient)" filter="url(#textShadow)">AI生成</tspan>
          <tspan fill="#374151" dx="10">你的</tspan>
        </text>

        {/* 第三行：周末藏宝图（带装饰） */}
        <g transform="translate(400, 240)">
          {/* 背景装饰框 */}
          <rect
            x="-220"
            y="-55"
            width="440"
            height="70"
            rx="20"
            fill="url(#treasureGradient)"
            opacity="0.15"
          />
          
          {/* 文字 */}
          <text
            textAnchor="middle"
            className="text-6xl md:text-8xl font-black"
            fill="url(#treasureGradient)"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: 900,
              filter: 'url(#glow)'
            }}
          >
            周末藏宝图
          </text>

          {/* 装饰：星星闪烁 */}
          <motion.g
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 230 -30 L 235 -20 L 245 -20 L 237 -12 L 240 -2 L 230 -8 L 220 -2 L 223 -12 L 215 -20 L 225 -20 Z"
              fill="#F59E0B"
              opacity="0.8"
            />
          </motion.g>

          <motion.g
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.9, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <path
              d="M -230 -40 L -233 -32 L -241 -32 L -235 -26 L -237 -18 L -230 -22 L -223 -18 L -225 -26 L -219 -32 L -227 -32 Z"
              fill="#F59E0B"
              opacity="0.6"
            />
          </motion.g>
        </g>

        {/* 装饰性下划线 */}
        <motion.path
          d="M 280 260 Q 400 275 520 260"
          stroke="url(#treasureGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />

        {/* 装饰：AI 芯片图标（小装饰） */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          transform="translate(680, 130)"
        >
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#3B82F6" opacity="0.1" />
          <path
            d="M 10 20 L 20 10 L 30 20 L 20 30 Z"
            fill="url(#aiGradient)"
            opacity="0.8"
          />
          <circle cx="20" cy="20" r="3" fill="#3B82F6" />
        </motion.g>

        {/* 装饰：地图标记（小装饰） */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          transform="translate(80, 140)"
        >
          <path
            d="M 20 10 C 20 10 10 10 10 20 C 10 30 20 40 20 40 C 20 40 30 30 30 20 C 30 10 20 10 20 10 Z"
            fill="url(#treasureGradient)"
            opacity="0.8"
          />
          <circle cx="20" cy="20" r="5" fill="white" />
        </motion.g>
      </svg>
    </motion.div>
  );
}