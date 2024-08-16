import { TabProvider } from '@/context/TabContext';
import { useMediaQuery } from '@/hooks/useMediaQeury';
import { motion, useCycle } from 'framer-motion';
import Head from 'next/head';
import React, { ReactNode } from 'react';

import { MenuToggle } from './MenuToggle';
import ProfileSideBar from './ProfileSideBar';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export function MyPageLayout({ children }: { children: ReactNode }) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <Head>
        <title>마이페이지 - Trip.zip</title>
      </Head>
      <TabProvider>
        <div
          className={`page-container min-screen flex pt-50 md:gap-20 ${isMobile ? 'flex-col items-center' : 'flex-row items-start'}`}
        >
          <div className="sticky top-100 hidden md:block">
            <ProfileSideBar toggleOpen={toggleOpen} />
          </div>
          {isMobile && (
            <div className="flex">
              <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
                <MenuToggle toggle={() => toggleOpen()} />
                <motion.div
                  className="absolute bottom-0 left-0 top-70 -z-10 w-full bg-custom-green-100 dark:bg-nomad-black"
                  variants={sidebar}
                ></motion.div>
                {isOpen && <ProfileSideBar toggleOpen={toggleOpen} />}
              </motion.nav>
            </div>
          )}
          {(isMobile && isOpen) || (
            <motion.div
              className={`w-full md:flex-1`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </TabProvider>
    </>
  );
}

export default MyPageLayout;
