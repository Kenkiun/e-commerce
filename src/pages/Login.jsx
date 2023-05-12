import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginUser, logout } from '../store/slices/userInfo.slice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()

  const {token, user} = useSelector(store => store.userInfo)

  const submit = (data) => {
    dispatch(loginUser(data))
  }
  const handleClikLogout = () => {
    dispatch(logout())
  }

  return (

    <main className='bg-gray-300 grid place-content-center px-2 min-h-screen'>

      {
        token? (
          <section className='bg-white p-4 rounded-sm w-[300px] grid gap-[12px] text-center'><i className='bx bxs-user-circle text-6xl'></i>
          <h3 className='capitalize'>{user?.firstName} {user?.lastName}</h3>
          <button onClick={handleClikLogout} className='bg-red-400 text-white py-1 rounded-sm hover:bg-orange-700 transition-colors w-full'>Logout</button>
          </section> 
        ) : (
          <form onSubmit={handleSubmit(submit)} className='bg-white p-4 rounded-sm max-w-[350px] grid gap-[12px]'>
          <h2 className='text-xl font-medium text-gray-700'>Welcome! Enter your email and password to continue</h2>
          <section className='bg-[#d8f5fd] p-4 rounded-md py-2 mb-2'>
            <h3 className='text-center font-semibold'>Test data</h3>
            <div className='flex gap-2 items-center'>
              <i className='bx bx-envelope text-lg'></i>
              <span>john@gmail.com</span>
            </div>
          <div className='flex gap-2 items-center'>
            <i className='bx bx-lock-alt text-lg'></i>
            <span>john1234</span>
          </div>
          </section>
          <section className='grid gap-[6px] mb-[2px]'>
            <div className='grid'>
              <label htmlFor="email">Email</label>
              <input className='border-[1px] border-gray-300 p-[2px] outline-none' id='email' type="email" {...register("email", {
                required: true
              })}/>
            </div>
            <div className='grid'>
              <label htmlFor="password">Password</label>
              <input className='border-[1px] border-gray-300 p-[2px] outline-none' id='password' type="password" {...register("password", {
                required: true
              })}/>
            </div>
          </section>
          <button className='block w-full mt-2 mb-[6px] py-[5px] bg-orange-600 text-[16px] text-white hover:bg-orange-700 transition-colors rounded-sm'>Login</button>
          <span className='text-sm'>Don't have an account? <Link className='text-cyan-500 font-medium' to='#'>Sign up</Link></span>
        </form>
        )
      }

    </main>

  )
}

export default Login