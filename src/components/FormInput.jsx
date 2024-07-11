import React from 'react'

function FormInput({ name, label, type, placeholder, min, max, value, status}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text capitalize font-bold">{label}</span>
      </div>
      <input
      
        type={type}
        placeholder={placeholder}
        name={name}
        min={min}
        max={max}
        value={value}
        className={`input input-bordered w-full max-w-xs ${status}`}
         />
    </label>
  )
}

export default FormInput
