import React from 'react'

export const CartContext = React.createContext({

    items:[],
    totalAmount:0,
    additem:()=>{},
    removeitem:()=>{},
    clear:()=>{}
})



