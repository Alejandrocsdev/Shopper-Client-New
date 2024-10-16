// 模組樣式
import S from './style.module.css'
// 函式庫 (libraryu)
import { useNavigate } from 'react-router-dom'
// 自訂函式 (custom function)
import { autoSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
// 圖檔
import avatarPng from '../../../assets/img/avatar/avatar.png'

function Step4({ name }) {
  const navigate = useNavigate()
  const { user, next } = useAuthStep()
  const { id, username, avatar, phone } = user

  // 處理表單提交事件
  const handleAutoSignIn = async () => {
    try {
      const response = await autoSignIn(id)
      console.log('Response:', response.message)
      console.log('Access Token:', response.accessToken)
      navigate('/')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <StepCard name={name}>
      <div className={S.avatarContainer}>
        <img className={S.avatar} src={avatar || avatarPng} />
      </div>
      <div className={S.username}>{username}</div>
      <div className={S.phone}>{phone}</div>
      <div className={S.text}>資料已被此帳號使用，若此帳號屬於您，請點選「是，前往登入」。</div>
      {/* 登入 */}
      <div className={S.submit} onClick={handleAutoSignIn}>
        是，前往登入
      </div>
      {/* 返回註冊 */}
      <div className={S.back} onClick={() => next(0)}>
        否，返回註冊頁面
      </div>
    </StepCard>
  )
}

export default Step4
