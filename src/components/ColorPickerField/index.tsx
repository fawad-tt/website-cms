'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React from 'react'
import './styles.scss'

export const ColorPickerField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Ensure it starts with # if user is typing a hex color
    if (val && !val.startsWith('#')) {
      setValue(`#${val}`)
    } else {
      setValue(val)
    }
  }

  // Handle label - can be string or i18n object
  const labelText =
    typeof field.label === 'string' ? field.label : field.label?.en || field.name

  // Handle description - can be string or i18n object
  const descriptionText =
    typeof field.admin?.description === 'string'
      ? field.admin.description
      : field.admin?.description?.en

  return (
    <div className="color-picker-field">
      <div className="color-picker-field__label">
        <label htmlFor={path}>{labelText}</label>
      </div>
      <div className="color-picker-field__inputs">
        <input
          type="color"
          id={`${path}-color`}
          value={value || '#000000'}
          onChange={handleColorChange}
          className="color-picker-field__color-input"
        />
        <input
          type="text"
          id={path}
          value={value || ''}
          onChange={handleTextChange}
          placeholder="#000000"
          className="color-picker-field__text-input"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
      {descriptionText && (
        <div className="color-picker-field__description">{descriptionText}</div>
      )}
    </div>
  )
}

export default ColorPickerField
