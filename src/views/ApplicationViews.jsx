import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditHikePlan } from "../Components/HikePlan/EditHikePlan";
import { ViewHikePlan } from "../Components/HikePlan/ViewHikePlan";
import { CreateHikePlan } from "../Components/HikePlan/CreateHikePlan";
import { MyHikes } from "../Components/MyHikes/MyHikes";
import { NavBar } from "../Components/Nav/NavBar";
import { ChooseTrail } from "../Components/ChooseTrail/ChooseTrail";
import { TrailDetails } from "../Components/TrailDetails/TrailDetails";

import { AllSVGLayers } from "../Components/SVG/AllSVGLayers";
import { SVGLayer1 } from "../Components/SVG/SVGLayer1";
import { SVGLayer2 } from "../Components/SVG/SVGLayer2";
import { SVGLayer3 } from "../Components/SVG/SVGLayer3";


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("hiking_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
          <div className="SVG-background">
              <AllSVGLayers/>
          </div>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<MyHikes currentUser={currentUser} />} />
        <Route
          path="/createHikePlan/:hikePlanId/:trailId"
          element={<CreateHikePlan currentUser={currentUser} />}
        />
        <Route
          path="/ChooseTrail"
          element={<ChooseTrail currentUser={currentUser} />}
        />
        <Route
          path="/TrailDetails/:trailId"
          element={<TrailDetails currentUser={currentUser} />}
        />
        <Route path="/ViewHikePlan/:hikePlanId/:trailId" element={<ViewHikePlan currentUser={currentUser} />}
        />
        <Route path="/EditHikePlan/:hikePlanId/:trailId" element={<EditHikePlan currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  )
}