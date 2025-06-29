import mongoose, { Document } from 'mongoose';
export interface IOrder extends Document {
    user_id: mongoose.Types.ObjectId;
    restaurant_id: mongoose.Types.ObjectId;
    food_id: mongoose.Types.ObjectId;
    amount: number;
}
export declare const OrderModel: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}> & IOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
