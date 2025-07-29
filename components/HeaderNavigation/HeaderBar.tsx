import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderBarProps {
  title: string;
  onMenuClick: () => void;
}

const HeaderBar = ({ title, onMenuClick }: HeaderBarProps) => (
  <header className="bg-black/95 backdrop-blur-md border-b-none border-gray-800">
    <div className="flex items-center justify-between py-4">
      <div className="w-10" />
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="text-gray-100 hover:text-white rounded-full"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  </header>
);

export default HeaderBar;
