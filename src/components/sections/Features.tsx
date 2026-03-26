'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Camera, Shield } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: "实时决策中枢",
    description: "美团/高德数据实时融合，每15分钟同步商户库存与路况，AI清洗虚假评价，拒绝照骗",
    tag: "平均节省决策时间117分钟"
  },
  {
    icon: Brain,
    title: "RAG记忆引擎",
    description: "向量数据库存储你的每一次选择，下次自动推荐'类似上次的胶片风咖啡馆'",
    tag: "200万用户月存800元"
  },
  {
    icon: Camera,
    title: "社交货币工厂",
    description: "基于真实行程AI生图(胶片/ins/新中式风)，自动撰写带emoji的探店文案，15秒vlog脚本",
    tag: "一键生成小红书9宫格",
    link: "/copywriting",  // 添加这行
    linkText: "立即生成文案"  // 添加这行
  },
  {
    icon: Shield,
    title: "价格保险箱",
    description: "AI实时监控多平台价差，发现更低价格自动发放等额优惠券",
    tag: "买贵必赔"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
        >
          四大核心功能
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, tag, link, linkText, index }: {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  link?: string;
  linkText?: string;
  index: number;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer feature-card scanning-border"
    >
      <div className="relative z-10 flex flex-col h-full">
  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
    <Icon className="w-7 h-7 text-brand-blue" />
  </div>
  
  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
  <p className="text-gray-600 leading-relaxed mb-4 text-sm flex-grow min-h-[80px]">{description}</p>
  
        <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
          {tag}
        </div>
        
        {link && (
          <Link href={link} className="mt-4 block">
            <button className="w-full py-2.5 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transform duration-200">
              {linkText}
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}