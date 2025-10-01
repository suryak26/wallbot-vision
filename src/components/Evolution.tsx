import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Camera, Brain, Shield, Wifi, ChevronDown, Image, Video } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const stages = [
  {
    id: "prototype",
    title: "Prototype",
    description: "Initial suction mechanism testing and wheel configuration",
    icon: Box,
    details: "First working model with basic vacuum pump and motor control",
    mediaTypes: [
      { type: "photo", label: "Prototype Photo" },
      { type: "video", label: "Prototype Video" }
    ]
  },
  {
    id: "esp32cam",
    title: "ESP32-CAM",
    description: "Integrated live video streaming for remote monitoring",
    icon: Camera,
    details: "Added real-time camera feed with WiFi streaming capability",
    mediaTypes: [
      { type: "video", label: "ESP32-CAM Video Demo" }
    ]
  },
  {
    id: "tinyml",
    title: "TinyML Integration",
    description: "Onboard AI model for crack and defect detection",
    icon: Brain,
    details: "Edge inference enables instant alerts without cloud dependency",
    mediaTypes: [
      { type: "image", label: "TinyML Architecture" }
    ]
  },
  {
    id: "safety",
    title: "Safety Systems",
    description: "Edge detection, emergency stop, and tether monitoring",
    icon: Shield,
    details: "Multi-layered protection ensures zero-accident operation",
    mediaTypes: [
      { type: "image", label: "Safety Systems Diagram" }
    ]
  },
  {
    id: "dashboard",
    title: "Dashboard & OTA",
    description: "Full control interface with over-the-air updates",
    icon: Wifi,
    details: "Remote operation, telemetry visualization, and wireless firmware updates",
    mediaTypes: [
      { type: "image", label: "Dashboard Interface" }
    ]
  }
];

export const Evolution = () => {
  const [isOpen, setIsOpen] = useState(false);

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

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.details}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Demonstration Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full md:w-auto mx-auto flex items-center gap-2 group transition-all duration-300 hover:scale-105"
              >
                Demonstration
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-8 space-y-8 animate-fade-in">
              {stages.map((stage, index) => (
                <div 
                  key={stage.id}
                  className="glass-card p-6 rounded-xl space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <stage.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{stage.title}</h3>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {stage.mediaTypes.map((media, mediaIndex) => (
                      <div 
                        key={mediaIndex}
                        className="group relative aspect-video rounded-lg border-2 border-dashed border-border/50 bg-muted/20 hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6"
                      >
                        {media.type === 'video' ? (
                          <Video className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <Image className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <div className="text-center space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">{media.label}</p>
                          <p className="text-xs text-muted-foreground/70">
                            Upload {media.type} here
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};
