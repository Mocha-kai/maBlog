import mongoose, { Schema, model, Document, Types } from 'mongoose';

//
export interface BaseInsertPostType {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
}
export type IPostData = BaseInsertPostType & {
    _id: Types.ObjectId;
};

export type IPostDataWithHtml = IPostData & {
    contentHtml: string;
};
//======================================================================
// INSERT 영역
//======================================================================
export interface IPostDocument extends BaseInsertPostType, Document {}
const postsSchema = new Schema<IPostDocument>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
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
