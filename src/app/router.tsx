import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Champions from "../pages/champions";
import Header from "../components/header";
import Details from "../pages/details";
import Profile from "../pages/profile";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-2">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/champions/details/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
