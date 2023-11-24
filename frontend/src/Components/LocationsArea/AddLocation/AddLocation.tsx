import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LocationsModel from "../../../Models/LocationModel";
import LocationsService from "../../../Services/LocationsService";
import notifyService from "../../../Services/NotifyService";
import "./AddLocation.css";
import {TextField, Button, InputAdornment, IconButton} from '@mui/material'
import {PhotoCamera,Send} from '@mui/icons-material';
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";



function AddLocation(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<LocationsModel>();


    const [token, setToken] = useState<string>()
    const getUserToken = store.getState().authState.token;



useEffect(()=>{
    const getUserToken = store.getState().authState.token;
    setToken(getUserToken)
    console.log({token});
     },);
   
    async function send(location: LocationsModel) {
        try {
            console.log(location);
             await LocationsService.addLocation(location);
             notifyService.success(location.locationName +" Location added!");
             navigate("/locations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }



    return (
<div className="AddLocation FirstBox">	
	<h2>Add Location</h2>
    <form onSubmit={handleSubmit(send)}>
        <span>{formState.errors.locationName?.message}</span>
        <TextField label="Name:" variant="outlined" className="Textfield"  {...register("locationName", {
            required: { value: true, message: "Missing Location Name"},
            minLength: { value: 3, message: "Location Name too short"},
            maxLength: { value: 15, message: "Location Name too long"}
        })}/>
            
        <span>{formState.errors.price?.message}</span>
        <TextField label="Price:" variant="outlined" className="Textfield" InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,}}{...register("price", {
            required: { value: true, message: "Missing price"},
            min: { value: 0, message: "Price can't be negative"},
            max: { value: 10000, message: "Price can't exceeds 10000"}
        })}/>  

        <span>{formState.errors.locationsInfo?.message}</span>
        <TextField label="Info:"  variant="outlined" multiline rows={4} className="Textfield" {...register("locationsInfo", {
            required: { value: true, message: "Missing Info"},
            min: { value: 3, message: "Info too short"},
            max: { value: 10000, message: "Info too long"},
        })}/>
            
        <span>{formState.errors.locationsStartDate?.message}</span>
        <TextField label="Start Date:" type="date" variant="outlined" className="Textfield" InputProps={{
            startAdornment: <InputAdornment position="start">{}</InputAdornment>,}} {...register("locationsStartDate", {
            required: { value: true, message: "Missing Start Date"},
        })}/> 

        <span>{formState.errors.locationsEndDate?.message}</span>
            <TextField label="End Date:" type="date" variant="outlined" className="Textfield" InputProps={{
            startAdornment: <InputAdornment position="start">{}</InputAdornment>,}}{...register("locationsEndDate", {
            required: { value: true, message: "Missing End Date"},
        })}/>

        <IconButton color="primary" aria-label="upload picture" component="label">
            <input type="file" hidden accept="image/*"{...register("image",{               
                required: { value: true, message: "Missing Image"},
            })}/>
            <PhotoCamera />
        </IconButton>
        <br/>                
        <Button type="submit"  variant="outlined" color="primary" endIcon={<Send color="primary"/>}>
            Add
        </Button>
    </form>
</div>
);
}
export default AddLocation;