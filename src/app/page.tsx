'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useForm from './hooks/useForm'
import { useEffect, useState } from 'react'

export default function Home() {
  const [form, password, sliderValue, handleChange, handleSliderChange, handleSubmit] = useForm()
  const [copied, setCopied] = useState<boolean>(false)

  const labelStyle = 'flex flex-row-reverse items-center gap-4 justify-end'

  useEffect(() => {
    setCopied(false)
  }, [password])

  return (
    <main className='flex h-screen flex-col items-center justify-center p-24'>
      <Card className='flex flex-col gap-4 w-96 p-4 bg-zinc-900 shadow-lg'>
        <div className='flex justify-between items-center bg-black ps-4 rounded-lg'>
          <p>{password}</p>
          <CopyToClipboard text={password}>
            <Button
              disabled={password === ''}
              onClick={() => setCopied(true)}
              type='button'
              className='min-w-24'
            >
              {copied ? '¡copiado!' : 'copiar'}
            </Button>
          </CopyToClipboard>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label className='flex flex-col gap-4 mb-4'>
            <p className='flex justify-between items-center'>Caracteres<span>{sliderValue}</span></p>
            <Slider
              name='characters'
              value={sliderValue}
              onValueChange={handleSliderChange}
              defaultValue={[8]}
              min={6}
              max={22}
              step={1}
            />
          </label>
          <label className={labelStyle}>
            Mayúsculas
            <Checkbox name='upper' checked={form.upper} onCheckedChange={(value) => handleChange(value, 'upper')} />
          </label>
          <label className={labelStyle}>
            Minúsculas
            <Checkbox name='lower' checked={form.lower} onCheckedChange={(value) => handleChange(value, 'lower')} />
          </label>
          <label className={labelStyle}>
            Números
            <Checkbox name='number' checked={form.number} onCheckedChange={(value) => handleChange(value, 'number')} />
          </label>
          <label className={labelStyle}>
            Caracteres especiales
            <Checkbox name='specialChar' checked={form.specialChar} onCheckedChange={(value) => handleChange(value, 'specialChar')} />
          </label>
          <Button type='submit' className='mt-4'>Generar</Button>
        </form>
      </Card>
    </main>
  );
}
