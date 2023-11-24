import { log } from "console";
import LocationsModel from "../../../Models/LocationModel";
import config from "../../../Utils/Config";
import "./Carousel.css";

interface LocationCarouselProps {
    locations:LocationsModel;
    index:number;
    current:number
 }



function Carousel(props:LocationCarouselProps): JSX.Element {
// function Carousel(images): JSX.Element {
console.log(props.current);

    return (
        <div key={props.locations.locationId} className={props.index==props.current ?"Carousel Carousel-active" : "Carousel"}>
                <img className="CardImage" src={config.locationImagesUrl +props.locations.imageName} alt="" />
                <div className="CardOverlay">
                    <h2 className="LocationName">{props.locations.locationName}</h2>
               
            </div>
        </div>
    );
}

export default Carousel;
