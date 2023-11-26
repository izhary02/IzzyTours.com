import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";


function Routing(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default Routing;
