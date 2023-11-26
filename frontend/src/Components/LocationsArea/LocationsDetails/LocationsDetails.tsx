import "./LocationsDetails.css";
import Role from "../../../Models/RoleModel";
import LocationsModel from "../../../Models/LocationModel";
import LocationsService from "../../../Services/LocationsService";
import notifyService from "../../../Services/NotifyService";
import config from "../../../Utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import store from "../../../Redux/Store";
import dayjs from 'dayjs'
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";

function LocationsDetails(): JSX.Element {
  const [role, setRole] = useState<boolean>();
  const [buttonForRole, setButtonForRole] = useState<string>();
  const isAdmin = store.getState().authState.isAdmin;
  const params = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationsModel>();
  const getUserInfo = store.getState().authState.user;


  useEffect(()=>{
   const takeTheRole = getUserInfo.role
   const isAdmin = takeTheRole === Role.Admin
   setRole(isAdmin)  
  },[]);
 
  useEffect(()=>{
   const id: number = +params.locationId;
   LocationsService.getOneLocation(id)
   .then(locations => setLocation(locations))
   .catch(err =>  notifyService.error(err));
  }, []);

  useEffect(()=>{
   role === false ? setButtonForRole("BackButtonContainer"):
   setButtonForRole("BackButtonContainerRole")
  })


 function handleBack(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  navigate("/locations")
 }
 function handleEdit(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  navigate("/locations/edit/"+location.locationId)
 }
 function handleDelete(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  deleteLocation()
  navigate("#")
 }

 async function deleteLocation() {
  try {
   await LocationsService.deleteLocation(location.locationId);
   notifyService.success("location has been deleted.");
   navigate("/locations");
  }
  catch (err: any) {
   notifyService.error(err);
  }
 }

 return (
        
 <div  className="LocationsDetails">
  <div className="CardLocationDetails">
   {!location && <Loading />}
   {location &&  <>
     <span >{location.locationName}</span> 
 
    <div className="container" >
     <img src={config.locationImagesUrl + location.imageName} />
     <Breadcrumbs aria-label="breadcrumb"  onClick={handleBack} className="BackButtonContainer">
      <Link
       underline="none"
       color="GrayText"
       href="/" 
       fontSize="large">
       <ReplyIcon sx={{ mr: 0.5 }} fontSize="medium" />
      </Link>
     </Breadcrumbs>
         
    {role &&<>
     <div className="EditButtonContainer">
      <Breadcrumbs aria-label="breadcrumb"  onClick={handleEdit}>
       <Link
        underline="none"
        color="#689f38"
        href="/"
        fontSize="large" >
        <EditIcon sx={{ fontSize: 30}} />
       </Link>
      </Breadcrumbs>
     </div>
     <div className="DeleteButtonContainer">
      <Breadcrumbs aria-label="breadcrumb"  onClick={handleDelete}>
       <Link
        underline="none"
        href="/"
        fontSize="large" 
        color="#ef5350">
        <DeleteIcon sx={{ fontSize: 30}}  />
       </Link>
      </Breadcrumbs>
     </div>
     </>}
    </div>

    <div className="Info"> 
     <span >info :</span><span className="TheInfo"> {location.locationsInfo}</span>
    </div >
    <div className="Price">
     <span>Price : </span><span className="ThePrice">${location.price}</span>
    </div>
    <div className="Dates">
     <samp>Dates :</samp>
     <span className="TheDate">{dayjs(location.locationsStartDate).format('DD/MM/YYYY')} - {dayjs(location.locationsEndDate).format('DD/MM/YYYY')}</span>
    </div>
   </>}
  </div>
 </div>
 );
}

export default LocationsDetails;
