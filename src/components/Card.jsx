export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow-md border border-green-500 max-w-sm w-full ${className}`}

    >
      {children}
    </div>
  );
}