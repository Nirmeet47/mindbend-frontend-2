"use client";
import React from "react";
import "./electricBorder.css";

export default function ElectricBorder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="electric-wrapper">
      <div className="electric-inner">
        {/* PARTICLE DOTS */}
        <span className="part" id="part1"></span>
        <span className="part" id="part2"></span>
        <span className="part" id="part3"></span>
        <span className="part" id="part4"></span>

        {/* YELLOW MAIN */}
        <svg
          id="y1"
          className="yellow"
          width="415"
          height="181"
          viewBox="0 0 415 181"
          fill="none"
        >
          <path
            d="M27.2509 ..."
            stroke="#FFF2C4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* YELLOW GLOW */}
        <svg
          id="y2"
          className="yellow yellow-glow"
          width="461"
          height="227"
          viewBox="0 0 461 227"
          fill="none"
        ></svg>

        {/* BLUE MAIN */}
        <svg
          id="b1"
          className="blue"
          width="423"
          height="192"
          viewBox="0 0 423 192"
          fill="none"
        >
          <path
            d="M41.191 ..."
            stroke="#EDBAFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* BLUE GLOW */}
        <svg
          id="b2"
          className="blue"
          width="470"
          height="240"
          viewBox="0 0 470 240"
          fill="none"
        ></svg>

        {/* CHILD CONTENT (THE CARD) */}
        <div className="electric-content">{children}</div>
      </div>
    </div>
  );
}
