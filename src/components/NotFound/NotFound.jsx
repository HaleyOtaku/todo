import './NotFound.css'
import image from '../../assets/images/404.webp'

export default function NotFound() {
  return (
    <div className='notFound'>
      <img src={image}  alt='Resource Not Found'/>
      <h1 className='text-dark'>Resource Not Found</h1>
    </div>
  )
}