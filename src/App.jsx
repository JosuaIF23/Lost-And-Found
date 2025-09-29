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
const LostFoundHomePage = lazy(() =>
  import("./features/lostfound/pages/HomeLostFoundPage") // ✅
);
const LostFoundDetailPage = lazy(() =>
  import("./features/lostfound/pages/DetailLostFoundPage") // ✅
);


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
          <Route index element={<LostFoundHomePage />} />
          <Route
            path="lostfound/:lostFoundId"
            element={<LostFoundDetailPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
