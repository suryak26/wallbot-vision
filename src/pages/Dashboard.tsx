import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Square,
  Video,
  VideoOff,
  Lock,
  Unlock,
  AlertTriangle,
  Activity
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [streamActive, setStreamActive] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [lockEngaged, setLockEngaged] = useState(false);
  const [recentCommands, setRecentCommands] = useState<
    Array<{ cmd: string; status: "success" | "fail"; timestamp: string }>
  >([]);

  const sendCommand = (cmd: string) => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const timestamp = new Date().toLocaleTimeString();
    const newCommand = {
      cmd,
      status: Math.random() > 0.1 ? "success" : "fail" as "success" | "fail",
      timestamp
    };

    setRecentCommands(prev => [newCommand, ...prev].slice(0, 10));

    // TODO: Replace with actual API call
    // fetch('/api/robot/command', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ cmd, speed: speed[0] / 100 })
    // });

    toast.success(`Command sent: ${cmd}`);
  };

  const toggleStream = () => {
    setStreamActive(!streamActive);
    toast.info(streamActive ? "Stream stopped" : "Stream started");
  };

  const toggleLock = () => {
    if (!lockEngaged) {
      // Show confirmation for engaging lock
      if (confirm("Engage servo lock? This will secure the door/actuator.")) {
        setLockEngaged(true);
        toast.success("Lock engaged");
      }
    } else {
      setLockEngaged(false);
      toast.success("Lock disengaged");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Control Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Remote robot operation and monitoring</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Camera & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera feed */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Live Camera Feed
                </h2>
                <Button
                  variant={streamActive ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleStream}
                >
                  {streamActive ? (
                    <>
                      <VideoOff className="w-4 h-4 mr-2" />
                      Stop Stream
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Start Stream
                    </>
                  )}
                </Button>
              </div>

              <div className="aspect-video bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                {streamActive ? (
                  <div className="text-center space-y-2">
                    <div className="status-dot status-online mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Stream URL: ws://your-server.example.com/stream
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Click "Start Stream" to begin</p>
                )}
              </div>
            </Card>

            {/* Movement controls */}
            <Card className="glass-card p-6 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Movement Controls</h2>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Speed: {speed[0]}%</span>
                </div>
              </div>

              {/* Directional pad */}
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                <div className="col-start-2">
                  <Button
                    variant="control"
                    size="lg"
                    className="w-full aspect-square"
                    onClick={() => sendCommand("forward")}
                  >
                    <ArrowUp className="w-6 h-6" />
                  </Button>
                </div>
                <Button
                  variant="control"
                  size="lg"
                  className="w-full aspect-square"
                  onClick={() => sendCommand("left")}
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full aspect-square"
                  onClick={() => sendCommand("stop")}
                >
                  <Square className="w-6 h-6" />
                </Button>
                <Button
                  variant="control"
                  size="lg"
                  className="w-full aspect-square"
                  onClick={() => sendCommand("right")}
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
                <div className="col-start-2">
                  <Button
                    variant="control"
                    size="lg"
                    className="w-full aspect-square"
                    onClick={() => sendCommand("backward")}
                  >
                    <ArrowDown className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Speed slider */}
              <div className="space-y-2 pt-4">
                <Label className="text-sm font-medium">Motor Speed</Label>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Servo/Lock control */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant={lockEngaged ? "destructive" : "outline"}
                  className="w-full"
                  onClick={toggleLock}
                >
                  {lockEngaged ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Disengage Lock
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Engage Lock
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right column - Status & Commands */}
          <div className="space-y-6">
            {/* Safety status */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Safety Status
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                  <span className="text-sm">Edge Detection</span>
                  <div className="status-dot status-online" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                  <span className="text-sm">Tether Tension</span>
                  <span className="text-xs text-success">Normal</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                  <span className="text-sm">Battery Level</span>
                  <span className="text-xs text-success">87%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All safety systems operational. Commands are enabled.
                </p>
              </div>
            </Card>

            {/* Recent commands */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl font-semibold">Command History</h2>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {recentCommands.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No commands sent yet
                  </p>
                ) : (
                  recentCommands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-sm ${
                        cmd.status === "success"
                          ? "bg-success/10 border-success/30"
                          : "bg-destructive/10 border-destructive/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold">{cmd.cmd}</span>
                        <span
                          className={`text-xs ${
                            cmd.status === "success" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {cmd.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cmd.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Backend integration note */}
        <Card className="glass-card p-6 mt-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-lg font-semibold mb-3">Backend Integration Notes</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Command endpoint:</strong> POST to
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                /api/robot/command
              </code>
            </p>
            <p>
              <strong className="text-foreground">Stream URL:</strong>
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                ws://your-server.example.com/stream
              </code>
            </p>
            <p className="pt-2 text-xs">
              Replace placeholders with your Flask server endpoints. Commands should be forwarded to ESP32 via MQTT/Socket/Serial.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Simple Label component if not using shadcn
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium ${className}`}>{children}</label>
);

export default Dashboard;
