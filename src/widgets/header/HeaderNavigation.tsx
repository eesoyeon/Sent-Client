import { useState } from 'react';
import SettingModal from '@/widgets/modal/SettingModal';
import HeaderBar from '@/widgets/header/HeaderBar';
import SideDrawerMenu from '@/widgets/side-drawer/SideDrawerMenu';

type ModalType = 'category' | 'view' | 'profile' | 'alarm' | null;

interface HeaderNavigationProps {
  title?: string;
  currentPage: 'todos' | 'memos' | 'social';
}

const HeaderNavigation = ({ title = 'SENT', currentPage }: HeaderNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModalType, setOpenModalType] = useState<ModalType>(null);

  return (
    <>
      <HeaderBar title={title} onMenuClick={() => setIsMenuOpen(true)} />
      <SideDrawerMenu
        isOpen={isMenuOpen}
        currentPage={currentPage}
        onClose={() => setIsMenuOpen(false)}
        onItemClick={modal => setOpenModalType(modal)}
      />
      <SettingModal
        type={openModalType}
        isOpen={!!openModalType}
        onClose={() => setOpenModalType(null)}
      />
    </>
  );
};

export default HeaderNavigation;
