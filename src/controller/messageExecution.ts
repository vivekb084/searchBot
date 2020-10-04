import { getHistory } from './history';
import { searchQuery } from './searchQuery';
import { History } from "../model/history";


/**
 * Reply query
 * 1. Reply hey to hi
 * 2. search top 5 google result if query starts with !google
 * 3. Get user search history of matching query if query starts with !recent
 * @param {Object} message Query to be searched.
 */


export const executeMessage = async(msg:any) => {
    try {
        if (msg.content.toLowerCase() === 'hi') {
            msg.channel.send('hey');
          } else if (msg.content.startsWith('!google')) {
      
            const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();

            if(!searchText){
                return ;
            }
            const user:string = msg.author.id

            const userQuery = await History.findOneAndUpdate({query:searchText,user},{$set:{"updatedAt":new Date()}},{useFindAndModify: false}) //Check if user previously search for same query if yes update query timestamp

            if(!userQuery){ //if user not seach for same query store query in history
                const saveHistory = new History();
                saveHistory.query=searchText;
                saveHistory.user=user;
                saveHistory.save();
            }

            const searchResponse = await searchQuery(searchText);  //Get google search result of query

            if(!searchResponse || searchResponse==''){
                return ;
              }

            msg.channel.send(searchResponse);
      
          }
          else if (msg.content.startsWith('!recent')){
             const historyData = await getHistory(msg); //Get User Specific history that match query string
             if(!historyData || historyData==''){
                 return ;
             }
             msg.channel.send(historyData);
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

