import { MetaDataApiResponse, MetaDataAttribute } from '@/types/ApiResponse'
import { FilterDefinition } from '@/types/ApplicationState'

export const getCategoricals = (metaData: MetaDataApiResponse): MetaDataAttribute[] => metaData.attributes.filter(item => item.fieldType.includes('CATEGORICAL'))
}