import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import SimilarProducts from './SimilarProducts'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProductCart } from '../../store/slices/cart.slice'

const stylePositionImages = {
  '0' : '-ml-[0%]',
  '1' : '-ml-[100%]',
  '2' : '-ml-[200%]'
}

const ProductDetails = ({productId}) => {

  const [productData, setProductData] = useState()
  const [counter, setCounter] = useState(1)
  const [imageToShow, setImageToShow] = useState(0)

  const dispatch = useDispatch()
  
  const handleClickLess = () => {
    const newCounter = counter - 1
    if(newCounter >= 1){
      setCounter(counter - 1)
    }
  }
  const handleClickPlus = () => {
    const newCounter = counter + 1
    setCounter(newCounter)
  }

  const handleClickAddToCart = () => {
    dispatch(addProductCart({quantity: counter, productId: productData.id}))
  }

  const nextImage = () => {
    const newImagePosition = imageToShow + 1
    if(newImagePosition <= 2){
      setImageToShow(newImagePosition)
    } else {
      setImageToShow(0)
    }
  }
  const previousImage = () => {
    const newImagePosition = imageToShow - 1
    if(newImagePosition >= 0){
      setImageToShow(newImagePosition)
    } else {
      setImageToShow(2)
    }
  }

  useEffect(() => {
    axiosEcommerce.get(`products/${productId}`)
    .then((res) => setProductData(res.data))
    .catch((err) => console.log(err))
  },[productId])

  return (
    <>
    <div className='max-w-[1000px] '>
      <section className='flex gap-2 items-center mt-10 ml-[5%]'>
        <Link to='/'>Home</Link>
        <div className='h-[7px] aspect-square bg-red-500 rounded-full'></div>
        <span className='font-semibold'>{productData?.title}</span>
      </section>
    </div>

    <section className='grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto'>

      <section className='overflow-hidden relative'>
        <section className={`flex w-[300%] ${stylePositionImages[imageToShow]} duration-200`}>
          <div className='h-[300px] p-4 w-[calc(100%_/_3)]'>
            <img className='h-full w-full object-contain' src={productData?.images[0].url} alt="" />
          </div>
          <div className='h-[300px] p-4 w-[calc(100%_/_3)]'>
            <img className='h-full w-full object-contain' src={productData?.images[1].url} alt="" />
          </div>
          <div className='h-[300px] p-4 w-[calc(100%_/_3)]'>
            <img className='h-full w-full object-contain sha' src={productData?.images[2].url} alt="" />
          </div>
        </section>
        <i onClick={nextImage} className='bx bx-chevron-right text-[26px] py-[4px] absolute top-1/2 -translate-y-1/2 right-2 border-gray-100 hover:border-[1px] hover:shadow-lg'></i>
        <i onClick={previousImage} className='bx bx-chevron-left text-[26px] py-[4px] absolute top-1/2 -translate-y-1/2 left-2 border-gray-100 hover:border-[1px] hover:shadow-lg'></i>
      </section>

      <section>
      <h4 className='text-gray-400 font-semibold mt-6'>{productData?.brand}</h4>
      <h3 className='font-semibold text-lg ml-2 mt-[5px]'>{productData?.title}</h3>

      <section className='grid grid-cols-2 mt-6'>
        <article>
          <h4 className='text-gray-400 font-semibold'>Price</h4>
          <span className='font-semibold text-lg ml-2 mt-[5px]'>$ {productData?.price}</span>
        </article>
        <article>
          <h4 className='text-gray-400 font-semibold'>Quantity</h4>
          <div>
            <button onClick={handleClickLess} className='border-[1px] p-[1px] px-3 hover:bg-red-500 hover:text-white transition-colors'>-</button>
            <span className='border-[1px] p-[1px] px-4 border-x-0 py-[3px]'>{counter}</span>
            <button onClick={handleClickPlus} className='border-[1px] p-[1px] px-3 hover:bg-red-500 hover:text-white transition-colors'>+</button>
          </div>
        </article>
      </section>

      <button onClick={handleClickAddToCart} className='w-full bg-red-500 py-2 text-white tracking-wide font-medium hover:bg-red-600 transition-colors rounded-sm mt-6'>
        Add to cart <i className='bx bx-cart'></i>
      </button>

      <p className='text-sm my-9'>{productData?.description}</p>
      </section>

    </section>

    <SimilarProducts categoryId={productData?.categoryId} productId={productData?.id}/>
    </>

  )
}

export default ProductDetails