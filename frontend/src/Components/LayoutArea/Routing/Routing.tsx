import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddLocation from "../../LocationsArea/AddLocation/AddLocation";
import EditLocation from "../../LocationsArea/EditLocation/EditLocation";
import LocationList from "../../LocationsArea/LocationList/LocationList";
import LocationsDetails from "../../LocationsArea/LocationsDetails/LocationsDetails";
import LocationsStatisticsForAdmin from "../../LocationsArea/LocationsStatisticsForAdmin/LocationsStatisticsForAdmin";


function Routing(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/home" element={<Navigate to="/locations"/>}/>
        <Route path="/" element={<Navigate to="/locations"/>} />
        <Route path="/locations" element={<LocationList/>} />
        <Route path="/locations/statistics" element={<LocationsStatisticsForAdmin/>} />
        <Route path="/locations/Details/:locationId" element={<LocationsDetails/>} />
        <Route path="/locations/edit/:locationId" element={<EditLocation/>}/>
        <Route path="/locations/new" element={<AddLocation/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default Routing;
