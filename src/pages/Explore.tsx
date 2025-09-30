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
    notes: "First functional prototype demonstrating wall adhesion principles"
  },
  {
    id: "stage2",
    name: "ESP32-CAM Integration",
    stage: "Stage 2",
    description: "Added camera module and WiFi streaming",
    notes: "Real-time video feed enables remote monitoring capability"
  },
  {
    id: "stage3",
    name: "TinyML Version",
    stage: "Stage 3",
    description: "Integrated edge AI for defect detection",
    notes: "Onboard neural network provides instant crack identification"
  },
  {
    id: "stage4",
    name: "Safety Enhanced",
    stage: "Stage 4",
    description: "Added comprehensive safety systems",
    notes: "Edge detection, tether monitoring, and emergency stop features"
  },
  {
    id: "current",
    name: "Current Production",
    stage: "Current",
    description: "Full-featured autonomous inspection platform",
    notes: "Complete IoT integration with OTA updates and dashboard control"
  }
];

const Explore = () => {
  const [selectedModel, setSelectedModel] = useState<string>("prototype");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore <span className="gradient-text">Our Bot</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            View the 3D evolution models of S4V-WallBot through each development stage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-8 space-y-6 animate-fade-in-up">
              <div className="aspect-video bg-muted/30 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
                <Box className="w-16 h-16 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-foreground">3D Model Viewer</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Insert 3D model links here (glTF/GLB format)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Host models on CORS-enabled storage (S3, Netlify, etc.)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {models.find(m => m.id === selectedModel)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {models.find(m => m.id === selectedModel)?.stage}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Model
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {models.find(m => m.id === selectedModel)?.description}
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Technical Note:</span>{" "}
                    {models.find(m => m.id === selectedModel)?.notes}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>Controls:</strong> Click and drag to rotate · Scroll to zoom · Right-click to pan
                </p>
              </div>
            </Card>
          </div>

          {/* Model list */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Evolution Stages</h2>
            {models.map((model, index) => (
              <Card
                key={model.id}
                className={`p-4 cursor-pointer transition-all animate-fade-in-up ${
                  selectedModel === model.id
                    ? "glass-card border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    : "bg-card hover:bg-card/80 border-border"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedModel === model.id ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Box className={`w-5 h-5 ${
                      selectedModel === model.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.stage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="glass-card p-6 space-y-4">
            <h3 className="text-lg font-semibold">Setup Instructions</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Export your 3D models as glTF or GLB format</li>
              <li>Upload to a CORS-enabled storage service (AWS S3, Netlify, etc.)</li>
              <li>Configure CORS headers to allow your domain</li>
              <li>Replace the model URLs in the code with your hosted URLs</li>
              <li>Consider using model-viewer web component or three.js for rendering</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
