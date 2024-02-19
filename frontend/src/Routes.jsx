import React from "react";
import Login from "./Components/authentication/Login";
import SignUp from "./Components/authentication/SignUp";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import QuestsForm from "./Components/QuestForm/QuestsForm";
import UserProfile from "./Components/Pages/UserProfile";
import DetailsPage from "./Components/Pages/DetailsPage";

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/" Component={HomePage} />
      <Route path="/form" Component={QuestsForm} />
      <Route path="/userprofile" Component={UserProfile} />
      <Route path="/details" Component={DetailsPage} />
    </Routes>
  );
};

export default RoutesPage;
