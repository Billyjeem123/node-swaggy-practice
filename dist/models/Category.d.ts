import mongoose, { Document } from 'mongoose';
export interface ICategory extends Document {
    name: string;
}
export declare const CategoryModel: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}> & ICategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
