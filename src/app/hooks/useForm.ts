'use client'

import { FormEvent, useState } from "react"

type PassForm = {
  characters: number,
  upper: boolean,
  lower: boolean,
  number: boolean,
  specialChar: boolean,
}

type CheckboxChangeHandler = (checked: boolean | string, name: string) => void;

export default function useForm() {
  const initialForm = {
    characters: 8,
    upper: true,
    lower: true,
    number: true,
    specialChar: true,
  }

  const [form, setForm] = useState<PassForm>(initialForm)
  const [sliderValue, setSliderValue] = useState([8])
  const [password, setPassword] = useState<string>('')

  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = '!@#$%&*()-_+=[]{};:,.<>?/'

  const handleChange: CheckboxChangeHandler = (e, name) => {
    setForm({
      ...form,
      [name]: e
    })
  }  

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
  }  

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const newPassword = generatePassword(form, sliderValue)
    setPassword(newPassword)
  }

  const generatePassword = (form: PassForm, length: number[]): string => {
    let characters = ''
    let pass = ''

    characters += form.lower ? lowerCase : ''
    characters += form.upper ? upperCase : ''
    characters += form.number ? numbers : ''
    characters += form.specialChar ? special : ''

    for(let i = 1; i <= length[0]; i++) {
      const randomNumber = Math.floor(Math.random() * characters.length)
      pass += characters.charAt(randomNumber)
    }
    return pass
  }

  return [form, password, sliderValue, handleChange, handleSliderChange, handleSubmit] as const
}