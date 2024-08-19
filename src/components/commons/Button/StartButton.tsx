import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

const StartButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  const cloudVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  const airplaneVariants = {
    initial: { y: '100vh', rotate: 0 },
    animate: {
      y: '-100vh',
      transition: {
        duration: 3.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const clouds = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 100,
    delay: Math.random() * 0.5,
  }));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      window.location.href = '/activities';
    }, 1300);
  };

  return (
    <motion.div className="relative" whileHover="hover">
      <Link href="/activities" passHref>
        <motion.button
          className="relative z-10 ml-15 max-w-200 overflow-hidden rounded-2xl border-2 border-white border-opacity-60 bg-gray-200 bg-opacity-60 p-10 px-40 text-lg-bold"
          variants={buttonVariants}
          onClick={handleClick}
        >
          START
        </motion.button>
      </Link>
      <AnimatePresence>
        {isClicked && (
          <>
            {clouds.map((cloud) => (
              <motion.svg
                key={cloud.id}
                className="absolute"
                width={cloud.size}
                height={cloud.size}
                viewBox="0 0 24 24"
                style={{
                  left: `calc(50% + ${cloud.x}px)`,
                  top: `calc(50% + ${cloud.y}px)`,
                }}
                variants={cloudVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  delay: cloud.delay,
                }}
              >
                <path
                  fill="#ffffff"
                  d="M25,10c0,2.8-2.2,5-5,5h-14c-2.8,0-5-2.2-5-5s2.2-5,5-5c0.6,0,1.2,0.1,1.7,0.3C8.4,3,10.5,1.5,13,1.5
                  c3,0,5.5,2.2,5.9,5.1C22.8,7,25,8.3,25,10z"
                />
              </motion.svg>
            ))}
            <motion.svg
              className="absolute"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              style={{
                left: '50%',
                bottom: 0,
                x: '-50%',
              }}
              variants={airplaneVariants}
              initial="initial"
              animate="animate"
            >
              <path
                fill="#ffffff"
                d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5
                L13,19v-5.5L21,16z"
              />
            </motion.svg>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StartButton;
