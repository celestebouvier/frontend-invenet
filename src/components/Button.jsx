export default function Button({ text, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-[#08782b] hover:bg-[#08782b] text-white rounded-md transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
}