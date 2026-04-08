import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Story } from "@/components/Story";
import { Applications } from "@/components/Applications";
import { Evolution } from "@/components/Evolution";
import Future from "@/components/Future";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why <span className="gradient-text">Roctara?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional inspections expose workers to dangerous heights, long downtimes, and high costs. 
              Roctara eliminates risk through an autonomous, wall-adhering crawler that conducts frequent, 
              consistent inspections with onboard edge diagnostics for immediate defect alerts.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground">Risk Reduction</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">10x</div>
                <p className="text-sm text-muted-foreground">Faster Inspections</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">$50k+</div>
                <p className="text-sm text-muted-foreground">Cost Savings/Year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <Story />
      <Applications />
      <Evolution />
      <Future />

      {/* Demo/Media section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Demo & <span className="gradient-text">Prototype</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { label: "Vertical Ascent Test", path: "/videos/Vertical Ascent Test.mp4" },
              { label: "Autonomous Navigation", path: "/videos/Autonomous Navigation.mp4" },
              { label: "Precision Positioning", path: "/videos/Precision Positioning.mp4" }
            ].map((video, index) => (
              <div
                key={video.label}
                className="glass-card overflow-hidden rounded-xl aspect-video flex flex-col border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  src={video.path}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-3 bg-black/60 backdrop-blur-sm border-t border-primary/20">
                  <p className="text-xs font-semibold text-center uppercase tracking-wider">{video.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deployment Instruction */}
          <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/30 max-w-2xl mx-auto">
            <p className="text-xs text-center text-muted-foreground">
              <span className="font-bold text-primary">Note:</span> Please move your MP4 files into the 
              <code className="mx-1 px-1 bg-background rounded">public/videos/</code> directory 
              and name them exactly as shown above for the demo to load correctly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card max-w-3xl mx-auto p-12 text-center space-y-6 glow-on-hover">
            <h2 className="text-3xl md:text-4xl font-bold">
              Interested in <span className="gradient-text">Collaborating?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get in touch to discuss partnerships, custom deployments, or research opportunities
            </p>
            <a
              href="mailto:team@roctara-vision.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] hover:scale-105 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg gradient-text">Roctara</p>
              <p className="text-sm text-muted-foreground mt-1">
                Surya · Sudesh · Vickkraman
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
