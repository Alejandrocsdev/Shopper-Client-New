import { useEffect, useRef } from 'react'

const useTracker = (componentName) => {
  const renderCount = useRef(1)

  useEffect(() => {
    console.log(`%c${componentName}: %c${renderCount.current}`, 'color: red', 'color: yellow')
    renderCount.current += 1
  })
}

export default useTracker
