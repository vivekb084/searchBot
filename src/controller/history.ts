import { History } from "../model/history";

export const getHistory = (message:any)=>{
    return new Promise((resolve,reject) =>{
        try {
            let historyArray = []
            const query = (message.content.replace("!recent", "")).trim().toLowerCase();
            const regexQuery:string =  '.*'+query+'.*' 

            History.find({query:new RegExp('^'+regexQuery+'$', "i")}).sort({updatedAt:-1}).then(result=>{
                for(let i=0;i<result.length;i++){
                    historyArray.push(result[i].query)
                }
                resolve(historyArray)
            })
        } catch (error) {
            console.log("Error in fetching Histrory")
            reject(error)
        }
    });
};