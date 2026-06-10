"use client";

import { useState } from "react";

type Item = {
  n: string;
  title: string;
  desc: string;
  image: string;
};

interface Props {
  items: Item[];
}

const ExpandOnHover = ({ items }: Props) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full flex items-center">
  <div className="w-full max-w-7xl mx-auto flex h-[500px] gap-2 px-4">
    {items.map((item, idx) => {
      const isActive = active === idx;

      return (
        <div
          key={item.n}
          onMouseEnter={() => setActive(idx)}
          className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-out ${
            isActive ? "flex-[5]" : "flex-1"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute left-6 top-6">
            <span className="text-white/70 text-sm">{item.n}</span>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-5xl font-semibold mb-2">{item.title}</h3>
            <p className="text-lg text-white/80 max-w-sm">{item.desc}</p>
          </div>

     {!isActive && (
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-white text-sm rotate-90 whitespace-nowrap">
      {item.title}
    </p>
  </div>
)}
        </div>
      );
    })}
  </div>
</div>
  );
};

export default ExpandOnHover;