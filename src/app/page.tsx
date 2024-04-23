import Link from 'next/link'

const Home = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/form">Create Form</Link>
        </li>
        <li>
          <Link href="/form/edit">Edit Form</Link>
        </li>
      </ul>
    </>
  )
}

export default Home
