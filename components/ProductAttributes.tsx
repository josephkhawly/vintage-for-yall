import type { ProductColor } from '@/lib/shopify/category-attributes'

interface ProductAttributesProps {
  colors: ProductColor[]
  sizes: string[]
}

export function ProductAttributes({ colors, sizes }: ProductAttributesProps) {
  if (colors.length === 0 && sizes.length === 0) return null

  return (
    <div className='text-espresso mb-6 flex flex-col gap-3 text-sm lg:text-base'>
      {colors.map((color) => (
        <div className='flex items-center gap-3' key={color.label}>
          <span
            aria-hidden
            className='border-espresso/50 size-5 shrink-0 rounded-full border'
            style={color.hex ? { backgroundColor: color.hex } : undefined}
          />
          <span>{color.label}</span>
        </div>
      ))}
      {sizes.map((size) => (
        <div className='flex items-center gap-3' key={size}>
          <span>Size</span>
          <span className='border-espresso flex min-h-10 min-w-10 items-center justify-center border px-2'>
            {size}
          </span>
        </div>
      ))}
    </div>
  )
}
