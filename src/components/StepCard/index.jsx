// 模組樣式
import S from './style.module.css'
// 組件 (component)
import Icon from '../Icon'
import StepsView from './StepsView'
// 自訂函式
import { useAuthStep } from '../../context/AuthStepContext'

function StepCard({ back, steps, name, children }) {
  const { previous } = useAuthStep()

  return (
    <div className={S.main}>
      {steps && <StepsView />}
      <div className={S.card}>
        <div className={S.cardHeader}>
          {back && (
            <div className={S.back} onClick={() => previous(back)}>
              <Icon icon="faArrowLeftLong" />
            </div>
          )}
          <div className={S.cardName}>{name}</div>
        </div>
        <div className={S.cardMain}>{children}</div>
      </div>
    </div>
  )
}

export default StepCard
