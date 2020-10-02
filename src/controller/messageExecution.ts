import { searchQuery } from './searchQuery';
import { SearchResult } from '../model/searchResult'

export const executeMessage = async(msg:any) => {
    try {
        if (msg.content === 'hi') {
            msg.channel.send('hey');
          } else if (msg.content.startsWith('!google')) {
      
            const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();
            const dbSearchResult = await SearchResult.findOne({query:searchText},{result:1,_id:0}); 
      
            //Check If query Exist in DB      
      
            if(dbSearchResult){ 
              msg.channel.send(dbSearchResult.result);
              return ;
            }
            let searchResponse =  await searchQuery(searchText);
            if(!searchResponse){
              return ;
            }
            const saveResult = new SearchResult();
      
            saveResult.query=searchText.toLowerCase();
            saveResult.result = searchResponse
      
            saveResult.save();
            msg.channel.send(searchResponse);
      
          }
    } catch (error) {
        console.log("Error in Executing Message")
    }
   
}

export const printMessage = ()=>{
    try {
        console.info("Bot Connected Successfully");
    } catch (error) {
        console.info("Error in print Message");
    }
}

