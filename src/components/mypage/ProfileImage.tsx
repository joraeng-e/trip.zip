import { BaseProfile, Pencil } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import React from 'react';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

export default function ProfileImage() {
  return (
    <div className="relative">
      <BaseProfile className="h-160 w-160" />
      <motion.div
        className="flex-center absolute bottom-0 right-10 h-44 w-44 cursor-pointer rounded-full bg-custom-green-200"
        whileHover={whileHover}
      >
        <Pencil />
      </motion.div>
    </div>
  );
}
