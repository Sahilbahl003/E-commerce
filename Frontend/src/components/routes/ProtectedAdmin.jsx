import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }
  else if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdmin;