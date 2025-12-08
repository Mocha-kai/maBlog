import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface BaseInsertStackType  {
    stack: string;
    color: string;
    slug: string;
}

//======================================================================
// insert 영역
//======================================================================
export interface IStackDocument extends BaseInsertStackType, Document {}
const stackSchema = new Schema<IStackDocument>(
    {
        stack: { type: String, required: true, trim: true },
        color: { type: String, required: true, },
        slug: { type: String, required: true, unique: true },
    },
    {
        versionKey: false,
    }
);

const ModelStacksSetting = mongoose.models.stacks || model<IStackDocument>('stacks', stackSchema);
export default ModelStacksSetting;