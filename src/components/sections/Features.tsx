'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Brain, Camera, Shield } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: "实时决策中枢",
    description: "美团/高德数据实时融合，每15分钟同步商户库存与路况，AI清洗虚假评价，拒绝照骗",
    tag: "平均节省决策时间117分钟",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Brain,
    title: "RAG记忆引擎",
    description: "向量数据库存储你的每一次选择，下次自动推荐'类似上次的胶片风咖啡馆'",
    tag: "200万用户月存800元",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Camera,
    title: "社交货币工厂",
    description: "基于真实行程AI生图(胶片/ins/新中式风)，自动撰写带emoji的探店文案，15秒vlog脚本",
    tag: "一键生成小红书9宫格",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Shield,
    title: "价格保险箱",
    description: "AI实时监控多平台价差，发现更低价格自动发放等额优惠券",
    tag: "买贵必赔",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 bg-gray-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium mb-4 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            核心能力
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            四大核心功能
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            从规划到分享，AI 全程为你护航
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  tag, 
  gradient,
  index,
  isInView
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cardRef.current.style.setProperty('--mouse-x', `${x}`);
    cardRef.current.style.setProperty('--mouse-y', `${y}`);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', '0.5');
      cardRef.current.style.setProperty('--mouse-y', '0.5');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* 渐变光效背景 */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* 图标 */}
        <motion.div 
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        
        {/* 标题 */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        {/* 描述 */}
        <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-grow">
          {description}
        </p>
        
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 bg-gray-50 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
          {tag}
        </div>
      </div>
    </motion.div>
  );
}