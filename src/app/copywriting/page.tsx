'use client'

import { useState } from 'react'
import { ImageIcon, Wand2, Sparkles, Copy, Check } from 'lucide-react'

export default function CopywritingPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      })
      
      const data = await response.json()
      if (data.content) {
        setResult(data.content)
      }
    } catch (error) {
      console.error('生成失败:', error)
      setResult('生成失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white mb-4">
            <Wand2 className="w-5 h-5" />
            <span className="font-semibold">小红书文案助手</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI 文案生成器
          </h1>
          <p className="text-gray-600">输入关键词，一键生成爆款小红书文案</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-gray-700">
            <ImageIcon className="w-5 h-5 text-pink-500" />
            <span className="font-medium">输入描述</span>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如：三亚旅游攻略，5天4晚，预算3000元..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="mt-4 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>生成中...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                生成文案
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-700">生成结果</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '复制'}
              </button>
            </div>
            <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}