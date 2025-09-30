import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Box, Camera, Brain, Shield, Wifi } from "lucide-react";

const stages = [
  {
    id: "prototype",
    title: "Prototype",
    description: "Initial suction mechanism testing and wheel configuration",
    icon: Box,
    details: "First working model with basic vacuum pump and motor control"
  },
  {
    id: "esp32cam",
    title: "ESP32-CAM",
    description: "Integrated live video streaming for remote monitoring",
    icon: Camera,
    details: "Added real-time camera feed with WiFi streaming capability"
  },
  {
    id: "tinyml",
    title: "TinyML Integration",
    description: "Onboard AI model for crack and defect detection",
    icon: Brain,
    details: "Edge inference enables instant alerts without cloud dependency"
  },
  {
    id: "safety",
    title: "Safety Systems",
    description: "Edge detection, emergency stop, and tether monitoring",
    icon: Shield,
    details: "Multi-layered protection ensures zero-accident operation"
  },
  {
    id: "dashboard",
    title: "Dashboard & OTA",
    description: "Full control interface with over-the-air updates",
    icon: Wifi,
    details: "Remote operation, telemetry visualization, and wireless firmware updates"
  }
];

export const Evolution = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Evolution of <span className="gradient-text">S4V-WallBot</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From concept to fully autonomous inspection platform
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid md:grid-cols-5 gap-8 relative">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute top-[88px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-[0_0_20px_hsl(var(--primary)/0.6)]" />

                <Card className="glass-card p-6 space-y-4 h-full glow-on-hover">
                  <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto">
                    <stage.icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-xs font-mono text-primary">Stage {index + 1}</div>
                    <h3 className="font-semibold text-lg">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3 border border-dashed border-border">
                    <p className="text-xs text-muted-foreground text-center italic">
                      3D model thumbnail
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.details}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate("/explore")}
                  >
                    View 3D Model
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
