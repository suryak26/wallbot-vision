import { useState, useEffect } from "react";
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
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Flame,
  Clock,
  CheckCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [streamActive, setStreamActive] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [lockEngaged, setLockEngaged] = useState(false);
  const [recentCommands, setRecentCommands] = useState<
    Array<{ cmd: string; status: "success" | "fail"; timestamp: string }>
  >([]);
  const [runtime, setRuntime] = useState(0);
  
  // Mock sensor data (replace with real data from ThingSpeak/Blynk)
  const [sensorData] = useState({
    dht11: { temp: 28.4, humidity: 56 },
    mq2: 120,
    mq135: 180
  });

  // Runtime tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setRuntime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatRuntime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        {/* Header with Welcome Message */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success animate-pulse" />
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Hey! <span className="gradient-text">Your bot is up and running</span>
                  </h1>
                </div>
                <p className="text-muted-foreground">Remote robot operation and monitoring</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{formatRuntime(runtime)}</span>
              </div>
            </div>
          </div>
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

          {/* Right column - Status, Sensors & Commands */}
          <div className="space-y-6">
            {/* Sensor Readings */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Sensor Readings
              </h2>

              <div className="space-y-3">
                {/* DHT11 - Temperature & Humidity */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">DHT11 Sensor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="text-2xl font-bold text-primary">{sensorData.dht11.temp}°C</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="w-3 h-3" />
                        Humidity
                      </p>
                      <p className="text-2xl font-bold text-cyan-400">{sensorData.dht11.humidity}%</p>
                    </div>
                  </div>
                </div>

                {/* MQ-2 Gas Sensor */}
                <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold">MQ-2 (Flammable Gas)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      sensorData.mq2 < 200 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {sensorData.mq2 < 200 ? 'Safe' : 'Alert'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">{sensorData.mq2} <span className="text-sm text-muted-foreground">PPM</span></p>
                </div>

                {/* MQ-135 Air Quality */}
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold">MQ-135 (Air Quality)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      sensorData.mq135 < 250 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {sensorData.mq135 < 250 ? 'Good' : 'Moderate'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-purple-500">{sensorData.mq135} <span className="text-sm text-muted-foreground">PPM</span></p>
                </div>
              </div>
            </Card>

            {/* Safety status */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
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
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Command History</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Inspection Report</DialogTitle>
                      <DialogDescription>
                        Summary of detected defects and robot telemetry
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h3 className="font-semibold mb-2">Session Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-muted-foreground">Runtime:</span> {formatRuntime(runtime)}</div>
                          <div><span className="text-muted-foreground">Commands Sent:</span> {recentCommands.length}</div>
                          <div><span className="text-muted-foreground">Temperature:</span> {sensorData.dht11.temp}°C</div>
                          <div><span className="text-muted-foreground">Humidity:</span> {sensorData.dht11.humidity}%</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          Detected Defects (3)
                        </h3>
                        <div className="space-y-3">
                          {[
                            { type: "Crack", severity: "High", lat: "12.9716°N", lon: "77.5946°E", alt: "45.2m" },
                            { type: "Rust Patch", severity: "Medium", lat: "12.9718°N", lon: "77.5948°E", alt: "43.8m" },
                            { type: "Surface Leak", severity: "Low", lat: "12.9720°N", lon: "77.5950°E", alt: "42.5m" }
                          ].map((defect, idx) => (
                            <div key={idx} className="p-3 rounded bg-background border border-border space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">{defect.type}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  defect.severity === "High" ? "bg-destructive/20 text-destructive" :
                                  defect.severity === "Medium" ? "bg-warning/20 text-warning" :
                                  "bg-muted text-muted-foreground"
                                }`}>
                                  {defect.severity}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">
                                📍 {defect.lat}, {defect.lon} • Alt: {defect.alt}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                        <h3 className="font-semibold mb-2">Recommendations</h3>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Schedule immediate repair for high-severity crack</li>
                          <li>Monitor rust patch progression in next inspection</li>
                          <li>Verify surface leak source and drainage system</li>
                        </ul>
                      </div>

                      <Button className="w-full" onClick={() => toast.success("Report downloaded")}>
                        Download Full Report (PDF)
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
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
