// wraping the name in brackets is how you create dynamic pages
import { useRouter } from 'next/router'

const Genre = () => {
  const router = useRouter() //to obtain the router
  const { genre } = router.query

  return <h1>{genre}</h1>
}

export default Genre
