import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SmoothTransitionProps {
  children: ReactNode;
}
const Component = ({ children }: SmoothTransitionProps) => (
  <motion.div
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ ease: "easeOut", duration: 2 }}
  >
    {children}
  </motion.div>
);

export const SmoothTransition = Component;
