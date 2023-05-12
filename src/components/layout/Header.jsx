import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {

  const {token} = useSelector(store => store. userInfo)
  const {cartProducts} = useSelector(state => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickChangeShowCart = () => {
    if(!token) return navigate('/login')
    dispatch(changeIsShowCart())
  }

  return (
    
    <section className='grid gap-[30px] sm:gap-12 bg-slate-300'>

      <Link to='/'>
        <h1 className='text-amber-600 font-[Montserrat] font-light text-[40px] p-5 sm:p-8 sm:text-6xl'>e-commerce</h1>
      </Link>

      <nav className='flex justify-evenly mb-2 pb-3 md:pb-4'>
        <Link to='/login'>
        <i className='bx bx-user text-2xl'></i>
        </Link>
        <Link to='/purchases'>
        <i className='bx bx-box text-2xl'></i>
        </Link>
        <div className='relative'>
          <button onClick={handleClickChangeShowCart}>
          <i className='bx bx-cart text-2xl'></i>
          </button>
          <div className={`absolute h-[16px] aspect-square rounded-full bg-red-500 text-white text-[10px] left-[14px] top-0 flex justify-center items-center  ${!cartProducts.length && 'hidden'}`}>{cartProducts.length}</div>
        </div>
      </nav>
    </section>

  )
}

export default Header