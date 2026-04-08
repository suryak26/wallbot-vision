import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Magnet, Video, Radio, Brain, Shield, Map } from "lucide-react";

const features = [
  {
    id: "adhesion",
    icon: Magnet,
    title: "Wall Adhesion",
    description: "Hybrid suction + wheel mechanism for varied surfaces",
    details: "Advanced pneumatic suction cups combined with motorized wheels provide reliable adhesion on concrete, glass, metal, and composite surfaces. Automatic surface detection adjusts grip strength dynamically.",
    demoPlaceholder: "/prototype.png"
  },
  {
    id: "video",
    icon: Video,
    title: "Live Video",
    description: "ESP32-CAM stream to dashboard for remote operators",
    details: "Real-time HD video streaming with low latency (<200ms) enables remote inspection and recording. Adjustable resolution and frame rate optimize bandwidth usage.",
    demoPlaceholder: "/vision_module.png"
  },
  {
    id: "transmission",
    icon: Radio,
    title: "RF Control Loop",
    description: "Transmitter-Receiver setup for custom configuration",
    details: "Robust RF communication with dedicated transmitter and receiver modules. Enables easy customization of control mapping and long-range operation even in signal-dense industrial environments.",
    demoPlaceholder: "/vision_module.png"
  },
  {
    id: "edge",
    icon: Brain,
    title: "Edge Diagnostics",
    description: "Adaptive surface mapping for defect identification",
    details: "Integrated diagnostic suite that uses low-latency edge processing to classify structural anomalies. Provides immediate visual overlays without the need for high-power compute environments.",
    demoPlaceholder: "/production.png"
  },
  {
    id: "safety",
    icon: Shield,
    title: "Safety First",
    description: "Edge detection, tether, and stop logic",
    details: "Multi-layered safety: IR edge sensors, emergency stop button, automatic tether tension monitoring, and fall protection algorithms ensure zero accidents.",
    demoPlaceholder: "/production.png"
  },
  {
    id: "mapping",
    icon: Map,
    title: "Defect Maps",
    description: "Generate and store inspection overlays for comparisons",
    details: "Automated spatial mapping creates detailed defect overlays with GPS coordinates, timestamps, and severity ratings. Historical comparisons track deterioration over time.",
    demoPlaceholder: "/production.png"
  }
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Does <span className="gradient-text">It Do?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced capabilities designed for autonomous structural inspection
          </p>
        </div>

        <Accordion type="single" collapsible className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AccordionItem 
              key={feature.id} 
              value={feature.id}
              className="border-none"
            >
              <Card 
                className="glass-card h-full glow-on-hover animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="p-6 hover:no-underline [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.details}
                  </p>
                  <div className="bg-muted/50 rounded-lg overflow-hidden border border-border aspect-video flex items-center justify-center">
                    <img src={feature.demoPlaceholder} alt={feature.title} className="w-full h-full object-cover" />
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
