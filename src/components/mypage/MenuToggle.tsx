import { SVGMotionProps, motion } from 'framer-motion';
import React from 'react';


type PathProps = SVGMotionProps<SVGPathElement>;

const Path: React.FC<PathProps> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#000"
    strokeLinecap="round"
    {...props}
  />
);

type MenuToggleProps = {
  toggle: () => void;
};

export const MenuToggle = ({ toggle }: MenuToggleProps) => (
  <button
    onClick={toggle}
    className="absolute left-11 top-82 flex h-60 w-60 cursor-pointer items-center justify-center rounded-full"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);