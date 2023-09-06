import { motion } from "framer-motion";
import * as React from "react";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

type Props = {
  children: React.ReactNode;
};

export const CustomMenuItem = ({ children }: Props) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {/* <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style} /> */}
    </motion.li>
  );
};
