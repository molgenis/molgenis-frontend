import { Attribute } from '@/types/MetaData'

export const getCategoricals = (attributes: Attribute[]) => attributes.filter(attribute => attribute.type.includes('categorical'))
