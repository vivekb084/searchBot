import { SearchResult } from "../model/searchResult";
import axios from 'axios'
import { envVariable } from '../config/envVariable'
import { SERP_URL } from '../constants/apiUrl'


/**
 * Get Top 5 google search results if not found query in db
 * @param {string} query Query to be searched.
 * return string Array
 */

export const searchQuery = async (query:string)=>{
    try {

        const dbSearchResult = await SearchResult.findOne({query},{result:1,_id:0}); 
            
        if(dbSearchResult){  //Check If query Exist in DB 
          return dbSearchResult.result;
        }
        
        const saveResult = new SearchResult();

        let searchResult = await searchQueryOnGoogle(query);
        
        if(!searchResult){
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


/**
 * Get Top 5 google search results if not found query in db
 * @param {string} query Query to be searched.
 * return string Array
 */

const searchQueryOnGoogle = (query:string)=>{
    return new Promise((resolve,reject) =>{
        const params = {
            access_key: envVariable.SERP_API_KEY,
            query
        }
        let resultArray = []
        axios.get(SERP_URL, {params})
        .then(response => {
            const apiResponse = response.data;
            for(let i=0;i<apiResponse.organic_results.length && i<5;i++){
                let resultString = apiResponse.organic_results[i].title + ' : '+ apiResponse.organic_results[i].url;
                resultArray.push(resultString)
            }
            resolve(resultArray)
        }).catch(error => {
            console.log(error);
            reject(error)
        });
    });
}