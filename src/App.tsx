import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./components/home";
import Login from "./pages/Login";
import DashboardPage from "./pages/doctor/dashboard";
import BlogManagement from "./pages/doctor/BlogManagement";
import Settings from "./pages/doctor/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import routes from "tempo-routes";

function App() {
  const tempoRoutes = import.meta.env.VITE_TEMPO === "true" ? routes : [];

  const allRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/doctor/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/appointments",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/slots",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/blog",
      element: (
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/profile",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/settings",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    ...tempoRoutes,
  ];

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(allRoutes)}
      <Toaster />
    </Suspense>
  );
}

export default App;
