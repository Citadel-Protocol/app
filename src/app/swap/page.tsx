import { WebGLBackground } from "@/components/webgl-background"
import { Navbar } from "@/components/navbar"
import { SwapModule } from "@/components/swap-module"
import { FaucetCard } from "@/components/faucet-card"

export default function SwapPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* WebGL Animated Background */}
      <WebGLBackground />

      {/* Semi-transparent overlay for readability */}
      <div className="fixed inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md mx-auto space-y-6">
            <SwapModule />
            <FaucetCard />
          </div>
        </main>
      </div>
    </div>
  )
}