import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsShowCart, getCartProducts, purchaseCart } from '../../store/slices/cart.slice'
import CartProduct from './CartProduct'

const Cart = () => {

  const {isShowCart, cartProducts} = useSelector(store => store.cart)
  const {token} = useSelector(store => store.userInfo)
  const dispatch = useDispatch()

  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart())
  }

  const totalPrice = cartProducts.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0)

  const handleClickCheckout = () => {
    dispatch(purchaseCart())
  }

  useEffect(() => {
    if(isShowCart){
      dispatch(getCartProducts())
    }
  },[isShowCart])

  return (
    
    <section className={`fixed top-0  bg-white shadow-xl h-screen w-[300px] ${isShowCart && token? 'right-0' : '-right-full'} duration-100 p-3 grid gap-11 grid-rows-[auto_1fr_auto]`}>
      <h2 className='text-lg font-bold mt-5'>Shopping cart</h2>
      <i onClick={handleClickChangeShowCart} className='bx bx-x absolute top-[15px] right-5 text-[23px] hover:text-red-500 cursor-pointer'></i>

      <section className='overflow-y-auto grid gap-10 py-4 content-start'>
        {
          cartProducts.map(product => <CartProduct key={product.id} product={product}/>)
        }
      </section>
      <section className='grid grid-cols-2 py-10 border-t-[1px] border-gray-400'>
        <span>Total</span>
        <h4 className='text-end'>{totalPrice}</h4>
        <button onClick={handleClickCheckout} className='w-full col-span-2 bg-red-500 py-2 text-white font-medium hover:bg-red-600 transition-colors rounded-sm mt-6'>Checkout</button>
      </section>

    </section>
  )
}                                              

export default Cart                               