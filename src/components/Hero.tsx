import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-robot.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = (path: string) => {
    // Haptic feedback for supporting devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigate(path);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)]" />
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div 
            className="space-y-8 animate-fade-in"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
              <div className="status-dot status-online" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="gradient-text">S4V-WallBot</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Scaling Heights. Detecting Cracks. Ensuring Safety.
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Autonomous wall-climbing inspector with onboard TinyML and real-time IoT telemetry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="hero"
                size="lg"
                onClick={() => handleButtonClick("/explore")}
                className="group"
              >
                <Bot className="w-5 h-5" />
                Explore Our Bot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleButtonClick("/control/login")}
                className="group"
              >
                <Gamepad2 className="w-5 h-5" />
                Control Our Bot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
                <span>TinyML Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                <span>IoT Connected</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div 
            className="relative animate-fade-in"
            style={{ 
              transform: `translateY(${scrollY * -0.05}px)`,
              animationDelay: "0.2s" 
            }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_80px_hsl(var(--primary)/0.3)]">
              <img
                src={heroImage}
                alt="S4V-WallBot autonomous wall-climbing robot"
                className="w-full h-auto object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Floating info cards */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Detection</p>
                  <p className="text-xs text-muted-foreground">99.2% Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
