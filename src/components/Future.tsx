import { Sparkles, Bot, Radio, Brain, Shield, Zap } from "lucide-react";

const Future = () => {
  const futureFeatures = [
    {
      icon: Brain,
      title: "Advanced TinyML Models",
      description: "Integration of lightweight AI models for multi-class defect detection, material classification, and predictive maintenance algorithms"
    },
    {
      icon: Bot,
      title: "ROS Integration",
      description: "Full Robot Operating System (ROS) integration for complete autonomous navigation, path planning, and multi-robot coordination"
    },
    {
      icon: Radio,
      title: "5G & Edge Computing",
      description: "Ultra-low latency control and real-time HD video streaming with edge AI inference for instant decision-making"
    },
    {
      icon: Shield,
      title: "Advanced Safety Systems",
      description: "AI-powered obstacle avoidance, redundant fail-safes, and automated emergency response protocols"
    },
    {
      icon: Zap,
      title: "Energy Optimization",
      description: "Solar panel integration, intelligent power management, and wireless charging docks for extended operation"
    },
    {
      icon: Sparkles,
      title: "Digital Twin Technology",
      description: "Real-time 3D reconstruction of inspected structures with AR/VR visualization for immersive analysis"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            What's the <span className="gradient-text">Future?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our vision for the next generation of autonomous inspection technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {futureFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-xl hover-scale group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These innovations will transform S4V-WallBot from an inspection tool into a comprehensive 
            autonomous platform for infrastructure health monitoring and maintenance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Future;
