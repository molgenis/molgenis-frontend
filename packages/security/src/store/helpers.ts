import { VOGroup } from '@/types/VOGroup'

export const getVOGroupID = (voGroups: VOGroup[] | null, name: string): string => {
  const voGroup = voGroups && voGroups.find(candidate => candidate.name === name)
  if (!voGroup) {
    throw new Error(`VO Group with name ${name} not found`)
  }
  return voGroup.id
}
