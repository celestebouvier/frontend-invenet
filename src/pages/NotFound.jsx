import Card from "../components/Card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <Card className="max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-2">404</h2>
        <p className="text-gray-600">Página no encontrada.</p>
      </Card>
    </div>
  );
}
