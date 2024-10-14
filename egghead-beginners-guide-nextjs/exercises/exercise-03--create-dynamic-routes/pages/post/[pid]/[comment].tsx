import { useRouter } from 'next/router'

const Comment = () => {
  const router = useRouter()

  console.log(router.query)

  return <p>Hello</p>
}

export default Comment
