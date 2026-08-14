
import {Model, model, models, Schema, Types } from 'mongoose'

export interface FuellyMealItem{
    _id: Types.ObjectId;
    foodId?: Types.ObjectId;
    foodName: string;
    calories: number;
    protein: number;
    unit: string;
}

export interface FuellyDailyMealDocument{
    _id: Types.ObjectId
    userId: Types.ObjectId;
    dateKey: string;
    meals: FuellyMealItem[]
}

const FuellyMealItemSchema = new Schema<FuellyMealItem>(
    {
        foodId: {
            type: Schema.Types.ObjectId,
            ref: 'FuellyFood',
            required: false,
        },
        foodName: {
            type: String,
            required: true,
            trim: true
        },
        calories: {
            type: Number,
            required: true,
            min: 0,
        },
        protein: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: true
    }
)

const FuellyDailyMealSchema = new Schema<FuellyDailyMealDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'FuellyUser',
            required: true,
            index: true
        },
        dateKey: {
            type: String,
            required: true
        },
        meals: {
            type: [FuellyMealItemSchema],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'fuelly_daily_meals'
    }
)

FuellyDailyMealSchema.index({userId: 1, dateKey: 1,}, {unique: true})

export const FuellyDailyMealModel = (models.FuellyDailyMeal as Model<FuellyDailyMealDocument>) ??
    model<FuellyDailyMealDocument>('FuellyDailyMeal', FuellyDailyMealSchema)