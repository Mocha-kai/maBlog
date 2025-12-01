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

    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        return false; // DB 접근 없이 빈 배열 반환
    }

    await ConnectMongoDB();

    try {
        const result = await GetDataTypeSetting.create(formData);;
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}