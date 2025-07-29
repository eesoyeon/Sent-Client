import AlarmSettingModal from '@/features/settings/components/Sent/AlarmSettingModal';
import ProfileSettingModal from '@/features/settings/components/Sent/ProfileSettingModal';
import CategorySettingModal from '@/features/settings/components/Todos/CategorySettingModal';
import ViewSettingModal from '@/features/settings/components/Todos/ViewSettingModal';
import React from 'react';

interface SettingModalProps {
  type: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const SettingModal = ({ type, isOpen, onClose }: SettingModalProps) => {
  if (!isOpen) return null;

  switch (type) {
    case 'category':
      return <CategorySettingModal isOpen={isOpen} onClose={onClose} />;
    case 'view':
      return <ViewSettingModal isOpen={isOpen} onClose={onClose} />;
    case 'profile':
      return <ProfileSettingModal isOpen={isOpen} onClose={onClose} />;
    case 'alarm':
      return <AlarmSettingModal isOpen={isOpen} onClose={onClose} />;
    default:
      return null;
  }
};

export default SettingModal;
