import { ReactNode } from 'react';

const SideDrawerContainer = ({ children }: { children: ReactNode }) => (
  <div className="fixed top-3 left-3 right-3 rounded-3xl m-auto bg-white/10 backdrop-blur-lg shadow-2xl z-50 border border-gray-800">
    <div className="pr-4 pl-6 py-3">{children}</div>
  </div>
);

export default SideDrawerContainer;
