import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Logout from "../../AuthArea/Logout/Logout";
import PageNotFound from "../PageNotFound/PageNotFound";
import LocationList from "../../LocationsArea/LocationList/LocationList";
import LocationsDetails from "../../LocationsArea/LocationsDetails/LocationsDetails";


function RoutingForUser(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Navigate to="/locations"/>}/>
        {/* <Route path="/home" element={<Home/>}/> */}
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/" element={<Navigate to="/locations"/>} />
        <Route path="/locations" element={<LocationList/>} />
        <Route path="/locations/Details/:locationId" element={<LocationsDetails/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}
export default RoutingForUser;