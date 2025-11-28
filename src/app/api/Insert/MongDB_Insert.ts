
import { BaseInsertType } from "@/app/component/common/writeComponent";
import { ConnectMongoDB } from "../ConnectMongoDB";
import GetDataTypeSetting, { IPostData } from "../models/mDBTypeSetting";

export async function InsertPostData(formData :BaseInsertType):Promise<boolean>{
    console.log('formData', formData);
    await ConnectMongoDB();

    try {
        const result = await GetDataTypeSetting.create(formData);;
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}