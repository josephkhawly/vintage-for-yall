'use client'

import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

const ANNOUNCEMENT_TEXT = 'Relik Vintage Fest Feb 27, 2027 Ridgefield, WA'

export function AnnouncementBar() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    function sync() {
      setReduceMotion(media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <div
      aria-label='Announcement'
      className='w-full bg-espresso text-white'
      role='region'
    >
      {reduceMotion ? (
        <p className='px-4 py-2 text-center font-subheading text-xs tracking-wide md:text-sm'>
          {ANNOUNCEMENT_TEXT}
        </p>
      ) : (
        <Marquee autoFill pauseOnHover speed={35}>
          <span className='mx-8 inline-block py-2 font-subheading text-xs tracking-wide md:text-sm'>
            {ANNOUNCEMENT_TEXT}
          </span>
        </Marquee>
      )}
    </div>
  )
}
