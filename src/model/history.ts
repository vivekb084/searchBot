import { Document, Model, model, Schema } from 'mongoose'
import { schemaNames } from '../config'
import { history } from '../interfaces'

export interface historyModel extends history,Document{

}

export const historySchema: Schema = new Schema({
    query: {
        type:String,
        required:true,
        trim: true ,
        lowercase:true
    },
    user: {
        type:String,
        required:true,
        trim: true ,
    },
}, { timestamps: true })

  
export const History: Model<historyModel> = model<historyModel>(schemaNames.HISTORY,historySchema)
  