import type { UniversalButtonProps } from "@/types/ui";

const UniversalButton: React.FC<UniversalButtonProps> = ({
  content,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-gray-300 px-10 py-2 rounded-full font-bold text-sm shadow-sm mb-4 cursor-pointer ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      {content}
    </button>
  );
};

export default UniversalButton;
