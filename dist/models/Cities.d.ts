import mongoose, { Document } from 'mongoose';
export interface ICity extends Document {
    name: string;
}
export declare const CityModel: mongoose.Model<ICity, {}, {}, {}, mongoose.Document<unknown, {}, ICity, {}> & ICity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
