import mongoose, { Schema, model, models, Document } from 'mongoose';

// 
export interface BaseInsertPostType {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
}
//======================================================================
// INSERT 영역
//======================================================================
export interface IPostDocument extends BaseInsertPostType, Document {}
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

const ModelPostsSetting = mongoose.models.posts || model<IPostDocument>('posts', postsSchema);
export default ModelPostsSetting;