import { useState } from 'react'

/**
 * Hook to helper to handle loading states on promises. It's useful, for example, when working with LoadingButton.
 * See an instance here: https://github.com/OrigamiTeam/SmartFlow_BackOffice/blob/dd213d461bd86366109fca16ea107eba296829fb/smartring-front/src/containers/edit-gateway-card/content.tsx
 * @returns Return an array with two elements
 * The second one should wrapper a promise function, and when the promise is pending the first one will be "true", otherwise will be "false"
 */
const useSemaphore = () => {
  const [isWaiting, setIsWaiting] = useState(false)

  const waitToFinish = async <T>(loaderFunc: () => Promise<T>) => {
    setIsWaiting(true)
    const result = await loaderFunc()
    setIsWaiting(false)

    return result
  }

  return [isWaiting, waitToFinish] as [boolean, typeof waitToFinish]
}

export default useSemaphore
