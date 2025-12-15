import { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
};

export default function Button({
                                   children,
                                   className = '',
                                   onClick,
                                   type = 'button',
                               }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-4 rounded font-semibold transition ${className}`}
        >
            {children}
        </button>
    );
}
