// src/app/api/models/GetDataTypeSetting.ts

import mongoose, { Schema, model, models, Document } from 'mongoose';

// 
export interface IPostData {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
}

// 
export interface IPostDocument extends IPostData, Document {}
const postsSchema = new Schema<IPostDocument>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String },
        category: { type: String, required: true },
        date: { type: Date, default: Date.now },
        slug: { type: String, required: true, unique: true },
    },
    {
        versionKey: false,
    }
);

// 3.
const GetDataTypeSetting = (models.posts as mongoose.Model<IPostDocument>) || model<IPostData>('posts', postsSchema);

export default GetDataTypeSetting;
