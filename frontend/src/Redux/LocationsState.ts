import LocationsModel from "../Models/LocationModel";

export class LocationsState {
    public locations: LocationsModel[] = [];
    public locationsFollow: LocationsModel[] =[];
}


export enum LocationsActionType {
    FetchLocations = "FetchLocations",
    FetchAllLocationsFollower = "FetchAllLocationsFollower",
    AddLocation = "AddLocation",
    UpdateLocation = "UpdateLocation",
    DeleteLocation = "DeleteLocation",
    Logout = "Logout",
}

export interface LocationsAction {
    type: LocationsActionType;
    payload?: any;
}


export function fetchLocationsAction(locations: LocationsModel[]): LocationsAction {
    const action: LocationsAction = { type: LocationsActionType.FetchLocations, payload: locations };
    return action;
}
export function fetchAllLocationsFollowerAction(locationsFollow: LocationsModel[]): LocationsAction {
    const action: LocationsAction = { type: LocationsActionType.FetchAllLocationsFollower, payload: locationsFollow };
    return action;
}
export function addLocationAction(locations: LocationsModel): LocationsAction {
    const action: LocationsAction = { type: LocationsActionType.AddLocation, payload: locations };
    return action;
}
export function updateLocationAction(locations: LocationsModel): LocationsAction {
    const action: LocationsAction = { type: LocationsActionType.UpdateLocation, payload: locations };
    return action;
}
export function deleteLocationAction(id: number): LocationsAction {
    const action: LocationsAction = { type: LocationsActionType.DeleteLocation, payload: id };
    return action;
}

export function logoutAction(): LocationsAction{
    const action: LocationsAction ={type:LocationsActionType.Logout};
    return action;
}


export function locationsReducer(currentState = new LocationsState(), action: LocationsAction): LocationsState {
    const newState = {...currentState};

    switch (action.type) {

        case LocationsActionType.FetchLocations:
            newState.locations = action.payload;
        break;
        case LocationsActionType.FetchAllLocationsFollower:
            newState.locations = action.payload;
        break;

        case LocationsActionType.AddLocation:
            newState.locations.push(action.payload);
        break;

        case LocationsActionType.UpdateLocation:
            const indexToUpdate = newState.locations.findIndex(l => l.locationId === action.payload.id);
            if(indexToUpdate >= 0) {
                newState.locations[indexToUpdate] = action.payload;
            }
        break;

        case LocationsActionType.DeleteLocation:
            const indexToDelete = newState.locations.findIndex(l => l.locationId === action.payload);
            if(indexToDelete >= 0) {
                newState.locations.splice(indexToDelete, 1);
            }
        break;
        case LocationsActionType.Logout:
            newState.locations = null;
            newState.locationsFollow = null;
        break;
   
  
}
return newState
}

 