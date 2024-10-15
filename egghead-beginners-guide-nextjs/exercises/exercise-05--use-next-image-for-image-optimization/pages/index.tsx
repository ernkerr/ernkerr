// ✍️ import the Image component from 'next/image'
import Image from 'next/image'

// ✍️ import "lazar.png" statically
import lazar from '../lazar.png'

const Home = () => {
  return <Image src={lazar} alt="Lazar Nikolov" />
  /* ✍️ add the lazar image here */
}

export default Home
