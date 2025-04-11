'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const decide = async () => {
    if (!option1 || !option2) {
      setError('Please enter both choices.')
      return
    }

    setLoading(true)
    setError('')
    setResult('')

    try {
      const res = await fetch('/api/quantum')
      const data = await res.json()

      if (data?.value === undefined) throw new Error('Quantum data missing')

      const pick = data.value % 2 === 0 ? option1 : option2
      setResult(pick)
    } catch {
      setError('⚠️ Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-[#1b1b3a] to-[#1e0f3f] text-white px-4 py-10 animate-fade-in">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Quantum Decider
      </motion.h1>

      <motion.p
        className="text-center text-lg mb-8 max-w-xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Enter two choices. We'll ask the universe to decide — <span className="italic text-purple-300">truly randomly&apos;s</span>.
      </motion.p>

      <div className="flex flex-col items-center w-full max-w-md gap-3">
        <input
          className="bg-[#2a2a4a] border border-purple-500 focus:ring-2 focus:ring-purple-600 text-white px-4 py-3 rounded-lg w-full placeholder-gray-400"
          type="text"
          placeholder="First option"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <input
          className="bg-[#2a2a4a] border border-purple-500 focus:ring-2 focus:ring-purple-600 text-white px-4 py-3 rounded-lg w-full placeholder-gray-400"
          type="text"
          placeholder="Second option"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 w-full transition-all shadow-md"
          onClick={decide}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Asking the Quantum...' : 'Ask the Quantum'}
        </motion.button>
        {result && (
          <motion.p
            className="mt-6 text-2xl text-green-400 font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Universe says: <span className="underline decoration-wavy decoration-green-500">{result}</span>
          </motion.p>
        )}
        {error && (
          <p className="mt-4 text-red-400 font-semibold text-center">
            {error}
          </p>
        )}
      </div>

      <div className="mt-20 max-w-2xl text-center text-gray-300 px-4 text-base leading-relaxed">
        <motion.h2
          className="text-2xl font-bold mb-4 text-purple-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Quantum Decider
        </motion.h2>
        <p className="mb-3">
          I was trying to understand if humans truly have free will. And I realized — we don’t. Everything we do is
          determined. Nothing is truly ours, or truly random. Even flipping a coin can be predicted.
        </p>
        <p className="mb-3">
          So I started searching for something truly unpredictable. That’s when I found out: photons are. Their quantum
          behavior escapes determinism. And from that realization, this site was born.
        </p>
        <p className="mb-3">
          Quantum Decider defies predictability. Every decision made here is based on quantum randomness — the raw,
          untouchable uncertainty at the heart of reality.
        </p>
        <p className="mb-3">
          The randomness comes from the Australian National University’s Quantum Random Number Generator (QRNG), which
          measures quantum fluctuations of vacuum to generate numbers that are physically impossible to predict — ever.
        </p>
        <p>
          For once, believe this choice could never have been predicted. In another universe, you may have gotten a
          different outcome. Maybe you just made a difference.
        </p>
      </div>
    </main>
  )
}
