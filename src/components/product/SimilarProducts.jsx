import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import ProductCard from '../home/ProductCard'

const SimilarProducts = ({categoryId, productId}) => {

  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    if(categoryId){
      axiosEcommerce.get(`products?categoryId=${categoryId}`)
      .then((res) => {
        const otherProducts = (res.data.filter(product => product.id !== productId)) 
        setSimilarProducts(otherProducts)
      })
      .catch((err) => console.log(err))
    }
  },[categoryId, productId])

  return (

    <section className='px-2'>

      <h2 className='text-orange-500 font-semibold mb-[6px]'>Discover similar items</h2>

      <section className='grid gap-6 py-2 grid auto-rows-auto grid-cols-[repeat(auto-fill,_290px)] max-w-[1000px] mx-auto'>
        {
          similarProducts.map(similarProduct => <ProductCard key={similarProduct.id} product={similarProduct}/>)
        }
      </section>

    </section>

  )
}

export default SimilarProducts