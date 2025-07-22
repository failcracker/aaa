import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <p className="mt-2 text-gray-600">Selamat datang di Dashboard!</p>
      <Button className="mt-4" onClick={() => navigate("/")}>Logout</Button>
    </div>
  );
}
