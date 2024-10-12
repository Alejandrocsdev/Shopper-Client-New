// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect, useRef } from 'react'
// 自訂函式
import useCountdown from '../../../hooks/useCountdown'
// 組件
import Icon from '../../Icon'

// 成功頁面: 註冊 / 重設密碼
function Success() {
  const handleSubmit = () => {
    console.log('Countdown finished, navigating to another page...')
    // Here you can implement navigation logic (e.g., navigate('/profile') if using React Router)
    // or perform any other action like redirecting to another page
  }

  // Using useCountdown hook, starts from 10 seconds and triggers handleSubmit when finished
  const { count, isCounting, startCountdown } = useCountdown(10, handleSubmit)

  // Start the countdown on mount
  useEffect(() => {
    startCountdown() // Start countdown when component mounts
  }, []) // Empty dependency array ensures it runs only on mount

  return (
    <>
      <div className={S.successIcon}>
        <Icon icon="faCircleCheck" />
      </div>
      <div className={S.cardText}>
        <div className={S.text}>
          <span>您已成功使用{true ? '電話號碼' : 'Email'} </span>
          <span className={S.method}>{true ? 'phone' : 'email'}</span>
          <div>{true ? '建立瞎皮爾購物帳號' : '重設密碼'}</div>
        </div>
        <div className={S.text}>
          <span>您將在 </span>
          <span className={S.count}>{count}</span>
          <span> 秒內回到{true ? '瞎皮爾購物' : '登入頁面'}</span>
          
        </div>
      </div>
      <div className={S.submit}>{true ? '回到瞎皮爾購物' : '回到登入頁面'}</div>
    </>
  )
}

export default Success
