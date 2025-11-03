export default function Button({ text, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-[#08782b] hover:bg-[#08782b] text-white rounded-md transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
}