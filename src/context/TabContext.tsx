import { useRouter } from 'next/router';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const initialTab = router.pathname.split('/mypage/')[1] || 'info';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext는 TabProvider내에 써야함');
  }
  return context;
};
