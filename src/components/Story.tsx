import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export const Story = () => {
  const teamMembers = [
    { name: "Surya", role: "Hardware & Mechanics" },
    { name: "Sakthi", role: "Electronics & IoT" },
    { name: "Sanjana", role: "AI & Machine Learning" },
    { name: "Sudesh", role: "Software & Control Systems" },
    { name: "Vickkraman", role: "Safety & Testing" }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              How It <span className="gradient-text">Started</span>
            </h2>
          </div>

          <Card className="glass-card p-8 md:p-12 space-y-8 animate-fade-in-up">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A student innovation from <span className="text-foreground font-medium">Surya, Sakthi, Sanjana, Sudesh, and Vickkraman</span>; 
                evolved from prototype suction tests to a full AI + IoT inspection platform.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                What began as a simple concept to improve building inspection safety has transformed into 
                a sophisticated autonomous system. Through countless iterations, late-night debugging sessions, 
                and collaborative problem-solving, the team built not just a robot, but a comprehensive 
                inspection solution that combines cutting-edge AI with robust mechanical engineering.
              </p>
            </div>

            {/* Team photo placeholder */}
            <div className="bg-muted/30 rounded-xl p-8 border border-dashed border-border">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Users className="w-6 h-6" />
                <p className="text-sm italic">Team photo placeholder - Add your team image here</p>
              </div>
            </div>

            {/* Team roles */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-secondary/50 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
