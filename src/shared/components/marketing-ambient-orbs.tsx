"use client";

import { motion } from "framer-motion";

const orbSpecs = [
  {
    color:
      "bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,rgba(37,99,235,0.12)_32%,rgba(37,99,235,0)_72%)] dark:bg-[radial-gradient(circle,rgba(104,168,255,0.28)_0%,rgba(104,168,255,0.14)_30%,rgba(104,168,255,0)_72%)]",
    size: "h-[24rem] w-[24rem] md:h-[34rem] md:w-[34rem]",
    position: "-left-20 top-10 md:left-[2%] md:top-[4%]",
    x: [0, 70, -40, 24, 0],
    y: [0, 40, 90, -20, 0],
    scale: [1, 1.14, 0.94, 1.08, 1]
  },
  {
    color:
      "bg-[radial-gradient(circle,rgba(251,146,60,0.22)_0%,rgba(251,146,60,0.1)_34%,rgba(251,146,60,0)_74%)] dark:bg-[radial-gradient(circle,rgba(255,154,92,0.24)_0%,rgba(255,154,92,0.12)_32%,rgba(255,154,92,0)_74%)]",
    size: "h-[22rem] w-[22rem] md:h-[28rem] md:w-[28rem]",
    position: "right-[-4rem] top-[18rem] md:right-[4%] md:top-[20%]",
    x: [0, -54, 32, -18, 0],
    y: [0, 56, -36, 22, 0],
    scale: [1, 0.92, 1.08, 0.98, 1]
  },
  {
    color:
      "bg-[radial-gradient(circle,rgba(37,99,235,0.16)_0%,rgba(37,99,235,0.08)_32%,rgba(37,99,235,0)_74%)] dark:bg-[radial-gradient(circle,rgba(104,168,255,0.18)_0%,rgba(104,168,255,0.09)_32%,rgba(104,168,255,0)_74%)]",
    size: "h-[18rem] w-[18rem] md:h-[26rem] md:w-[26rem]",
    position: "left-[18%] top-[42rem] md:left-[10%] md:top-[42%]",
    x: [0, 48, -28, 16, 0],
    y: [0, -38, 44, -14, 0],
    scale: [1, 1.06, 0.9, 1.04, 1]
  },
  {
    color:
      "bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,rgba(251,146,60,0.08)_34%,rgba(251,146,60,0)_74%)] dark:bg-[radial-gradient(circle,rgba(255,154,92,0.18)_0%,rgba(255,154,92,0.08)_34%,rgba(255,154,92,0)_74%)]",
    size: "h-[18rem] w-[18rem] md:h-[24rem] md:w-[24rem]",
    position: "right-[8%] top-[68rem] md:right-[8%] md:top-[66%]",
    x: [0, -42, 26, -20, 0],
    y: [0, 34, -48, 18, 0],
    scale: [1, 0.96, 1.1, 0.94, 1]
  },
  {
    color:
      "bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,rgba(37,99,235,0.06)_34%,rgba(37,99,235,0)_76%)] dark:bg-[radial-gradient(circle,rgba(104,168,255,0.16)_0%,rgba(104,168,255,0.08)_34%,rgba(104,168,255,0)_76%)]",
    size: "h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem]",
    position: "left-[35%] bottom-[-2rem] md:left-[34%] md:bottom-[4%]",
    x: [0, 36, -26, 22, 0],
    y: [0, -44, 24, -30, 0],
    scale: [1, 1.08, 0.92, 1.03, 1]
  }
] as const;

export function MarketingAmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbSpecs.map((orb, index) => (
        <motion.div
          key={`${orb.position}-${index}`}
          className={`absolute rounded-full blur-3xl ${orb.color} ${orb.size} ${orb.position}`}
          animate={{
            x: [...orb.x],
            y: [...orb.y],
            scale: [...orb.scale]
          }}
          transition={{
            duration: 20 + index * 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
