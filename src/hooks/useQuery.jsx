import { useLocation } from 'react-router-dom'

function useQuery(param) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  return queryParams.get(param)
}

export default useQuery