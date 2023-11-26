import "./EditLocation.css";
import LocationsService from "../../../Services/LocationsService";
import locationsService from "../../../Services/LocationsService";
import notifyService from "../../../Services/NotifyService";
import LocationsModel from "../../../Models/LocationModel";
import config from "../../../Utils/Config";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {PhotoCamera,Send} from '@mui/icons-material';
import {TextField, Button, InputAdornment,IconButton} from '@mui/material'

   
function EditLocation(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm<LocationsModel>();
  const [stateLocation, setLocation] = useState<LocationsModel>();
    
  useEffect(() => {
    const id: number = +params.locationId;
    LocationsService.getOneLocation(id)
      .then(locationToEdit => {
        setLocation(locationToEdit);
        setValue("locationName", locationToEdit.locationName);
        setValue("locationsInfo", locationToEdit.locationsInfo);
        setValue("price", locationToEdit.price);
        setValue("locationsStartDate", locationToEdit.locationsStartDate);
        setValue("locationsEndDate", locationToEdit.locationsEndDate);
      })
      .catch(err =>  notifyService.error(err));
    }, []);

  async function send(formLocation: LocationsModel) {
    try {
      formLocation.locationId = stateLocation.locationId;
      const updatedLocation = await locationsService.updateLocation(formLocation);
      notifyService.success("Location updated! id: " + updatedLocation.locationId); 
      navigate("/locations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }
  return (
    <div className="EditLocation FirstBox">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(send)}>                   
        <span>{formState.errors.locationName?.message}</span>
        <TextField label="Name:" variant="outlined" className="Textfield" InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,}} {...register("locationName", {
            required: { value: true, message: "Missing Location Name"},
            minLength: { value: 3, message: "Location Name too short"},
            maxLength: { value: 15, message: "Location Name too long"}
        })}/>

        <span>{formState.errors.locationsInfo?.message}</span>
        <TextField label="Info:"  variant="outlined" multiline rows={4} className="Textfield" InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,}} {...register("locationsInfo", {
          required: { value: true, message: "Missing Info"},
          min: { value: 3, message: "Info too short"},
          max: { value: 10000, message: "Info too long"},
        })}/>

        <span>{formState.errors.price?.message}</span>
        <TextField label="Price:" variant="outlined" className="Textfield" InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,}}{...register("price", {
          required: { value: true, message: "Missing price"},
          min: { value: 0, message: "Price can't be negative"},
          max: { value: 10000, message: "Price can't exceeds 10000"}
        })}/>  

        <span>{formState.errors.locationsStartDate?.message}</span>
        <TextField label="Start Date:" type="date" variant="outlined" className="Textfield"  InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,}} {...register("locationsStartDate", {
          required: { value: true, message: "Missing Start Date"},
        })}/> 
    
        <span>{formState.errors.locationsEndDate?.message}</span>
        <TextField label="End Date:"   type="date" variant="outlined" className="Textfield"  InputProps={{
          startAdornment:<InputAdornment position="start"></InputAdornment> ,}} {...register("locationsEndDate", {
          required: { value: true, message: "Missing End Date"},
        })}/>

        <br/>
        <br/>

        <IconButton color="primary" aria-label="upload picture" component="label" className="ButtonField" >
          <input hidden accept="image/*" type="file" {...register("image",{
            required: { value: true, message: "Missing Image"},
          })}>
          </input> 
          <PhotoCamera />
        </IconButton>
        <img src={config.locationImagesUrl + stateLocation?.imageName} />
        <br/>
        <br/>
        <Button type="submit"  variant="outlined" color="primary" className='UpdateButtonField' fullWidth endIcon={<Send color="primary"/>}>
          Update
        </Button>           
      </form>
    </div>
  );
}

export default EditLocation;
