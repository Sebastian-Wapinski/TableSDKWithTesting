import React from 'react'
import CreateTable from './components/CreateTable/CreateTable'
import { ErrorBoundary } from 'react-error-boundary'
import CustomErrorBoundary from './components/CustomErrorBoundary/CustomErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
      <CreateTable />
    </ErrorBoundary>
  )
}

export default App
