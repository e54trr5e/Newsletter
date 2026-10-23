import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// PUBLIC PAGES
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import Archive from "./pages/Archive";
import Issue from "./pages/Issue";
import About from "./pages/About";
import Subscription from "./pages/Subscription";
import Unsubscribe from "./pages/Unsubscribe"; // ← ADD THIS
import NotFound from "./pages/NotFound";

// ADMIN PAGES
import Auth from "./admin/Auth";
import Dashboard from "./admin/Dashboard";
import Subscribers from "./admin/Subscribers";
import Newsletters from "./admin/Newsletters";
import NewsletterEditor from "./admin/NewsletterEditor";
import Settings from "./admin/Settings";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* =====================================
            PUBLIC ROUTES
        ===================================== */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/stories"
            element={<Stories />}
          />

          <Route
            path="/stories/:slug"
            element={<Story />}
          />

          <Route
            path="/archive"
            element={<Archive />}
          />

          <Route
            path="/issue/:id"
            element={<Issue />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/subscribe"
            element={<Subscription />}
          />

          {/* ADD IT HERE ↓ */}

          <Route
            path="/unsubscribe/:id"
            element={<Unsubscribe />}
          />

        </Route>


        {/* =====================================
            ADMIN LOGIN
        ===================================== */}

        <Route
          path="/admin/login"
          element={<Auth />}
        />


        {/* =====================================
            PROTECTED ADMIN ROUTES
        ===================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="newsletters"
              element={<Newsletters />}
            />

            <Route
              path="newsletters/new"
              element={<NewsletterEditor />}
            />

            <Route
              path="newsletters/:id/edit"
              element={<NewsletterEditor />}
            />

            <Route
              path="subscribers"
              element={<Subscribers />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>

        </Route>


        {/* =====================================
            404
        ===================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}

export default App;