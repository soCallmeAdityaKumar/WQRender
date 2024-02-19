import React from "react";
import RoutesPage from "./Routes";
import "./App.css";
AuthProvider
import DetailsPage from "./Components/Pages/DetailsPage";
import { AuthProvider } from "./Components/authentication/service/AuthService";

const App = () => {
  return (
    <>
    <AuthProvider>
      <RoutesPage />
    </AuthProvider>
    </>
  );
};

export default App;
