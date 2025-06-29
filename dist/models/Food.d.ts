import mongoose, { Document, Types } from 'mongoose';
export interface IFood extends Document {
    name: string;
    price: number;
    restaurant_id?: Types.ObjectId;
}
export declare const FoodModel: mongoose.Model<IFood, {}, {}, {}, mongoose.Document<unknown, {}, IFood, {}> & IFood & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
