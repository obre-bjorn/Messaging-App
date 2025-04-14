import React from 'react'
import { Navigate } from 'react-router'


export function RedirectToChats() {

    

  return (
    <Navigate to="chats"  replace/>
  )
}

export default RedirectToChats