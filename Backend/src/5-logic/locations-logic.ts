
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-model";
import LocationModel from "../4-models/location-model";
import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';
import socketLogic from "./socket-logic";

const { unlink } = require('node:fs/promises');
async function getAllLocations(userId:number): Promise<LocationModel[]> {
  const sql = `SELECT * FROM  follower AS F RIGHT JOIN locations AS L ON F.locationId = L.locationId AND F.userId = ? ORDER BY F.userId = ? DESC;`;
  const locations = await dal.execute(sql,[userId,userId]); 
  return locations; 
}

async function getOneLocationAmountOfTime(locationId:number): Promise<LocationModel[]> {
  const sql = `SELECT * FROM locations AS L RIGHT JOIN follower AS F ON L.locationId=F.locationId WHERE F.locationId = ?;`;
  const locations = await dal.execute(sql,[locationId]); 
  return locations;
    
}

async function getDetailsLocation(locationId:number): Promise<LocationModel> {
  const sql = `SELECT * FROM locations WHERE locationId = ?`;
  const location = await dal.execute(sql,[locationId]);
  return location;   
}

async function addLocation(location:LocationModel): Promise<LocationModel> {
  const errors = location.validatePost();
  if (errors) {
    throw new ValidationError(errors);
  }
  if (location.image){
    //Generate unique name with original extension:
    const dotIndex = location.image.name.lastIndexOf(".");
    const extension = location.image.name.substring(dotIndex);
    location.imageName = uuid() + extension; // 265d844e-c5fa-4e0b-a835-e867223f9726.png /.jpg...
    //Save in disk:
    await location.image.mv("./src/1-assets/images/" + location.imageName);
    // Don't return back image file:
    delete location.image;
  }
  const sql =`INSERT INTO locations (locationName,price,locationsInfo,locationsStartDate,locationsEndDate,imageName) VALUES(?,?,?,?,?,?)`;
  const result: OkPacket = await dal.execute(sql,[location.locationName,location.price,location.locationsInfo,location.locationsStartDate,location.locationsEndDate,location.imageName]);
  location.locationId = result.insertId;
  socketLogic.reportAddLocation(location);
  return location;
}


async function updateFullLocation(location:LocationModel):Promise<LocationModel> { 
  const errors = location.validatePut();
  if(errors) {
    throw new ValidationError(errors);
  }; 
  if (location.image){
    const sql =`SELECT locationId, imageName FROM locations WHERE locationId = ?`
    const imageInfo = await dal.execute(sql,[location.locationId]);
    const TakeTheName = imageInfo.shift()
    const imageName = TakeTheName.imageName
    try {
      await unlink(`./src/1-assets/images/`+imageName);
    }
    catch (error) {
      console.error('there was an error:', error.message);
    }
    const dotIndex = location.image.name.lastIndexOf(".");
    const extension = location.image.name.substring(dotIndex);
    location.imageName = uuid() + extension;
    await location.image.mv("./src/1-assets/images/" + location.imageName);
    delete location.image;
  };

  const newStartDate = dayjs(location.locationsStartDate).format('YYYY-MM-DD HH:hh');
  const newEndDate = dayjs(location.locationsStartDate).format('YYYY-MM-DD HH:hh');
  const sql = `UPDATE locations SET locationName =?, price = ?,locationsInfo = ?, locationsStartDate = ?,locationsEndDate = ?,imageName = ? WHERE locationId = ?`;
  const result: OkPacket = await dal.execute(sql,[location.locationName,location.price,location.locationsInfo,newStartDate,newEndDate,location.imageName,location.locationId]);
  if(result.affectedRows === 0 ){
     throw new ResourceNotFoundError(location.locationId);
  };
  socketLogic.reportUpdateLocation(location)
  return location;

};

async function updatePartialLocation(location:LocationModel):Promise<LocationModel> {
  const dbLocations = await getDetailsLocation(location.locationId);
  const dbLocation= dbLocations[0];
  for(const prop in location){
    if(location[prop] !== undefined){
      dbLocation[prop] = location[prop];
    };
  };
  const updatedLocation = await updateFullLocation(dbLocation);
  socketLogic.reportUpdateLocation(location)
  return updatedLocation;
};


async function deleteLocation(locationId:number):Promise<void> {
  const sql =`SELECT locationId, imageName FROM locations WHERE locationId = ?`
  const imageInfo = await dal.execute(sql,[locationId]);
  const TakeTheName = imageInfo.shift()
  const imageName = TakeTheName.imageName
  try { await unlink(`./src/1-assets/images/`+imageName)}
  catch (error) { console.error('there was an error:', error.message);};
  const sqlForDelete = `DELETE FROM locations WHERE locationId = ?`;
  const result = await dal.execute(sqlForDelete,[locationId]);   
  if(result.affectedRows === 0 ){
    throw new ResourceNotFoundError(locationId)
  };
  socketLogic.reportDeleteLocation(locationId)
}

export default {
  getAllLocations,
  addLocation,
  updateFullLocation,
  updatePartialLocation,
  deleteLocation,
  getDetailsLocation,
  getOneLocationAmountOfTime
};