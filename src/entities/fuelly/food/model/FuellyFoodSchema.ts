import { Model, model, models, Schema, Types } from "mongoose";

export interface FuellyFoodDocument{
    _id: Types.ObjectId
    name: string;
    protein: number;
    calorie: number
    unit: string;
    createdBy: string;
}

const FuellyFoodSchema = new Schema<FuellyFoodDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        protein: {
            type: Number,
            required: true, 
            min:  0
        },
        calorie: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            index: true
        }
    },{
        timestamps: true,
        collection: 'fuelly_foods'
    }
)

export const FuellyFoodModel = (models.FuellyFood as Model<FuellyFoodDocument>)?? model<FuellyFoodDocument>('FuellyFood',FuellyFoodSchema)