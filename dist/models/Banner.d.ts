import mongoose, { Document } from 'mongoose';
export interface IBanner extends Document {
    name: string;
    status: string;
}
declare const BannerModel: mongoose.Model<IBanner, {}, {}, {}, mongoose.Document<unknown, {}, IBanner, {}> & IBanner & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default BannerModel;
