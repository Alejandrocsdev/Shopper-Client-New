// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'

const Countdown = ({ initCount = 60, onResend }) => {
  const [count, setCount] = useState(initCount)
  const [counting, setCounting] = useState(true)

  useEffect(() => {
    let timer
    if (counting) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer)
            setCounting(false)
          }
          return prevCount - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [counting])

  const handleResend = () => {
    setCount(initCount)
    setCounting(true)
    if (onResend) {
      onResend()
    }
  }

  return (
    <div className={counting ? S.countdown : S.resend}>
      <span>{counting ? count : '沒有收到驗證碼嗎？'}</span>
      <span onClick={counting ? undefined : handleResend}>
        {counting ? '秒後' : ''}重新傳送
      </span>
    </div>
  )
}

export default Countdown
