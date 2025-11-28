// src/app/api/models/GetDataTypeSetting.ts

import mongoose, { Schema, model, models, Document } from 'mongoose';

// 
export interface IPostData extends Document {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
}

// 
const postsSchema = new Schema<IPostData>(
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
const GetDataTypeSetting = (models.posts as mongoose.Model<IPostData>) || model<IPostData>('posts', postsSchema);

export default GetDataTypeSetting;
