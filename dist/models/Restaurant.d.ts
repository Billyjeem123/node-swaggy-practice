import mongoose, { Document, Types } from 'mongoose';
export interface IRestaurant extends Document {
    name: string;
    city_id?: Types.ObjectId;
    user_id: Types.ObjectId;
}
export declare const RestaurantModel: mongoose.Model<IRestaurant, {}, {}, {}, mongoose.Document<unknown, {}, IRestaurant, {}> & IRestaurant & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
