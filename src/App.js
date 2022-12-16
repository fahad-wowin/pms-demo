import React, { Suspense } from "react"

// ** Router Import
import Router from "./router/Router"

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner"

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router />
    </Suspense>
  )
}

export default App
