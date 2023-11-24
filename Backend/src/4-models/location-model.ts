import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class LocationModel {
    public locationId: number;
    public locationName: string;
    public locationsInfo: string;
    public price:number;
    public locationsStartDate: Date ;
    public locationsEndDate: Date;
    public imageName: string;
    public image: UploadedFile;

    public constructor(location:LocationModel){
        this.locationId = location.locationId;
        this.locationName = location.locationName;
        this.locationsInfo = location.locationsInfo;
        this.price = location.price;
        this.locationsStartDate = location.locationsStartDate;
        this.locationsEndDate = location.locationsEndDate;
        this.imageName = location.imageName;
        this.image = location.image;
    }

    public static postValidationSchema = Joi.object({
        locationId: Joi.forbidden(),
        locationName: Joi.string().required().min(2).max(20),
        locationsInfo:Joi.string().required().min(2).max(10000),
        price: Joi.number().required().positive().min(2).max(50000),
        locationsStartDate: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
        locationsEndDate: Joi.date().iso().min(Joi.ref('locationsStartDate')),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()
    });

    public static putValidationSchema = Joi.object({
        locationId: Joi.number().required().integer().min(1),
        locationName: Joi.string().required().min(2).max(20),
        locationsInfo:Joi.string().required().min(2).max(10000),
        price: Joi.number().required().positive().min(2).max(50000),
        locationsStartDate: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
        locationsEndDate: Joi.date().iso().min(Joi.ref('locationsStartDate')),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()
    });

    public static patchValidationSchema = Joi.object({
        locationId: Joi.number().required().integer().min(1),
        locationName: Joi.string().optional().min(2).max(20),
        locationsInfo:Joi.string().optional().min(2).max(10000),
        price: Joi.number().optional().positive().min(2).max(50000),
        locationsStartDate: Joi.date().optional(),
        locationsEndDate: Joi.date().optional().iso().min(Joi.ref('locationsStartDate')),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()
    });
    public validatePost(): string {
        const result = LocationModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = LocationModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = LocationModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }
}
export default LocationModel;