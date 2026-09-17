import type * as React from 'react'

interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className='container mx-auto px-6 md:px-12'>{children}</div>
}
