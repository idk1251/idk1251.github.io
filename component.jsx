"use client"

import * as React, { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [introductionStep, setIntroductionStep] = useState(1)
  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto)
  }
  const handleClose = () => {
    setSelectedCrypto(null)
  }
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }
  const handleIntroductionNext = () => {
    if (introductionStep === 1) {
      setIntroductionStep(2)
    } else if (introductionStep === 2) {
      setIntroductionStep(3)
    } else if (introductionStep === 3) {
      setShowIntroduction(false)
    } else if (introductionStep === 4) {
      setShowIntroduction(false)
    }
  }
  const handleIntroductionBad = () => {
    setIntroductionStep(4)
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0d0d0d] px-4 py-12 sm:px-6 lg:px-8">
      {showIntroduction && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0d0d0d]/80 z-50">
          <div className="bg-[#141414] rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <div className="space-y-4">
              {introductionStep === 1 && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">
                    Hey! How are you doing today?
                  </h1>
                  <div className="flex justify-end">
                    <Button onClick={handleIntroductionNext}>Good</Button>
                    <Button onClick={handleIntroductionBad}>Bad</Button>
                  </div>
                </>
              )}
              {introductionStep === 2 && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Welcome!</h1>
                  <p className="text-[#b3b3b3]">
                    This website is designed by me (discord: s6eg4se54g), I have worked very hard on this website for my
                    donators!
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleIntroductionNext}>Next</Button>
                  </div>
                </>
              )}
              {introductionStep === 3 && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">
                    Donations are welcome!
                  </h1>
                  <p className="text-[#b3b3b3]">Donations will help me in education and my own life decisions!</p>
                  <p className="text-[#b3b3b3]" />
                  <div className="flex justify-end">
                    <Button onClick={handleIntroductionNext}>OK</Button>
                  </div>
                </>
              )}
              {introductionStep === 4 && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Welcome!</h1>
                  <p className="text-[#b3b3b3]">Donations are welcome!</p>
                  <div className="flex justify-end">
                    <Button onClick={handleIntroductionNext}>Next</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#f0f0f0]">Crypto Donations</h2>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => handleCryptoSelect('BTC')}>BTC</Button>
          <Button onClick={() => handleCryptoSelect('ETH')}>ETH</Button>
          <Button onClick={() => handleCryptoSelect('USDT')}>USDT</Button>
        </div>
        {selectedCrypto
