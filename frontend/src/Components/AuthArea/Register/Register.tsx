import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import {TextField, ButtonGroup, Button} from '@mui/material'
import "./Register.css";
import socketService from "../../../Services/SocketService";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const {register,handleSubmit,formState} = useForm<UserModel>();

  async function send(user:UserModel){
    try{
      await authService.register(user);
        socketService.connect();
        notifyService.success("You have been successfully registered.");
        navigate("/home/");
        socketService.register(user);
    }
    catch(err: any){
      notifyService.error(err);
    }    
  }
  return (
    <div className="Register FirstBox">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(send)}>
        <span>{formState.errors.firstName?.message}</span>
        <TextField label="First name:"  variant="outlined" className="Textfield" size="small" {...register("firstName",{
          required:{ value: true, message: "Missing First name"},
          minLength:{ value: 2, message: "First name too short"},
          maxLength:{ value: 50, message: "First name too long"}
       })}/>
  
        <span>{formState.errors.lastName?.message}</span>
        <TextField label="Last name:"  variant="outlined" className="Textfield" size="small" {...register("lastName",{
          required:{ value: true, message: "Missing Last name"},
          minLength:{ value: 3, message: "Last name too short"},
          maxLength:{ value: 50, message: "Last name too long"}
       })}/>  

        <span>{formState.errors.username?.message}</span>
        <TextField label="Username:"  variant="outlined" className="Textfield" size="small" {...register("username",{
          required:{ value: true, message: "Missing username"},
          minLength:{ value: 4, message: "username too short"},
          maxLength:{ value: 30, message: "username too long"}
       })}/>
  
        <span>{formState.errors.password?.message}</span>
        <TextField label="Password:"  variant="outlined" className="Textfield" size="small" {...register("password",{
          required:{ value: true, message: "Missing password"},
          minLength:{ value: 4, message: "password too short"},
          maxLength:{ value: 50, message: "password too long"}
       })}/>
  
        <span>{formState.errors.email?.message}</span>
        <TextField label="Email:"  variant="outlined" className="Textfield" size="small" {...register("email",{
          required:{ value: true, message: "Missing Email"},
          minLength:{ value: 7, message: "Email too short"},
          maxLength:{ value: 50, message: "Email too long"}
       })}/>

        <ButtonGroup variant="contained" color="primary" fullWidth className="ButtonField">
          <Button sx={{backgroundColor:"#141471"}} type="submit">Register</Button>  
        </ButtonGroup>
  
      </form>
    </div>
  );
}

export default Register;
