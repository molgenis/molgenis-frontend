import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'

export default {
  fetchRefData: async (_ , { refEntityType, value }: { refEntityType: string, value: { id: string }[] | { id: string }}) => {
    const metaData = await metaDataRepository.fetchMetaDataByURL(refEntityType)
    const attributes = metaDataService.getAttributesfromMeta(metaData)
    const idColumn = metaData.idAttribute.name
    const columnSet = new Set([...attributes])

    columnSet.add(idColumn)

    if (metaData.labelAttribute !== undefined) {
      columnSet.add(metaData.labelAttribute.name)
    }

    const rsqlQuery = Array.isArray(value) ? `${idColumn}=in=(${value.map(v => v.id).join(',')})` : `${idColumn}==(${value.id})`

    const data = (await dataRepository.getTableDataWithLabel(
      metaData.id,
      metaData,
      [...columnSet],
      rsqlQuery
    )).items

    return { metaData, data }
  }
}
