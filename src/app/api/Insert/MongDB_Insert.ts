import { ConnectMongoDB } from "../ConnectMongoDB";
import GetDataTypeSetting, { IPostData } from "../models/mDBTypeSetting";

export type BaseInsertType = {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
};

const CATEGORIES = ['study', 'career', 'hobby', 'record'];
const MONGO_URI = process.env.MONGO_URI;
export async function InsertPostData(formData :BaseInsertType):Promise<boolean>{

    await ConnectMongoDB();

    try {
        const result = await GetDataTypeSetting.create(formData);;
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}