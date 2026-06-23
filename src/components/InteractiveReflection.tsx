import React, { useState, useRef } from "react";
import { Move } from "lucide-react";

export default function InteractiveReflection() {
  const [angle, setAngle] = useState<number>(45); // default 45 degrees relative to normal
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle manual coordinate calculations for mouse drag on the ray
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height - 30; // Mirror is at bottom y = height - 30

    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dx = x - centerX;
    const dy = centerY - y;

    if (dy > 10) {
      // Calculate angle in degrees from the normal (vertical y-axis)
      let rad = Math.atan2(dx, dy);
      let deg = Math.round((rad * 180) / Math.PI);
      
      // Limit to [-80, 80] degrees
      if (deg < -80) deg = -80;
      if (deg > 80) deg = 80;

      // We want positive degrees representing absolute deviation from normal
      setAngle(Math.abs(deg));
    }
  };

  // Coordinates helper
  const r = 110; // Ray length
  const radAngle = (angle * Math.PI) / 180;
  
  // Incident Ray starts top-left (or top-right depending on sign, let's make it fixed coming from left to center)
  const incidentX = 150 - r * Math.sin(radAngle);
  const incidentY = 170 - r * Math.cos(radAngle);
  
  // Reflected Ray goes to top-right
  const reflectedX = 150 + r * Math.sin(radAngle);
  const reflectedY = 170 - r * Math.cos(radAngle);

  return (
    <div className="w-full bg-[#02030a]/80 rounded-lg p-4 border border-white/5 flex flex-col justify-between h-full select-none" ref={containerRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Esquema Interativo</span>
        <div className="flex space-x-2 text-xs font-mono">
          <span className="text-[#f5a855] font-semibold">&theta;i = {angle}°</span>
          <span className="text-white/30">=</span>
          <span className="text-[#a8d4f5] font-semibold">&theta;r = {angle}°</span>
        </div>
      </div>

      {/* SVG Canvas for interactive reflection */}
      <svg
        className="w-full h-40 cursor-crosshair touch-none"
        viewBox="0 0 300 200"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* Sky background */}
        <rect width="300" height="200" fill="none" />

        {/* Normal line (dash) */}
        <line
          x1="150"
          y1="20"
          x2="150"
          y2="170"
          stroke="rgba(255,255,255,0.15)"
          strokeDasharray="4 4"
          strokeWidth="1.5"
        />
        <text x="150" y="15" textAnchor="middle" fill="rgba(255,255,255,0.3)" className="text-[9px] font-mono">
          Normal
        </text>

        {/* Angles markers arcs */}
        {angle > 10 && (
          <>
            {/* Incident angle arc */}
            <path
              d={`M 150 130 A 40 40 0 0 0 ${150 - 40 * Math.sin(radAngle)} ${170 - 40 * Math.cos(radAngle)}`}
              fill="none"
              stroke="#f5a855"
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* Reflected angle arc */}
            <path
              d={`M 150 130 A 40 40 0 0 1 ${150 + 40 * Math.sin(radAngle)} ${170 - 40 * Math.cos(radAngle)}`}
              fill="none"
              stroke="#a8d4f5"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </>
        )}

        {/* Incident Ray (Orange) */}
        <line
          x1={incidentX}
          y1={incidentY}
          x2="150"
          y2="170"
          stroke="#f5a855"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Incident Ray Arrow pointer */}
        <polygon
          points={`150,170 ${150 - 10 * Math.sin(radAngle) - 4 * Math.cos(radAngle)},${170 - 10 * Math.cos(radAngle) + 4 * Math.sin(radAngle)} ${150 - 10 * Math.sin(radAngle) + 4 * Math.cos(radAngle)},${170 - 10 * Math.cos(radAngle) - 4 * Math.sin(radAngle)}`}
          fill="#f5a855"
        />

        {/* Reflected Ray (Ice Blue) */}
        <line
          x1="150"
          y1="170"
          x2={reflectedX}
          y2={reflectedY}
          stroke="#a8d4f5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Reflected Ray arrow pointer */}
        <polygon
          points={`${reflectedX},${reflectedY} ${reflectedX - 10 * Math.sin(radAngle) - 4 * Math.cos(radAngle)},${reflectedY + 10 * Math.cos(radAngle) - 4 * Math.sin(radAngle)} ${reflectedX - 10 * Math.sin(radAngle) + 4 * Math.cos(radAngle)},${reflectedY + 10 * Math.cos(radAngle) + 4 * Math.sin(radAngle)}`}
          fill="#a8d4f5"
        />

        {/* Glass Plate / Ice Crystal surface */}
        <rect
          x="70"
          y="170"
          width="160"
          height="10"
          rx="2"
          fill="rgba(168, 212, 245, 0.15)"
          stroke="rgba(168, 212, 245, 0.4)"
          strokeWidth="1.5"
        />
        <text x="150" y="193" textAnchor="middle" fill="#a8d4f5" className="text-[10px] font-grotesk font-medium tracking-wide">
          Cristal de Gelo (Placa Hexagonal)
        </text>

        {/* Handles for dragging explanation */}
        <g transform={`translate(${incidentX}, ${incidentY})`} className="cursor-ew-resize">
          <circle r="8" fill="#f5a855" opacity="0.4" className="animate-ping" />
          <circle r="4" fill="#f5a855" />
        </g>
      </svg>

      {/* Angle slider control as alternative interaction */}
      <div className="mt-3 flex items-center justify-between space-x-4">
        <span className="text-[10px] text-white/50 font-sans">Arrastar raio ou ajustar:</span>
        <input
          type="range"
          min="5"
          max="85"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-1/2 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ice-blue"
        />
        <span className="text-[10px] font-mono font-bold text-ice-blue">{angle}°</span>
      </div>

      <div className="mt-2 text-center border-t border-white/5 pt-2 flex items-center justify-center space-x-1">
        <span className="font-display text-xs italic text-white/80 font-medium">Lei da Reflexão:</span>
        <span className="font-mono text-xs text-white/90 font-bold bg-white/[0.05] px-1.5 py-0.5 rounded">&theta;i = &theta;r</span>
      </div>
    </div>
  );
}
