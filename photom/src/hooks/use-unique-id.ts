import { useMemo } from 'react'

let idCounter = 0

/**
 * Creates a unique id. It's useful when is writing a wrapper to work with a non-react component
 * Check this example: https://github.com/OrigamiTeam/front-backoffice/blob/7173275489860a4feaec92c17e8e776c0c23dc48/photon/src/fragments/gauge.tsx#L41
 * @param prefix A unique string
 * @returns A string with the prefix plus a unique number
 */
const useUniqueId = (prefix: string): string => {
  const id = useMemo(() => idCounter++, [prefix])
  return `${prefix}${id}`
}

export default useUniqueId
