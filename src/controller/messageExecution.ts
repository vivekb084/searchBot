import { searchQuery } from './searchQuery';

export const executeMessage = async(msg:any) => {
    try {
        if (msg.content === 'hi') {
            msg.channel.send('hey');
          } else if (msg.content.startsWith('!google')) {
      
            const searchText = (msg.content.replace("!google", "")).trim().toLowerCase();

            if(!searchText){
                return ;
            }

            const searchResponse = await searchQuery(searchText);

            if(!searchResponse || searchResponse==''){
                return ;
              }

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

