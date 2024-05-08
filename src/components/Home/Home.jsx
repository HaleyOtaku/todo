// import bannerImage from '../../assets/images/react-practice-bg.jpg'
import './Home.css'
import Banner from '../Banner'
import bannerImage from '../../assets/images/react-practice-bg.jpg'

export default function Home() {
  return (
    <section className='home'>
    <Banner heading='Home' image={bannerImage} description='Green Lush Forest' />
    <main>



    </main>
    </section>
  )
}