// 模組樣式
import S from './style.module.css'

const Loading = () => {
  return (
    <div className={S.loadingContainer}>
      <div className={S.spinner}></div>
    </div>
  )
}

export default Loading
