import { DataApiResponse } from './ApiResponse'
import { MetaData } from './MetaData'

export default interface ReferenceState {
    tableName: string | null
    tableData: DataApiResponse | null
    tableMeta: MetaData | null
}
