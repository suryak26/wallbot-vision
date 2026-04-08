import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Download } from "lucide-react";
import { useState } from "react";

const models = [
  {
    id: "prototype",
    name: "Prototype Model",
    stage: "Stage 1",
    description: "Initial concept with basic suction mechanism",
    notes: "First functional prototype demonstrating wall adhesion principles",
    image: "/prototype.png"
  },
  {
    id: "stage2",
    name: "Vision Module Integration",
    stage: "Stage 2",
    description: "Added ESP32-CAM and RF transmission setup",
    notes: "Real-time video feed and robust control loop integration",
    image: "/vision_module.png"
  },
  {
    id: "current",
    name: "Autonomous Platform",
    stage: "Current",
    description: "Full-featured autonomous inspection system",
    notes: "Complete IoT integration with adaptive surface diagnostics",
    image: "/production.png"
  }
];

const Explore = () => {
  const [selectedModel, setSelectedModel] = useState<string>("prototype");
  const currentModel = models.find(m => m.id === selectedModel);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">
            Development <span className="gradient-text">History</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Witness the evolution of Roctara through each key technical milestone
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Image Display */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-4 space-y-6 animate-fade-in-up overflow-hidden">
              <div className="aspect-video relative rounded-xl overflow-hidden border border-primary/20 bg-black/40">
                {currentModel?.image && (
                  <img 
                    src={currentModel.image} 
                    alt={currentModel.name}
                    className="w-full h-full object-cover animate-fade-in"
                    key={currentModel.id}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-mono tracking-tight">
                      {currentModel?.name}
                    </h3>
                    <p className="text-sm font-mono text-primary uppercase tracking-widest">
                      {currentModel?.stage}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {currentModel?.description}
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <p className="text-sm text-foreground">
                    <span className="font-bold uppercase text-xs text-primary block mb-1">Technical Deep-Dive:</span>{" "}
                    {currentModel?.notes}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Milestone list */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 font-mono uppercase tracking-wider text-muted-foreground">Milestones</h2>
            {models.map((model, index) => (
              <Card
                key={model.id}
                className={`p-4 cursor-pointer transition-all animate-fade-in-up border-2 ${
                  selectedModel === model.id
                    ? "glass-card border-primary bg-primary/5 shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                    : "bg-secondary/30 hover:bg-secondary/50 border-transparent"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border ${
                    selectedModel === model.id ? "border-primary" : "border-border"
                  }`}>
                    <img src={model.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{model.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{model.stage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
