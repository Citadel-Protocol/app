"use client"

import { useState } from "react"
import { formatUnits } from "viem"
import { formatTokenAmount } from "@/utils/formatting"

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxBalance?: bigint
  decimals?: number
  symbol?: string
  label?: string
  className?: string
  disabled?: boolean
  variant?: "default" | "deposit" | "withdraw"
}

export function AmountInput({
  value,
  onChange,
  placeholder = "0.0",
  maxBalance,
  decimals = 18,
  symbol = "",
  label,
  className = "",
  disabled = false,
  variant = "default"
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case "deposit":
        return "focus:border-green-500/50 border-green-500/20"
      case "withdraw":
        return "focus:border-red-500/50 border-red-500/20"
      default:
        return "focus:border-blue-500/50 border-white/20"
    }
  }

  const getMaxButtonColor = () => {
    switch (variant) {
      case "deposit":
        return "text-green-400 hover:text-green-300"
      case "withdraw":
        return "text-red-400 hover:text-red-300"
      default:
        return "text-blue-400 hover:text-blue-300"
    }
  }

  const formattedMaxBalance = maxBalance 
    ? formatTokenAmount(maxBalance, decimals)
    : "0"

  const setMaxBalance = () => {
    if (maxBalance) {
      onChange(formatUnits(maxBalance, decimals))
    }
  }

  const setPercentage = (percentage: number) => {
    if (maxBalance) {
      const amount = (maxBalance * BigInt(percentage)) / BigInt(100)
      onChange(formatUnits(amount, decimals))
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label and Balance */}
      {(label || maxBalance) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-white/60">{label}</span>}
          {maxBalance && (
            <span className="text-white/60">
              Balance: {formattedMaxBalance} {symbol}
            </span>
          )}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-white/5 border rounded-lg py-3 px-4 pr-16 
            text-white placeholder-white/40 focus:outline-none transition-all
            ${getVariantStyles()}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
        {maxBalance && (
          <button
            type="button"
            onClick={setMaxBalance}
            disabled={disabled}
            className={`
              absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium
              ${getMaxButtonColor()}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            MAX
          </button>
        )}
      </div>

      {/* Percentage Buttons */}
      {maxBalance && !disabled && (
        <div className="flex gap-2">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              type="button"
              onClick={() => setPercentage(percentage)}
              className="flex-1 py-1 px-2 text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded transition-all"
            >
              {percentage}%
            </button>
          ))}
        </div>
      )}

      {/* Range Slider */}
      {maxBalance && !disabled && (
        <input
          type="range"
          min="0"
          max={formatUnits(maxBalance, decimals)}
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
        />
      )}
    </div>
  )
}