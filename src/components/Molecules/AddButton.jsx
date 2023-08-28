import React from 'react'
import Button from '../Atom/Button'

function AddButton({label,onClickButton}) {
  const handleOnClickButton = () =>{
    onClickButton()
  }
  return (
    <>
   <Button onClickBtn={handleOnClickButton}>
   <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
        </svg>
        &nbsp;
          {label}
   </Button>
    </>
  )
}

export default AddButton