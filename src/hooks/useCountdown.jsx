// 函式庫 (library)
import { useState, useEffect } from 'react'

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    let timer
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    } else if (count === 0) {
      if (onFinish) {
        onFinish()
      }
      setIsCounting(false)
    }

    return () => clearInterval(timer)
  }, [isCounting, count, onFinish])

  const startCountdown = () => {
    setCount(initialCount)
    setIsCounting(true)
  }

  const stopCountdown = () => {
    setIsCounting(false)
  }

  const resetCountdown = () => {
    setCount(initialCount)
    setIsCounting(false)
  }

  return { count, isCounting, startCountdown, stopCountdown, resetCountdown }
}

export default useCountdown
