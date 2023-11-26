import "./Home.css";
import { useEffect, useState } from "react";
import LocationsModel from "../../../Models/LocationModel";
import locationsService from "../../../Services/LocationsService";
import interceptorService from "../../../Services/InterceptorService";
import FollowerModel from "../../../Models/FollowerModel";
import store from "../../../Redux/Store";
import notifyService from "../../../Services/NotifyService";
import followerService from "../../../Services/FollowerService";
import Loading from "../../SharedArea/Loading/Loading";


function Home(): JSX.Element {
const [locations, setLocations] = useState<LocationsModel[]>([]);
const [current, setCurrent]= useState <number>(0);
const [autoPlay, setAutoPlay] = useState <boolean>(true);
interceptorService.createInterceptors();
const [followers, setFollowers] = useState<FollowerModel[]>([]);
const getUserInfo = store.getState().authState.user;
const userId = getUserInfo.userId ;
let timeOut:any = null

useEffect(() => {
    timeOut = autoPlay && setTimeout(() => {
        SlideRight();
    }, 2500);
});

const SlideRight = () => {
    if (current === locations.length-1){
        setCurrent(0);
    }else{
        setCurrent(current+1);
    }
};
    

const SlideLeft = () => {
    setCurrent(current === 0 ? locations.length-1 : current - 1);
};

useEffect(() => {
    locationsService.getAllLocations(userId)
    .then(locations => setLocations(locations))
    .catch(err =>  notifyService.error(err));
  
    followerService.getAmountOfTheSameLocationWithoutId()
    .then(follower=>setFollowers(follower))
    .catch(err =>  notifyService.error(err)); 
    
    
    const unsubscribe = store.subscribe(() => {
        
        const dupLocations = [...store.getState().locationsState.locations];
        setLocations(dupLocations);
        
        const dupFollowers = [...store.getState().followersState.locationsFollowers];
        setFollowers(dupFollowers);
    });
    return()=> unsubscribe();
}, []);


    return (
        <div className="Home">
            {locations.length === 0 && <Loading />} 
            <div className="TopImagesTitle">
            <h2>Users favorites</h2>
			<p>the top locations</p>
            </div>
            <div className="TopImagesContainer"
                    onMouseEnter={()=>{setAutoPlay(false);
                         clearTimeout(timeOut);}}
                    onMouseLeave={()=>{setAutoPlay(true);}}
                    >
                <div className="CarouselWrapper">
                <div className="CarouselArrowLeft" onClick={SlideLeft}>&lsaquo;</div>
                <div className="CarouselArrowRight" onClick={SlideRight}>&rsaquo;</div>
                <div className="CarouselPagination">
                {locations.map((_,index) => 
                <div key={index} 
                className={index == current ? "Pagination_dot Pagination_dot-active" 
                : "Pagination_dot"} 
                onClick={()=>setCurrent(index)}/>)}
                </div>
                </div>
            </div>
           {/* <Carousel/> */}
           {/* <Carousel images={locations.image}/> */}

        </div>
    );
}

export default Home;
