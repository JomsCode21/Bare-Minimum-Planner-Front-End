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
      className={`mb-4 w-full max-w-xs cursor-pointer rounded-full bg-gray-300 px-6 py-3 text-sm font-bold shadow-sm transition-colors sm:max-w-sm sm:text-base ${disabled ? "cursor-not-allowed opacity-60" : "hover:bg-gray-200"}`}
    >
      {content}
    </button>
  );
};

export default UniversalButton;
