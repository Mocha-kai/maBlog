// src/app/api/models/GetDataTypeSetting.ts

import mongoose, { Schema, model, models, Document } from 'mongoose';

// 1. Post 문서의 TypeScript 인터페이스 정의
export interface IPostData extends Document {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
}

// 2. Mongoose 스키마 정의
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
