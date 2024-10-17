import ReactDOM from 'react-dom/client'
// import { Suspense } from 'react'
import App from './App.jsx'

// const loadingMarkup = (
//   <div>
//     <h2>Loading...</h2>
//   </div>
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Suspense fallback={loadingMarkup}>
    <App />
  // </Suspense>
)
