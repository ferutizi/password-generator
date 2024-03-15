'use client'

import { ChangeEventHandler, EventHandler, FormEvent, useState } from "react"

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
  const [password, setPassword] = useState<string>('')
  const [sliderValue, setSliderValue] = useState(form.characters)

  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = '!@#$%&*()-_+=[]{};:,.<>?/'

  const handleChange: CheckboxChangeHandler = (e, name) => {
    console.log(e, name)
    setForm({
      ...form,
      [name]: e
    })
  }

  const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value)
    setSliderValue(value)
    setForm({
      ...form,
      characters: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const newPassword = generatePassword(form)
    setPassword(newPassword)
  }

  const generatePassword = (form: PassForm): string => {
    let characters = ''
    let pass = ''
    const length = form.characters

    characters += form.lower ? lowerCase : ''
    characters += form.upper ? upperCase : ''
    characters += form.number ? numbers : ''
    characters += form.specialChar ? special : ''

    for(let i = 1; i <= length; i++) {
      const randomNumber = Math.floor(Math.random() * characters.length)
      pass += characters.charAt(randomNumber)
    }
    return pass
  }

  return [form, password, handleChange, handleSliderChange, sliderValue, handleSubmit] as const
}