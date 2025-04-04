import type { Route } from "./+types/home";
import { useAuth } from "~/contexts/AuthContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const {user,loading} = useAuth()
  

  return ( <ProtectedRoute>

            <h1>
              Welcome : {user && user.username}
            </h1>

        </ProtectedRoute>)
}
