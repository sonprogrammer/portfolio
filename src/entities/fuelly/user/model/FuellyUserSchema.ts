import {
    model,
    models,
    Schema,
} from 'mongoose';

import type { FuellyProfile } from './types';

interface FuellyUserDocument {
    sessionId: string;
    name: string;
    profile: FuellyProfile | null;
}

const FuellyProfileSchema =
    new Schema<FuellyProfile>(
        {
            height: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            gender: {
                type: String,
                enum: ['male', 'female'],
                required: true,
            },
            activityLevel: {
                type: String,
                enum: [
                    'sedentary',
                    'light',
                    'moderate',
                    'active',
                ],
                required: true,
            },
            goal: {
                type: String,
                enum: [
                    'bulk',
                    'diet',
                    'maintain',
                ],
                required: true,
            },
        },
        {
            _id: false,
        },
    );

const FuellyUserSchema =
    new Schema<FuellyUserDocument>(
        {
            sessionId: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
            profile: {
                type: FuellyProfileSchema,
                default: null,
            },
        },
        {
            timestamps: true,
        },
    );

export const FuellyUserModel =
    models.FuellyUser ??
    model<FuellyUserDocument>(
        'FuellyUser',
        FuellyUserSchema,
    );