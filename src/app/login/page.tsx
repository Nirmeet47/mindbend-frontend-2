"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const polynomialShape =
    "polygon(10% 0,60% 0,65% 5%,95% 5%,100% 10%,100% 95%,95% 100%,5% 100% ,0 95%,0 10%)";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Image/Effect - Using a placeholder for the globe effect */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url(/authbg.jpg)", // Sci-fi globe texture
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay gradient to darken the background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-0" /> */}

      {/* THE CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-md p-4">
        {/* Border Layer (The glowing outline) */}
        <div
          className="relative bg-cyan-500 opacity-70 p-[1px]" // p-[1px] acts as border width
          style={{
            clipPath: polynomialShape,
            boxShadow: "0 0 15px rgba(6,182,212, 0.95)", // Cyan glow
          }}
        >
          {/* Content Layer (The dark inner card) */}
          <div
            className="bg-slate-900/90 backdrop-blur-sm p-8 flex flex-col gap-6 "
            // className="bg-slate-900/50 backdrop-blur-md p-8 flex flex-col gap-6"

            style={{
              clipPath: polynomialShape,
            }}
          >
            {/* Header Text */}
            <div className=" space-y-2 mb-2">
              <h2 className="ml-5 text-cyan-400 text-xl font-bold tracking-widest uppercase">
                System Access
              </h2>
              <p className="text-center text-xs text-cyan-200/60 font-mono">
                Welcome back! Please login to your account
              </p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name/Email Input */}
              <div className="group relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border border-cyan-500/30 text-cyan-100 px-4 py-3 outline-none focus:border-cyan-400 transition-colors"
                />
                <label
                  className="absolute left-4 top-3 text-cyan-500/50 text-sm transition-all 
                                peer-focus:-top-2.5 peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-cyan-400 peer-focus:text-xs
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-cyan-400 peer-not-placeholder-shown:text-xs pointer-events-none"
                >
                  Name
                </label>
              </div>

              {/* Password Input */}
              <div className="group relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border border-cyan-500/30 text-cyan-100 px-4 py-3 outline-none focus:border-cyan-400 transition-colors"
                />
                <label
                  className="absolute left-4 top-3 text-cyan-500/50 text-sm transition-all 
                                peer-focus:-top-2.5 peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-cyan-400 peer-focus:text-xs
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-cyan-400 peer-not-placeholder-shown:text-xs pointer-events-none"
                >
                  Password
                </label>
              </div>

              {/* Checkbox & Forgot Password */}
              <div className="flex items-center justify-between text-xs text-cyan-200/70">
                <label className="flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-colors">
                  <input type="checkbox" className="accent-cyan-500 w-3 h-3" />
                  <span>Remember Me</span>
                </label>
                <Link
                  href="#"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(8,145,178,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]"
                style={{
                  clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 30%)", // Small cut on bottom left of button
                }}
              >
                LOG IN
              </button>
            </form>

            {/* Footer / Legal */}
            <div className="text-center mt-4">
              <span className="text-[10px] text-cyan-500/40 uppercase tracking-widest">
                Terms | Policy
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner lines (HUD elements) */}
        {/* <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg pointer-events-none"></div> */}
      </div>
    </div>
  );
};

export default Login;
