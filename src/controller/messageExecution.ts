import { getHistory } from './history';
import { searchQuery } from './searchQuery';
import { History } from "../model/history";

export const executeMessage = async(msg:any) => {
    try {
        
        if (msg.content === 'hi') {
            msg.channel.send('hey');
          } else if (msg.content.startsWith('!google')) {
      
            const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();

            if(!searchText){
                return ;
            }
            const user:string = 'testing'

            const userQuery = await History.findOneAndUpdate({query:searchText,user},{$set:{"updatedAt":new Date()}},{useFindAndModify: false})

            if(!userQuery){
                const saveHistory = new History();
                saveHistory.query=searchText;
                saveHistory.user=user;
                saveHistory.save();
            }

            const searchResponse = await searchQuery(searchText);

            if(!searchResponse || searchResponse==''){
                return ;
              }

            msg.channel.send(searchResponse);
      
          }
          else if (msg.content.startsWith('!recent')){
             const historyData = await getHistory(msg);
             if(!historyData || historyData==''){
                 console.log("History is ",historyData)
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

