import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/auth/ProtectedRoutes";
import { PublicRoutes } from "./components/auth/PublicRoutes";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { BlogCreate } from "./pages/BlogCreate";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blog/new" element={<BlogCreate />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "text-2xl",
        }}
      />
    </>
  );
}

export default App;
