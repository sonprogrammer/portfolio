'use client';

import { useEffect, useRef, useState } from "react";

interface AnimatedMetricProps {
    value: number;
    suffix?: string;
    duration?: number;
}

export function AnimationNum({
    value,
    suffix = "",
    duration = 900,
}: AnimatedMetricProps) {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reduceMotion) {
            frameRef.current = requestAnimationFrame(() => {
                setCount(value);
            });

            return () => {
                if (frameRef.current !== null) {
                    cancelAnimationFrame(frameRef.current);
                }
            };
        }
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCount(Math.round(value * easedProgress));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [value, duration]);

    return (
        <>
            {count}
            {suffix}
        </>
    );
}