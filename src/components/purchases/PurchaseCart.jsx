import React from 'react'
import { formatDateDDMMYYYY } from '../../utils/date'

const PurchaseCart = ({purchase}) => {
  
  return (

    <article className='grid grid-cols-2 items-center gap-2 sm:text-base'>

      <section className='flex gap-2 items-center'>
        <div className='h-[50px] sm:h-[80px] aspect-square'>
          <img className='h-full w-full object-contain' loading='lazy' src={purchase.product.images[0].url} alt="" />
        </div>
          <h4>{purchase.product.title}</h4>
      </section>

      <section className='grid text-center gap-3 sm:grid-cols-3'>
        <span className='text-gray-400'>{formatDateDDMMYYYY(purchase.createdAt)}</span>
        <div className='p-2 mx-auto border-[1px] border-gray-400'>
          <span>{purchase.quantity}</span>
        </div>
        <h4 className='font-bold'>$ {(purchase.quantity * purchase.product.price).toFixed(1)}</h4>
      </section>

    </article>

  )
}

export default PurchaseCart