import { motion } from "framer-motion";
import { 
  Brain, Bot, Eye, Zap, Network, 
  Cpu, MessageSquare, Database, 
  Settings, Sparkles, TrendingUp 
} from "lucide-react";

type MarqueeRowProps = {
  items: Array<{
    label: string;
    icon: React.ReactNode;
    subtext?: string;        // ← New: optional subtext below label
  }>;
  reverse?: boolean;
};

const pastelTextColors = [
  "text-pink-300", "text-purple-300", "text-blue-300", "text-cyan-300",
  "text-teal-300", "text-green-300", "text-yellow-300", "text-orange-300",
  "text-rose-300", "text-indigo-300",
];

const row1 = [
  { 
    label: "AI Agents", 
    icon: <Bot className="w-5 h-5" />,
    subtext: "Autonomous systems"
  },
  { 
    label: "Machine Learning", 
    icon: <Brain className="w-5 h-5" />,
    subtext: "Pattern recognition"
  },
  { 
    label: "LLMs", 
    icon: <MessageSquare className="w-5 h-5" />,
    subtext: "Large language models"
  },
  { 
    label: "Automation", 
    icon: <Zap className="w-5 h-5" />,
    subtext: "Workflow efficiency"
  },
  { 
    label: "Neural Networks", 
    icon: <Network className="w-5 h-5" />,
    subtext: "Brain-inspired architecture"
  },
  { 
    label: "Deep Learning", 
    icon: <Cpu className="w-5 h-5" />,
    subtext: "Multi-layer models"
  },
  { 
    label: "NLP", 
    icon: <MessageSquare className="w-5 h-5" />,
    subtext: "Natural language processing"
  },
];

const row2 = [
  { 
    label: "Vision AI", 
    icon: <Eye className="w-5 h-5" />,
    subtext: "Computer vision"
  },
  { 
    label: "Chatbots", 
    icon: <Bot className="w-5 h-5" />,
    subtext: "Conversational AI"
  },
  { 
    label: "Data Science", 
    icon: <Database className="w-5 h-5" />,
    subtext: "Analytics & insights"
  },
  { 
    label: "Robotics", 
    icon: <Settings className="w-5 h-5" />,
    subtext: "Physical intelligence"
  },
  { 
    label: "AI Tools", 
    icon: <Sparkles className="w-5 h-5" />,
    subtext: "Productivity suite"
  },
  { 
    label: "Generative AI", 
    icon: <Sparkles className="w-5 h-5" />,
    subtext: "Content creation"
  },
  { 
    label: "MLOps", 
    icon: <TrendingUp className="w-5 h-5" />,
    subtext: "Model lifecycle"
  },
];

function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  return (
    <div className="overflow-hidden w-full py-4">
      <motion.div
        className="flex gap-5 w-max"
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...items, ...items].map((item, i) => {
          const colorIndex = i % pastelTextColors.length;
          return (
            <div
              key={i}
              className={`flex items-start gap-4 px-7 py-4 rounded-2xl
                         bg-white/5 ${pastelTextColors[colorIndex]}
                         border border-white/10
                         backdrop-blur-md
                         whitespace-nowrap
                         text-base font-medium
                         hover:bg-white/10 hover:scale-105
                         transition-all duration-300 min-w-[220px]`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5 text-white/90">
                {item.icon}
              </div>

              {/* Column of Text */}
              <div className="flex flex-col">
                <span className="leading-tight">{item.label}</span>
                {item.subtext && (
                  <span className="text-sm text-white/60 mt-1 font-normal">
                    {item.subtext}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function AiTagSliderSection() {
  return (
    <section className="w-full text-white py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Heading */}
        <div className="flex flex-col items-end justify-between gap-8 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              AI Capability Tags
            </p>

            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              Explore AI{" "}
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block font-serif italic font-normal"
                  initial={{ y: "110%", rotateX: -40 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Capabilities
                </motion.span>
              </span>
              .
            </h2>
          </motion.div>
        </div>

        {/* Rows */}
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
    </section>
  );
}