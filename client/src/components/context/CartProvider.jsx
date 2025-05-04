import { useEffect } from 'react';
import {createContext, useContext, useState} from 'react';

const CartContext = createContext({})

export const useCart = ()=>{
    return useContext(CartContext)
}

export const CartProvider = ({children})=>{
    const [cartItems, setCartItems] = useState(()=>{
        const saved = localStorage.getItem("cartItems");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    })

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const emptyCart = () => {
      setCartItems([])
    }

    const handleCartItems = (instrumentObjWithDates)=>{
        console.log('added', instrumentObjWithDates)
    
        const itemsToAdd = cartItems.find((item)=>{
          return item.id === instrumentObjWithDates.id
        })
    
        if(itemsToAdd === undefined || itemsToAdd === null){
          setCartItems([...cartItems, instrumentObjWithDates])} else {
            console.log('this item is already in your cart')
          }
      }
    
      const handleRemoveCartItems = (obj)=>{
        const updatedItemsAfterDelete = cartItems.filter((item)=>{
          return item.id !== obj.id
        })
        setCartItems(updatedItemsAfterDelete)
      }

    return (
        <CartContext.Provider value={{cartItems, emptyCart, handleCartItems, handleRemoveCartItems}}>
            {children}
        </CartContext.Provider>
    )
}