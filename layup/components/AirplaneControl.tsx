import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AirplaneControl = () => {
    const [yaw, setYaw] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [position, setPosition] = useState({ x: 250, y: 250 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            updatePosition();
        }, 100);

        return () => clearInterval(interval);
    }, [yaw, speed]);

    const drawDot = (pos: { x: number; y: number }) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "#2563eb";
                ctx.fill();
            }
        }
    };

    useEffect(() => {
        // Draw initial dot
        drawDot(position);
    }, []); // Run once on mount

    const updatePosition = () => {
        const radians = ((yaw - 90) * Math.PI) / 180;
        const dx = Math.cos(radians) * (speed / 10);
        const dy = Math.sin(radians) * (speed / 10);

        setPosition((prevPosition) => {
            const newX = prevPosition.x + dx;
            const newY = prevPosition.y + dy;

            // Reset to center and clear trails if hitting any edge
            if (newX < 0 || newX > 500 || newY < 0 || newY > 500) {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                }
                drawDot({ x: 250, y: 250 });
                return { x: 250, y: 250 };
            }

            drawTrajectory(prevPosition, { x: newX, y: newY });
            return { x: newX, y: newY };
        });
    };

    const handleYawChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYaw(Number(event.target.value));
        drawTrajectory(position, position);
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value));
        drawTrajectory(position, position);
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setPosition({ x: 250, y: 250 });
                drawDot({ x: 250, y: 250 }); // Draw dot in center after reset
            }
        }
    };

    const drawTrajectory = (start: { x: number; y: number }, end: { x: number; y: number }) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = "#2563eb";
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw dot at current position
                drawDot(end);
            }
        }
    };

    return (
        <div className="relative flex flex-col gap-6 p-4 sm:p-6 min-h-screen">
            <h1 className="relative text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-blue-500 animate-fade-up">
                Flight Simulator
            </h1>

            <div className="relative flex flex-col lg:flex-row gap-4 sm:gap-6 w-full max-w-[1200px] items-start animate-fade-in-delayed opacity-0">
                <Card className="w-full lg:w-80 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Heading
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={yaw}
                                    onChange={handleYawChange}
                                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center mt-1 text-gray-600">{yaw}°</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Speed
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={speed}
                                    onChange={handleSpeedChange}
                                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center mt-1 text-gray-600">{speed} knots</div>
                            </div>

                            <Button
                                onClick={resetCanvas}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4 w-full">
                    <canvas
                        ref={canvasRef}
                        width={500}
                        height={500}
                        className="w-full max-w-[500px] h-auto border rounded-lg shadow-lg bg-white"
                    ></canvas>


                </div>
            </div>
        </div>
    );
};

export default AirplaneControl; 