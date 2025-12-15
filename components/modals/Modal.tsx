// /components/modals/Modal.tsx
import { ReactNode } from 'react';
import DangerButton from '../buttons/DangerButton';
import PrimaryButton from '../buttons/PrimaryButton';

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    onConfirm: () => void;
};

export default function Modal({ isOpen, title, children, onClose, onConfirm }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end gap-2">
                    <PrimaryButton onClick={onClose}>Отмена</PrimaryButton>
                    <DangerButton onClick={onConfirm}>Подтвердить</DangerButton>
                </div>
            </div>
        </div>
    );
}
