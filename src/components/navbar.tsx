"use client"

import Link from "next/link"
import { useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-white font-bold text-xl">Citadel</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/swap" className="text-white/80 hover:text-white transition-colors">
            Swap
          </Link>
          <Link href="/pools" className="text-white/80 hover:text-white transition-colors">
            Pools
          </Link>
          <a 
            href="https://docs.citadel-finance.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            Docs
          </a>
          <ConnectButton />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-l border-white/10 z-50">
            <div className="flex items-center justify-between p-6">
              <span className="text-white font-bold text-lg">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/swap"
                className="block text-white/80 hover:text-white transition-colors py-3 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Swap
              </Link>
              <Link
                href="/pools"
                className="block text-white/80 hover:text-white transition-colors py-3 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pools
              </Link>
              <a
                href="https://docs.citadel-finance.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 hover:text-white transition-colors py-3 border-b border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </a>
              <div className="pt-4">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
