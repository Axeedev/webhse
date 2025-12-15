import Button from './Button';

export default function PrimaryButton(props: any) {
    return (
        <Button
            {...props}
            className={`bg-blue-600 text-white hover:bg-blue-700 ${props.className ?? ''}`}
        />
    );
}
