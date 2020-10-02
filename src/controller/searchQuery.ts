import { SearchResult } from "../model/searchResult";

export const searchQuery = async (query:string)=>{
    try {

        const dbSearchResult = await SearchResult.findOne({query},{result:1,_id:0}); 
            
        if(dbSearchResult){  //Check If query Exist in DB 
          return dbSearchResult.result;
        }
        
        const saveResult = new SearchResult();

        let searchResult = await searchQueryOnGoogle(query);
        
        if(!searchResult){
            console.log("Inside empty search resose")
            return ''
        }
    
        saveResult.query=query.toLowerCase();
        saveResult.result = searchResult
    
        saveResult.save();

        return searchResult;

    } catch (error) {
        console.log("Error in Search Query");
        return ''
    }
}


const searchQueryOnGoogle = (query:string)=>{
    return new Promise((resolve,reject) =>{
        resolve(['test2','test2','test3']);
    });
}