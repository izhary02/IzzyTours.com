import axios from "axios";
import LocationsModel from "../Models/LocationModel";
import store from "../Redux/Store";
import config from "../Utils/Config";
import dayjs from 'dayjs'
import { fetchLocationsAction, addLocationAction, updateLocationAction, deleteLocationAction, fetchAllLocationsFollowerAction } from "../Redux/LocationsState";

class LocationsService {

    
    public async getAllLocations(userId:number): Promise<LocationsModel[]> {
      
        let locations = store.getState().locationsState.locations;
        if (locations.length === 0) {
            const response = await axios.get<LocationsModel[]>(config.locationsUrl+userId);
            locations = response.data;
            store.dispatch(fetchLocationsAction(locations)); 
        }
        return locations;
    }

    public async getAllLocationsWithFollow(locationId:number): Promise<LocationsModel[]> {
      
        let locations = store.getState().locationsState.locationsFollow;
        if (locations.length === 0) {
            const response = await axios.get<LocationsModel[]>(config.locationsUrl+locationId);
            locations = response.data;
            store.dispatch(fetchAllLocationsFollowerAction(locations)); 
        }
        return locations;
    }

   
    public async getOneLocation(id: number): Promise<LocationsModel> {
        const locations = await this.getAllLocations(id);
        const location = locations.find(l => l.locationId === id);
        return location;
    }


    public async addLocation(location: LocationsModel): Promise<void> {

        const formData = new FormData();
        formData.append("locationName", location.locationName);
        formData.append("locationsInfo", location.locationsInfo);
        formData.append("price", location.price.toString()); 
        formData.append("locationsStartDate", dayjs(location.locationsStartDate).format('YYYY-MM-DD')); 
        formData.append("locationsEndDate",dayjs(location.locationsEndDate).format('YYYY-MM-DD')); 
        formData.append("image", location.image.item(0));
     
      
        const response = await axios.post<LocationsModel>(config.locationsUrl, formData);
        const addedLocation = response.data;          
        // store.dispatch(addLocationAction(addedLocation));
    }

   
    public async updateLocation(location: LocationsModel): Promise<LocationsModel> {
       
        const formData = new FormData();
        formData.append("locationName", location.locationName);
        formData.append("locationsInfo", location.locationsInfo);
        formData.append("price", location.price.toString()); 
        formData.append("locationsStartDate", dayjs(location.locationsStartDate).format('YYYY-MM-DD')); 
        formData.append("locationsEndDate",dayjs(location.locationsEndDate).format('YYYY-MM-DD')); 
        formData.append("image", location.image.item(0));
        const response = await axios.put<LocationsModel>(config.locationsUrl + location.locationId, formData);
        const updatedProduct = response.data;
        store.dispatch(updateLocationAction(updatedProduct));
        return updatedProduct;
    }

  
    public async deleteLocation(id: number): Promise<void> {
        await axios.delete(config.locationsUrl + id);
        store.dispatch(deleteLocationAction(id));
    }
    


}

const locationsService = new LocationsService();

export default locationsService;