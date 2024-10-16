// 函式庫 (library)
import { useState, useEffect, useRef } from 'react'

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount)
  const [isCounting, setIsCounting] = useState(false)
  const isFinished = useRef(false)

  useEffect(() => {
    let timer
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    } else if (count === 0 && !isFinished.current) {
      if (onFinish) {
        onFinish()
      }
      setIsCounting(false)
      isFinished.current = true
    }

    return () => clearInterval(timer)
  }, [isCounting, count, onFinish])

  const startCountdown = () => {
    setCount(initialCount)
    setIsCounting(true)
    isFinished.current = false
  }

  // const stopCountdown = () => {
  //   setIsCounting(false)
  // }

  // const resetCountdown = () => {
  //   setCount(initialCount)
  //   setIsCounting(false)
  //   isFinished.current = false
  // }

  return { count, isCounting, startCountdown, 
    // stopCountdown, 
    // resetCountdown 
  }
}

export default useCountdown
