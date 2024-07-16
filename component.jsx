/**
 * v0 by Vercel.
 * @see https://v0.dev/t/70wzbypaPHz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
                    <Button onClick={handleIntroductionNext}>Next</Button>
                  </div>
                </>
              )}
              {introductionStep === 4 && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">
                    Oh, I'm sorry to hear that!
                  </h1>
                  <p className="text-[#b3b3b3]">
                    I hope your day gets better. Please let me know if there's anything I can do to help.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleIntroductionNext}>Okay</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Crypto donations:</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className="group relative rounded-lg border border-[#1a1a1a] bg-[#141414] p-4 transition-all duration-300 hover:border-[#4d4d4d] shadow-lg cursor-pointer"
            onClick={() => handleCryptoSelect("bitcoin")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BitcoinIcon className="h-6 w-6 text-[#f2a900]" />
                <span className="text-lg font-medium text-[#f0f0f0]">Bitcoin</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-r from-[#f2a900]/20 to-[#f2a900]/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </div>
          <div
            className="group relative rounded-lg border border-[#1a1a1a] bg-[#141414] p-4 transition-all duration-300 hover:border-[#4d4d4d] shadow-lg cursor-pointer"
            onClick={() => handleCryptoSelect("litecoin")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BitcoinIcon className="h-6 w-6 text-[#c2c2c2]" />
                <span className="text-lg font-medium text-[#f0f0f0]">Litecoin</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-r from-[#c2c2c2]/20 to-[#c2c2c2]/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </div>
          <div
            className="group relative rounded-lg border border-[#1a1a1a] bg-[#141414] p-4 transition-all duration-300 hover:border-[#4d4d4d] shadow-lg cursor-pointer"
            onClick={() => handleCryptoSelect("ethereum")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EclipseIcon className="h-6 w-6 text-[#627eea]" />
                <span className="text-lg font-medium text-[#f0f0f0]">Ethereum</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-r from-[#627eea]/20 to-[#627eea]/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </div>
        </div>
        {selectedCrypto && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#0d0d0d]/80 z-50">
            <div className="bg-[#141414] rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-4 right-4 text-[#f0f0f0] hover:text-[#b3b3b3] transition-colors"
                onClick={handleClose}
              >
                <XIcon className="h-6 w-6" />
              </button>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {selectedCrypto === "bitcoin" && <BitcoinIcon className="h-8 w-8 text-[#f2a900]" />}
                  {selectedCrypto === "litecoin" && <BitcoinIcon className="h-8 w-8 text-[#c2c2c2]" />}
                  {selectedCrypto === "ethereum" && <EclipseIcon className="h-8 w-8 text-[#627eea]" />}
                  <span className="text-2xl font-medium text-[#f0f0f0]">{selectedCrypto.toUpperCase()} Address</span>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 flex justify-center">
                  <img
                    src="/placeholder.svg"
                    width={200}
                    height={200}
                    alt={`${selectedCrypto.toUpperCase()} QR Code`}
                  />
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-[#b3b3b3] break-all flex items-center justify-between">
                  {selectedCrypto === "bitcoin"
                    ? "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    : selectedCrypto === "litecoin"
                    ? "LVg2kJoFNg1yCRDClybzvHVoPLg8iBx84V"
                    : "Ox7E5Aer4Pp8oAd3d47z4bHQH563DcD6V"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#b3b3b3] hover:text-[#f0f0f0] transition-colors"
                    onClick={() =>
                      handleCopy(
                        selectedCrypto === "bitcoin"
                          ? "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                          : selectedCrypto === "litecoin"
                          ? "LVg2kJoFNg1yCRDClybzvHVoPLg8iBx84V"
                          : "Ox7E5Aer4Pp8oAd3d47z4bHQH563DcD6V",
                      )
                    }
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BitcoinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  )
}


function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function EclipseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
