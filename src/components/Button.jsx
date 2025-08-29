export default function Button({ text, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
}