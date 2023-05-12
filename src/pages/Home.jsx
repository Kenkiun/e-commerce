import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/home/ProductCard'
import { axiosEcommerce } from '../utils/configAxios'

const Home = () => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [currentCategory, setCurrentCategory] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProductName = e.target.productName.value
    setProductName(newProductName)
  }

  const productsByName = useMemo(() => {
    return products.filter((product) => product.title.toLowerCase().includes(productName.toLowerCase()))
  },[products, productName]) 

  const handleClickCategory = (e) => {
    setCurrentCategory(Number(e.target.dataset.category))
  }

  useEffect(() => {
    axiosEcommerce.get('categories')
    .then((res) => setCategories(res.data))
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    if(currentCategory === 0){
      axiosEcommerce.get('products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
    }
  },[currentCategory])

  useEffect(() => {
    if(currentCategory !== 0 ){
      axiosEcommerce.get(`products?categoryId=${currentCategory}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
    }
  },[currentCategory])

  return (

    <main className='mb-10'>

      <form className='' onSubmit={handleSubmit}>
        <div className='m-3 mt-16 mb-7 flex justify-center gap-2'>
          <input className='outline-none border-b-[1px] rounded-sm border-amber-200 p-[2px]' id='productName' type="text" placeholder='What are you looking for?'/>
          <button className='flex justify-center items-center'><i className='bx bx-search'></i></button>
        </div>
          <ul className='grid auto-rows-auto grid-cols-[repeat(auto-fill,_140px)] max-w-[500px] justify-center mx-auto my-3 text-center gap-1'>
            <li className='cursor-pointer p-[7px] border-[1px] border-dashed border-cyan-900 hover:bg-gray-300' onClick={handleClickCategory} data-category={0}>All</li>
            {
              categories.map(category => (
                <li className='cursor-pointer p-[7px] border-[1px] border-dashed border-cyan-900 hover:bg-gray-300' onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li>)
              )
            }
          </ul>
      </form>
      
      <section className='grid auto-rows-auto grid-cols-[repeat(auto-fill,_290px)] max-w-[1000px] sm:grid-cols-[repeat(auto-fill,_310px)] m-auto justify-center gap-6 py-6'>
        {
          productsByName.map((product) => <ProductCard key={product.id} product={product}/>)
        }
      </section>

    </main>

  )
}

export default Home