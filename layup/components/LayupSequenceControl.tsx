import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LayupSequenceControl = () => {
    const [input, setInput] = useState<number>(10);
    const [result, setResult] = useState<bigint | null>(null);

    const layupSequence = (n: number): bigint => {
        if (n === 1) return 1n;
        if (n === 2) return 2n;

        let s_n_minus_2 = 1n;
        let s_n_minus_1 = 2n;
        let s_n = 0n;

        for (let i = 3; i <= n; i++) {
            if (i % 2 === 0) {
                s_n = s_n_minus_1 + s_n_minus_2;
            } else {
                s_n = 2n * s_n_minus_1 - s_n_minus_2;
            }

            s_n_minus_2 = s_n_minus_1;
            s_n_minus_1 = s_n;
        }

        return s_n;
    };

    const handleCalculate = () => {
        const calculatedResult = layupSequence(input);
        setResult(calculatedResult);
    };

    return (
        <div className="relative flex flex-col gap-6 p-4 sm:p-6 min-h-screen">
            <h1 className="relative text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-blue-500 animate-fade-up">
                Layup Sequence Calculator
            </h1>

            <div className="relative flex flex-col lg:flex-row gap-4 sm:gap-6 w-full max-w-[1200px] items-start animate-fade-in-delayed opacity-0">
                <Card className="w-full lg:w-80 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            {result === null ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter n (1-10000)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            value={input}
                                            onChange={(e) => setInput(Number(e.target.value))}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleCalculate}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        Calculate
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <p className="text-sm font-medium text-gray-700">Result:</p>
                                        <p className="text-lg font-bold text-blue-600 break-all">
                                            S({input}) = {result.toString()}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setResult(null)}
                                        className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                                    >
                                        Calculate Another
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4 w-full">
                    <Card className="w-full shadow-lg">
                        <CardContent className="p-4 sm:p-6">
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code className="text-sm">
                                    {`function layupSequence(n: number): bigint {
    // Handle base cases
    if (n === 1) return 1n;
    if (n === 2) return 2n;

    // Initialize base cases
    let s_n_minus_2 = 1n; // S(1)
    let s_n_minus_1 = 2n; // S(2)
    let s_n = 0n;

    // Compute iteratively from S(3) to S(n)
    for (let i = 3; i <= n; i++) {
        if (i % 2 === 0) {
            // Even case
            s_n = s_n_minus_1 + s_n_minus_2;
        } else {
            // Odd case
            s_n = 2n * s_n_minus_1 - s_n_minus_2;
        }

        // Update for the next iteration
        s_n_minus_2 = s_n_minus_1;
        s_n_minus_1 = s_n;
    }

    return s_n;
}`}
                                </code>
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayupSequenceControl; 