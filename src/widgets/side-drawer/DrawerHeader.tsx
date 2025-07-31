import { Button } from '@/shared/ui/radix-ui/button';
import { X } from 'lucide-react';

const DrawerHeader = ({ onClose }: { onClose: () => void }) => (
  <header className="flex items-center justify-between mb-4">
    <h2 className="text-gray-500 font-semibold text-sm">Sent</h2>
    <Button
      variant="ghost"
      size="sm"
      onClick={onClose}
      className="text-gray-300 hover:text-white rounded-full p-2"
    >
      <X className="h-5 w-5" />
    </Button>
  </header>
);

export default DrawerHeader;
