"use client";

import { MotionConfig } from "framer-motion";

/** Client-side providers. `reducedMotion="user"` honours the OS "reduce motion" setting. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
