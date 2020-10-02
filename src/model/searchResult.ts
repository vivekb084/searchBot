import { Document, Model, model, Schema } from 'mongoose'
import { schemaNames } from '../config'
import { searchResult } from '../interfaces'

export interface searchResultModel extends searchResult,Document{

}

export const searchResultSchema: Schema = new Schema({
    query: {
        type:String,
        required:true,
        trim: true ,
        index:true,
        unique:true,
        lowercase:true
    },
    result:[]
}, { timestamps: true })

  
export const SearchResult: Model<searchResultModel> = model<searchResultModel>(schemaNames.SEARCH_RESULT,searchResultSchema)
  