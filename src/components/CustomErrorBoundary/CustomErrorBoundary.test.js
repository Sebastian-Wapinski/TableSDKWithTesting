import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomErrorBoundary from './CustomErrorBoundary'
import { useErrorBoundary } from 'react-error-boundary'

jest.mock('react-error-boundary', () => {
  return {
    useErrorBoundary: jest.fn()
  }
})

describe('CustomErrorBoundary', () => {
  it('should show error boundary message', async () => {
    const error = new Error('Error message')

    const resetBoundary = jest.fn()
    useErrorBoundary.mockReturnValue({ resetBoundary })

    render(<CustomErrorBoundary error={error} />)

    const errorMessage = screen.getByText('Something went wrong. Error Message:')
    const errorText = screen.getByText('Error message')
    const refreshButton = screen.getByText('REFRESH')

    expect(errorMessage).toBeInTheDocument()
    expect(errorText).toBeInTheDocument()
    expect(refreshButton).toBeInTheDocument()
  })
})
