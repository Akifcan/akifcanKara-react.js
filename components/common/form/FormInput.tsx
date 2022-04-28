import { FC, useEffect, useRef, useState } from 'react'

interface FormInputProps {
  isRequired: boolean,
  errorMessage?: string,
  children: JSX.Element
}

const FormInput: FC<FormInputProps> = ({ children, isRequired, errorMessage }) => {

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    const base = inputRef.current!
    let input: HTMLElement | undefined
    if (base.querySelector('input')) {
      input = base.querySelector('input')!
    }
    if (base.querySelector('select')) {
      input = base.querySelector('select')!
    }
    if (base.querySelector('textarea')) {
      input = base.querySelector('textarea')!
    }
    if (input) {
      input.classList.add('form-validation-input')
      if (isRequired) {
        input.setAttribute('required', 'true')
        base.setAttribute('is-valid', 'no')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const base = inputRef.current
    if (!base) return
    const child = base?.querySelector('.form-validation-input') as any
    if (!child) return
    if (errorMessage) {
      base.setAttribute('is-valid', 'no')
    } else {
      base.setAttribute('is-valid', 'yes')
    }
    if (isRequired && child.value.trim().length === 0) {
      base.setAttribute('is-valid', 'no')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage])

  return <div className='md:w-1/3 w-full' ref={inputRef}>
    {children}
    {errorMessage && (
      <p data-testid="error-message" className='my-2 px-4 font-semibold text-red-700'>{errorMessage}</p>
    )}
  </div>
}

export default FormInput