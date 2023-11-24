import "./Menu.css";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useEffect, useState } from "react";
import Role from "../../../Models/RoleModel";
import store from "../../../Redux/Store";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';

function Menu(): JSX.Element {
  const [role, setRole] = useState<boolean>();
  const [getHref, setGetHref] = useState<string>();
  const navigate = useNavigate();
  const [locationsButtonColor ,setLocationsButtonColor] = useState<string>("marked");
  const [addButtonColor ,setAddButtonColor] = useState<string>("AddButton"); 
  const [statisticsButtonColor,setStatisticsButtonColor] = useState<string>("StatisticsButton"); 
 

  useEffect(()=>{
      const getUserInfo = store.getState().authState.user;
      const takeTheRole = getUserInfo.role
      const isAdmin = takeTheRole === Role.Admin
      setRole(isAdmin);  
    },[]);

    useEffect(()=>{
      setGetHref(window.location.href)
      getHref==="http://localhost:3000/locations"|| getHref==="http://localhost:3000/home"? setLocationsButtonColor("marked"):setLocationsButtonColor("LocationsButton")
      getHref==="http://localhost:3000/locations/new"? setAddButtonColor("marked"):setAddButtonColor("AddButton")
      getHref==="http://localhost:3000/locations/statistics"? setStatisticsButtonColor("marked"):setStatisticsButtonColor("StatisticsButton");    
    });

    function handleLocations(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      event.preventDefault();
      navigate("/locations")
    }

    function handleAdd(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      event.preventDefault();
      navigate("/locations/new")
    }

    function handleStatistics(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      event.preventDefault();
      navigate("/locations/statistics")
    }
    
    return (
      <div className="Menu">

        {role && <>
        <br />
 
      <Breadcrumbs aria-label="breadcrumb" className={locationsButtonColor} onClick={handleLocations}>
        <Link
          className="ButtonLink"
          underline="none"
          color="ButtonFace"
          href="/" 
          fontSize="large">
          <PlaceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Locations
        </Link>
      </Breadcrumbs>

        <Breadcrumbs aria-label="breadcrumb" className={addButtonColor} onClick={handleAdd}>
          <Link
            className="ButtonLink"
            underline="none"
            color="ButtonFace"
            href="/"
            fontSize="large" >
            <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Add
          </Link>
        </Breadcrumbs>


        <Breadcrumbs aria-label="breadcrumb" className={statisticsButtonColor} onClick={handleStatistics}>
          <Link
            className="ButtonLink"
            underline="none"
            href="/"
            fontSize="large" 
            color="ButtonFace">
            <LeaderboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Statistics
          </Link>
        </Breadcrumbs>
          </>
    }
    </div>
    );
  }

export default Menu;