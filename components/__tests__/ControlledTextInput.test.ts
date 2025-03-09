import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ControlledTextInput from '../ControlledTextInput.vue'

describe('ControlledTextInput', () => {
  it('renders label and input correctly', () => {
    render(ControlledTextInput, {
      props: {
        name: 'test-input',
        label: 'Test Label',
        placeholder: 'Enter text',
      },
    })

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('displays error message when invalid', () => {
    render(ControlledTextInput, {
      props: {
        name: 'test-input',
        label: 'Test Label',
        invalid: true,
        errorMessage: 'This field is required',
      },
    })

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })
})
