import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./guards/privateRoute";
import Profile from "./components/profile";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
