import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./components/home";
import Login from "./pages/Login";
import DashboardPage from "./pages/doctor/dashboard";
import AppointmentManagement from "./pages/doctor/AppointmentManagement";
import SlotManagement from "./pages/doctor/SlotManagement";
import BlogManagement from "./pages/doctor/BlogManagement";
import BlogDetails from "./pages/doctor/BlogDetails";
import TestimonialManagement from "./pages/doctor/TestimonialManagement";
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
          <AppointmentManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/slots",
      element: (
        <ProtectedRoute>
          <SlotManagement />
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
      path: "/doctor/blog/:id",
      element: (
        <ProtectedRoute>
          <BlogDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/doctor/testimonials",
      element: (
        <ProtectedRoute>
          <TestimonialManagement />
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
