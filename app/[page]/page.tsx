import type { Metadata } from 'next'

import Prose from '@/components/Prose'
import { getPage } from '@/lib/shopify'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await getPage(params.page)

  if (!page) return notFound()

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article',
    },
  }
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const page = await getPage(params.page)

  if (!page) return notFound()

  return (
    <>
      <h1 className='mb-8 text-5xl font-bold'>{page.title}</h1>
      <Prose className='mb-8' html={page.body as string} />
    </>
  )
}
