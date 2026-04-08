import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  FileText,
  Scan,
  Maximize2,
  BarChart3,
  Layers
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
import { useWebcam } from "@/hooks/useWebcam";
import { YOLOv8, Detection } from "@/lib/yolo-utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { startStream, stopStream, videoRef, stream } = useWebcam();
  const [streamActive, setStreamActive] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [lockEngaged, setLockEngaged] = useState(false);
  const [recentCommands, setRecentCommands] = useState<
    Array<{ cmd: string; status: "success" | "fail"; timestamp: string }>
  >([]);
  const [runtime, setRuntime] = useState(0);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yoloRef = useRef<YOLOv8>(new YOLOv8());
  
  // Mock sensor data
  const [sensorData] = useState({
    dht11: { temp: 28.4, humidity: 56 },
    mq2: 120,
    mq135: 180
  });

  // Load YOLO model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        if (yoloRef.current) {
          await yoloRef.current.load();
        }
      } finally {
        setIsInitializing(false);
      }
    };
    loadModel();
  }, []);

  // Runtime tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setRuntime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Inference loop
  useEffect(() => {
    let animationId: number;
    let isMounted = true;
    
    const runInference = async () => {
      if (!isMounted) return;
      
      if (streamActive && videoRef.current && canvasRef.current && yoloRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        if (ctx && video.readyState === 4) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          try {
            const results = await yoloRef.current.runInference(canvas);
            
            // DRAWING LOGIC (Constant 60fps)
            if (isMounted) {
              // Draw bounding boxes directly to the context every frame
              results.forEach(det => {
                const [x1, y1, x2, y2] = det.bbox;
                ctx.strokeStyle = "#00f2ff";
                ctx.lineWidth = 3;
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                
                ctx.fillStyle = "#00f2ff";
                ctx.font = "bold 16px Inter";
                ctx.fillText(`${det.label} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 > 20 ? y1 - 5 : y1 + 20);
              });

              // STATE UPDATE LOGIC (Throttled to prevent flashing)
              // Only update the side-panel analytics every 15 frames
              if (yoloRef.current.getFrameCount() % 15 === 0) {
                setDetections(results);
              }
            }
          } catch (err) {
            console.error("Inference error:", err);
          }
        }
      }
      animationId = requestAnimationFrame(runInference);
    };

    if (streamActive) {
      runInference();
    }
    
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationId);
    };
  }, [streamActive]);

  const formatRuntime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendCommand = (cmd: string) => {
    if (navigator.vibrate) navigator.vibrate(50);
    const timestamp = new Date().toLocaleTimeString();
    const newCommand = {
      cmd,
      status: Math.random() > 0.1 ? "success" : "fail" as "success" | "fail",
      timestamp
    };
    setRecentCommands(prev => [newCommand, ...prev].slice(0, 10));
    toast.success(`Command sent: ${cmd}`);
  };

  const toggleStream = async () => {
    if (streamActive) {
      stopStream();
      setStreamActive(false);
      setDetections([]);
      toast.info("Stream stopped");
    } else {
      const s = await startStream();
      if (s) {
        setStreamActive(true);
        toast.success("Stream started - Roctara Vision Online");
      }
    }
  };

  const handleDownloadReport = () => {
    const reportContent = `
ROCTARA INSPECTION REPORT
Date: ${new Date().toLocaleDateString()}
Session Duration: ${formatRuntime(runtime)}
Total Commands: ${recentCommands.length}
Avg Temperature: ${sensorData.dht11.temp}°C
Avg Humidity: ${sensorData.dht11.humidity}%

Detected Anomalies:
- 12.9716°N, 77.5946°E: Structural Crack (High Severity)
- 12.9718°N, 77.5948°E: Oxidation/Rust (Medium Severity)

Recommendations:
- Immediate structural review of high-severity crack zones.
- Surface treatment for localized oxidation.
    `;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `roctara_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Report downloaded successfully");
  };

  const toggleLock = () => {
    if (!lockEngaged) {
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
          <div className="glass-card p-6 rounded-xl border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success animate-pulse" />
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Hey! <span className="gradient-text">Roctara is up and running</span>
                  </h1>
                </div>
                <p className="text-muted-foreground">Autonomous structural inspection dashboard</p>
              </div>
               <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">{formatRuntime(runtime)}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/")}
                  className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20 text-destructive"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Camera & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera feed */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up border-primary/20 overflow-hidden relative">
              <div className="flex items-center justify-between relative z-10">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Scan className="w-5 h-5 text-primary" />
                  Vision Control System
                </h2>
                <Button
                  variant={streamActive ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleStream}
                  className="shadow-glow"
                >
                  {streamActive ? (
                    <>
                      <VideoOff className="w-4 h-4 mr-2" />
                      Stop Vision
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Start Vision
                    </>
                  )}
                </Button>
              </div>

              <div className="aspect-video bg-black/40 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center relative overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${streamActive ? 'block' : 'hidden'}`}
                />
                <canvas
                  ref={canvasRef}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${streamActive ? 'block' : 'hidden'}`}
                />
                {!streamActive && (
                  <div className="text-center space-y-4 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/40">
                      <Video className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-light">
                      {isInitializing ? "Initializing AI System..." : "Idle • Click \"Start Vision\" to initialize YOLOv8"}
                    </p>
                  </div>
                )}
                
                {/* Overlay UI when active */}
                {streamActive && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/30 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Live Preview
                    </div>
                  </div>
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

            {/* Vision Metrics / Safety status */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up border-primary/20" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {streamActive ? (
                  <BarChart3 className="w-5 h-5 text-primary" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
                {streamActive ? "Inference Analytics" : "Safety Status"}
              </h2>

              {streamActive ? (
                <div className="space-y-4">
                  {detections.length > 0 ? (
                    <>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-xs text-muted-foreground uppercase tracking-tight">Crack Density</span>
                          <span className="text-lg font-bold text-primary">{detections[0].density.toFixed(2)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500" 
                            style={{ width: `${Math.min(100, detections[0].density * 5)}%` }} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Surface Area</p>
                          <p className="text-sm font-semibold">{detections[0].surfaceArea.toFixed(1)} mm²</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Est. Depth</p>
                          <p className="text-sm font-semibold">{detections[0].depth.toFixed(2)} mm</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                        detections[0].riskFactor > 7 ? 'bg-destructive/10 border-destructive/50' :
                        detections[0].riskFactor > 4 ? 'bg-warning/10 border-warning/50' :
                        'bg-success/10 border-success/50'
                      }`}>
                        <div className="space-y-0.5">
                          <p className="text-[10px] uppercase font-bold opacity-60">Risk Factor</p>
                          <p className="text-xl font-black">{(detections[0].riskFactor).toFixed(1)}/10</p>
                        </div>
                        <AlertTriangle className={`w-8 h-8 ${
                          detections[0].riskFactor > 7 ? 'text-destructive' :
                          detections[0].riskFactor > 4 ? 'text-warning' :
                          'text-success'
                        }`} />
                      </div>
                    </>
                  ) : (
                    <div className="py-10 text-center space-y-2 opacity-50">
                      <Layers className="w-8 h-8 mx-auto text-muted-foreground stroke-[1]" />
                      <p className="text-sm">Scanning surface...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <span className="text-sm font-medium">Edge Detection</span>
                    <div className="status-dot status-online" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <span className="text-sm font-medium">Tether Tension</span>
                    <span className="text-xs text-success font-bold">Normal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <span className="text-sm font-medium">Power Rails</span>
                    <span className="text-xs text-success font-bold">87% Stable</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  {streamActive 
                    ? "Inference parameters are calculated in real-time based on YOLOv8 geometric analysis."
                    : "All safety systems operational. Control authority granted."}
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

                      <Button className="w-full" onClick={handleDownloadReport}>
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
