import { FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <a href='https://www.instagram.com/vintageforyall'>
          <FaInstagram className='text-3xl text-light-pink hover:text-light-pink' />
        </a>
        <a href='https://www.linkedin.com/in/ariel-k-3a39471ab/'>
          <FaLinkedin className='text-3xl text-light-pink hover:text-light-pink' />
        </a>
      </div>
      {/* <p className='text-sm text-center'>
            &copy; {new Date().getFullYear()} Vintage for Y'all
        </p> */}
    </footer>
  )
}
