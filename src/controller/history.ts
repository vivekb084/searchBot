import { History } from "../model/history";


/**
 * Get All previous query by user matching current query
 * @param {Object} message Query to be searched.
 * return string Array
 */

export const getHistory = (message:any)=>{
    return new Promise((resolve,reject) =>{
        try {
            let historyArray = []
            const query = (message.content.replace("!recent", "")).trim().toLowerCase(); // tokenize and trim search string
            const regexQuery:string =  '.*'+query+'.*' 
            const user:string = message.author.id  //To get user specific history

            History.find({query:new RegExp('^'+regexQuery+'$', "i"),user}).sort({updatedAt:-1}).then(result=>{  //Get user specific history with case insensitive matching query
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