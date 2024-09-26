import { FaInstagram } from 'react-icons/fa'
import { BsSubstack } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className='container mx-auto p-6 md:p-12 flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <a href='https://www.instagram.com/vintageforyall' target='_blank'>
          <FaInstagram className='text-3xl text-dark-magenta' />
        </a>
        <a href='https://vintageforyall.substack.com' target='_blank'>
          <BsSubstack className='text-3xl text-dark-magenta' />
        </a>
      </div>
      {/* <p className='text-sm text-center'>
            &copy; {new Date().getFullYear()} Vintage for Y'all
        </p> */}
    </footer>
  )
}
