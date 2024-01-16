import React from 'react'

interface IProps{
  action:()=> void
  textButton:string
  children: React.ReactNode

}

export default function ButtonTextIcon({ action, textButton, 
  children}:IProps) {
  return (
    <button className="button-add" onClick={action}>
    <span className="font-bold mr-1">הוסף {textButton}</span>
    {children}
  </button>
  )
}
