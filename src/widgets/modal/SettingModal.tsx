import AlarmSettingModal from '@/entities/settings/components/sent/AlarmSettingModal';
import ProfileSettingModal from '@/entities/settings/components/sent/ProfileSettingModal';
import CategorySettingModal from '@/entities/settings/components/todos/CategorySettingModal';
import ViewSettingModal from '@/entities/settings/components/todos/ViewSettingModal';
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
