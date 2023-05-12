import { Link, useParams } from 'react-router-dom'
import ProductDetails from '../components/product/ProductDetails'

const Product = () => {

  const {id} = useParams()

  return (

    <main className='px-2'>

      <section>
        <ProductDetails productId={id}/>
      </section>

    </main>

  )
}

export default Product