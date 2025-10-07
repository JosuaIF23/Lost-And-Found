import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Auth
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const AuthLayout = lazy(() => import("./features/auth/layouts/AuthLayout"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));

// Lost & Found
const LostFoundLayout = lazy(() =>
  import("./features/lostfound/layouts/LostFoundLayout")
);
const BerandaPage = lazy(() =>
  import("./features/lostfound/pages/BerandaPage")
);
const LostFoundHomePage = lazy(() =>
  import("./features/lostfound/pages/HomeLostFoundPage")
);
const LostFoundDetailPage = lazy(() =>
  import("./features/lostfound/pages/DetailLostFoundPage")
);

// Profile
const ProfilePage = lazy(() => import("./features/users/pages/ProfilePage"));

// Stats
const StatsPage = lazy(() => import("./features/lostfound/pages/StatsPage"));

// Users
const UsersPage = lazy(() => import("./features/users/pages/UsersPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="mt-5 text-center">
          <div className="mb-3">
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "126px", height: "126px" }}
            />
          </div>
          <div
            className="spinner-border text-primary"
            style={{ width: "48px", height: "48px" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Auth */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Lost & Found */}
        <Route path="/" element={<LostFoundLayout />}>
          {/* 🏠 Beranda */}
          <Route index element={<BerandaPage />} />

          {/* 📦 Halaman Manajemen Lost & Found */}
          <Route path="lost-founds" element={<LostFoundHomePage />} />
          <Route
            path="lost-founds/:lostFoundId"
            element={<LostFoundDetailPage />}
          />

          {/* 👤 Profile */}
          <Route path="profile" element={<ProfilePage />} />

          {/* 📊 Statistik */}
          <Route path="stats" element={<StatsPage />} />

          {/* 👥 Semua Pengguna */}
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
