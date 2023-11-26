import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import {TextField, ButtonGroup, Button} from '@mui/material'
import socketService from "../../../Services/SocketService";


function Login(): JSX.Element {
   
 const navigate = useNavigate();
 const {register,handleSubmit,formState} = useForm<CredentialsModel>();
 async function send(credentials:CredentialsModel){
   try{
     await authService.login(credentials);
     notifyService.success("You have been successfully logged-in.");
     await socketService.connect()
     socketService.logIn(credentials)
     navigate("/home/");
    }
   catch(err: any){
     notifyService.error(err);
     console.log(err);           
    }
 }
 return (
   <div className="Login FirstBox">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(send)}>
        <span>{formState.errors.username?.message}</span>
        <TextField label="Username:"  variant="outlined" className="Textfield" size="small"{...register("username",{
           required:{ value: true, message: "Missing username"},
           minLength:{ value: 4, message: "username too short"},
           maxLength:{ value: 30, message: "username too long"}
        })}/>
            
        <span>{formState.errors.password?.message}</span>
        <TextField label="Password:" variant="outlined" className="Textfield" size="small"{...register("password",{
           required:{ value: true, message: "Missing password"},
           minLength:{ value: 4, message: "password too short"},
           maxLength:{ value: 50, message: "password too long"}
        })}/> 
        <br />
        <br />
        <ButtonGroup variant="contained" color="primary" fullWidth className="ButtonField" >
           <Button sx={{backgroundColor:"#141471"}} type="submit">Login</Button>  
        </ButtonGroup>
      </form>
   </div>
    );
}



export default Login;
