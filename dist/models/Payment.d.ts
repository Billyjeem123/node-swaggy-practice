import mongoose, { Document } from 'mongoose';
export interface IPayment extends Document {
    user_id: mongoose.Types.ObjectId;
    order_id: mongoose.Types.ObjectId;
    restaurant_id: mongoose.Types.ObjectId;
    amount: number;
}
export declare const PaymentModel: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}> & IPayment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
