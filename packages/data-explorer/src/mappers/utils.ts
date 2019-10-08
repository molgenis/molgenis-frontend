import { MetaDataAttribute } from '@/types/ApiResponse'

export const getCategoricals = (attributes: MetaDataAttribute[]): MetaDataAttribute[] => attributes.filter(item => item.fieldType.includes('CATEGORICAL'))
