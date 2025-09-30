import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Zap, Factory, Plane, Sun, AlertTriangle } from "lucide-react";

const applications = [
  {
    id: "civil",
    icon: Building2,
    title: "Civil Infrastructure",
    useCase: "Inspect bridges, tunnels, dams, and high-rise buildings for structural integrity without scaffolding or rope access.",
    example: "Bridge girder inspection: Detected 12 hairline cracks and 3 corroded joints in a 500m span, reducing inspection time from 2 weeks to 6 hours."
  },
  {
    id: "utilities",
    icon: Zap,
    title: "Utilities & Energy",
    useCase: "Monitor power transmission towers, wind turbines, and nuclear cooling towers for maintenance and safety compliance.",
    example: "Wind turbine blade inspection: Identified surface erosion and lightning strike damage at 80m height, preventing catastrophic failure and $2M in losses."
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Assets",
    useCase: "Examine storage tanks, silos, chimneys, and pressure vessels in petrochemical and manufacturing facilities.",
    example: "Chemical storage tank: Detected pinhole leaks and corrosion patterns early, enabling preventive maintenance before hazardous material release."
  },
  {
    id: "aircraft",
    icon: Plane,
    title: "Aircraft & Vehicles",
    useCase: "Inspect aircraft fuselages, ship hulls, and railway infrastructure for fatigue cracks and paint deterioration.",
    example: "Aircraft fuselage check: Completed full exterior inspection in 45 minutes vs. 8 hours manual, with 99.5% defect detection accuracy."
  },
  {
    id: "solar",
    icon: Sun,
    title: "Solar Arrays",
    useCase: "Scan solar panel installations for cracks, hot spots, and efficiency degradation using thermal and visual analysis.",
    example: "Solar farm audit: Identified 47 underperforming panels across 5,000-panel array using IR thermography, recovering 8% energy loss."
  },
  {
    id: "disaster",
    icon: AlertTriangle,
    title: "Disaster Response",
    useCase: "Assess structural damage in earthquake, flood, or fire-affected buildings before human entry, ensuring responder safety.",
    example: "Post-earthquake survey: Mapped structural integrity of 30 damaged buildings in 2 days, prioritizing rescue operations and demolition orders."
  }
];

export const Applications = () => {
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Can We <span className="gradient-text">Use It For?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Versatile applications across industries and use cases
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <Card
              key={app.id}
              className="glass-card p-6 space-y-4 glow-on-hover cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => setSelectedApp(app)}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <app.icon className="w-7 h-7 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{app.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {app.useCase}
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full group">
                View Example
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Example modal */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedApp && (
                <>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <selectedApp.icon className="w-5 h-5 text-primary" />
                  </div>
                  {selectedApp.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              <span className="font-semibold text-foreground block mb-2">Real-world application:</span>
              {selectedApp?.example}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};
