import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosEcommerce, getConfig } from "../utils/configAxios"
import PurchaseCart from "../components/purchases/PurchaseCart"

const Purchases = () => {

  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    axiosEcommerce.get('purchases', getConfig())
    .then((res) => {
      const orderPurchases = res.data.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setPurchases(orderPurchases)
    })
    .catch((err) => console.log(err))
  },[])

  return (

    <main className="px-2 max-w-[1000px] mx-auto">

      <section className='flex gap-2 items-center mt-[60px] mb-6 mx-[4%] pt-10'>
        <Link to='/'>Home</Link>
        <div className='h-[7px] aspect-square bg-red-500 rounded-full'></div>
        <span className='font-medium'>Purchases</span>
      </section>

      <section className="grid gap-16 py-6 max-w-[550px] mx-auto">
        {
          purchases.map(purchase => <PurchaseCart key={purchase.id} purchase={purchase}/>)
        }
      </section>

    </main>
    
  )
}

export default Purchases