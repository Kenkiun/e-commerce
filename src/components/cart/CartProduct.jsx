import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductCart } from '../../store/slices/cart.slice'

const CartProduct = ({product}) => {

  const dispatch = useDispatch()

  const handleClickDelete = () => {
    dispatch(deleteProductCart(product.id))
  }

  return (

    <article>
      <section className='grid grid-cols-[auto_1fr_auto] gap-1'>
        <div className='h-[90px] aspect-square row-span-2 p-2'>
          <img className='w-full h-full object-contain' src={product.product.images[2].url} alt="" />
        </div>
        <h4>{product.product.title}</h4>
        <i onClick={handleClickDelete} className='bx bx-trash text-red-500 cursor-pointer'></i>
        <div>
          <span className='border-[1px] p-[1px] px-3 border-1 py-[3px]'>{product.quantity}</span>
        </div>
      </section>
      <h4 className='mt-2 text-end'>Total: <span className='font-semibold'>{product.quantity * product.product.price}</span></h4>
    </article>

  )
}

export default CartProduct