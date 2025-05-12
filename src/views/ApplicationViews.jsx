import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditHikePlan } from "../Components/HikePlan/EditHikePlan";
import { ViewHikePlan } from "../Components/HikePlan/ViewHikePlan";
import { CreateHikePlan } from "../Components/HikePlan/CreateHikePlan";
import { MyHikes } from "../Components/MyHikes/MyHikes";
import { NavBar } from "../Components/Nav/NavBar";
import { HikeForm } from "../Components/Forms/HikeForm";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<MyHikes />} />
        <Route
          path="/CreateHikePlan"
          element={<CreateHikePlan currentUser={currentUser} />}
        />
        <Route
          path="/HikeForm"
          element={<HikeForm currentUser={currentUser} />}
        />
        <Route
          path="/ViewHikePlan/:HikeId"
          element={<ViewHikePlan currentUser={currentUser} />}
        />
        <Route path="/EditHikePlan/:HikeId" element={<EditHikePlan />} />
      </Route>
    </Routes>
  );
}