"use client";

import { useState } from "react";
import Image from "next/image";

type Item = {
  n: string;
  title: string;
  desc: string;
  image: any;
};

interface Props {
  items: Item[];
}

const ExpandOnHover = ({ items }: Props) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop + Tablet */}
        <div className="hidden md:flex h-[500px] gap-2">
          {items.map((item, idx) => {
            const isActive = active === idx;

            return (
              <div
                key={item.n}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-out flex-1 ${
                  isActive ? "md:flex-[5]" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />

                <div className="absolute inset-0 bg-black/40" />

                {/* Number */}
                <div className="absolute left-6 top-6 z-10">
                  <span className="text-white/70 text-sm font-mono">
                    {item.n}
                  </span>
                </div>

                {/* Expanded Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 z-10 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <h3 className="text-4xl md:text-5xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg text-white/80 max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* Inactive Label */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <p className="text-white text-sm md:text-base rotate-90 whitespace-nowrap opacity-80 font-medium tracking-wider">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Version - Vertical Stack */}
        <div className="md:hidden space-y-6">
          {items.map((item, idx) => {
            const isActive = active === idx;

            return (
              <div
                key={item.n}
                onClick={() => setActive(idx)}
                className="relative overflow-hidden rounded-3xl cursor-pointer group"
              >
                <div className="relative h-[280px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Number */}
                  <div className="absolute left-5 top-5 z-10">
                    <span className="text-white/70 text-sm font-mono">
                      {item.n}
                    </span>
                  </div>

                  {/* Title always visible on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Description - shown when active */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-white/90 text-[17px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="h-1.5 bg-white w-full mt-1 rounded-b-3xl" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;