import Card from "../components/Card";

export default function RecoverPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-gray-600">
          Pantalla mock. Luego conectamos con:
        </p>
        <ul className="list-disc ml-6 text-sm mt-2 space-y-1">
          <li>POST /password/send-code</li>
          <li>POST /password/verify-code</li>
          <li>POST /password/reset</li>
        </ul>
      </Card>
    </div>
  );
}
