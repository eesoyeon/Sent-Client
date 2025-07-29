import DrawerHeader from './DrawerHeader';
import SideDrawerOverlay from './SideDrawerOverlay';
import SideDrawerContainer from './SideDrawerContainer';
import DrawerSection from './DrawerSection';

type ModalType = 'category' | 'view' | 'profile' | 'alarm';

interface SideDrawerMenuProps {
  isOpen: boolean;
  currentPage: 'todos' | 'memos' | 'social';
  onClose: () => void;
  onItemClick: (modal: ModalType) => void;
}

const SideDrawerMenu = ({ isOpen, currentPage, onClose, onItemClick }: SideDrawerMenuProps) => {
  if (!isOpen) return null;

  const defaultNavItems = [
    { id: 'profile', label: 'Profile', onClick: () => onItemClick('profile') },
    { id: 'alarm', label: 'Alarm', onClick: () => onItemClick('alarm') },
  ];

  const pageSettings: Record<
    SideDrawerMenuProps['currentPage'],
    { title: string; items: { id: string; label: string; onClick: () => void }[] }
  > = {
    todos: {
      title: 'Todos',
      items: [
        { id: 'view', label: 'View', onClick: () => onItemClick('view') },
        { id: 'category', label: 'Category', onClick: () => onItemClick('category') },
      ],
    },
    memos: {
      title: 'Memos',
      items: [], // 개발 예정
    },
    social: {
      title: 'Social',
      items: [], // 개발 예정
    },
  };

  const { title, items } = pageSettings[currentPage];

  return (
    <>
      <SideDrawerOverlay onClick={onClose} />
      <SideDrawerContainer>
        <DrawerHeader onClose={onClose} />
        <DrawerSection items={defaultNavItems} />
        {items.length > 0 && <DrawerSection title={title} items={items} />}
      </SideDrawerContainer>
    </>
  );
};

export default SideDrawerMenu;
