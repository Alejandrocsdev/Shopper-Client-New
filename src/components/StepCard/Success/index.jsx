// 模組樣式
import S from './style.module.css'
// 組件
import Icon from '../../Icon'

// 成功頁面: 註冊 / 重設密碼
function Success() {
  return (
    <>
      <div className={S.successIcon}>
        <Icon icon="faCircleCheck" />
      </div>
      <div className={S.cardText}>
        <div className={S.text}>
          您已成功使用{true ? '電話號碼' : 'Email'}{' '}
          <span className={S.method}>{true ? 'phone' : 'email'}</span>
          <div>{true ? '建立瞎皮爾購物帳號' : '重設密碼'}</div>
        </div>
        <div className={S.text}>
          您將在 <span className={S.count}>{'count'}</span> 秒內回到
          {true ? '瞎皮爾購物' : '登入頁面'}
        </div>
      </div>
      <div className={S.submit}>
        {true ? '回到瞎皮爾購物' : '回到登入頁面'}
      </div>
    </>
  )
}

export default Success
