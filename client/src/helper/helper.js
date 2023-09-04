import axios from 'axios'

export async function GetServerData(url,callback){
    const data=await (await axios.get(url)).data;
    return callback ? callback(data):data;
}

export async function PostServerData(url,result,callback){
    const data=await (await axios.post(url,result))?.data;
    return callback ? callback(data):data;
}