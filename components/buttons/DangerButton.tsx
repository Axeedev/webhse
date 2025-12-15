// /components/buttons/DangerButton.tsx
import Button from './Button';

export default function DangerButton(props: any) {
    return <Button {...props} className="bg-danger text-white hover:bg-red-600" />;
}
