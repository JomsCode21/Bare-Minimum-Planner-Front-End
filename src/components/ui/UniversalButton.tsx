interface UniversalButtonProps {
    content: string;
    onClick?: () => void;
    type?: "submit" | "button";
}

const UniversalButton: React.FC<UniversalButtonProps> = ({
    content, onClick, type
}) => {
    return (
        <button type={type} onClick={onClick} className="bg-gray-300 px-10 py-2 rounded-full font-bold text-sm shadow-sm mb-4">{content}</button>
    )
}

export default UniversalButton;