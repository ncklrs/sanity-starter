import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'

interface PortableTextProps {
  value: any
}

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const alignment = (value.alignment as 'left' | 'center' | 'right') || 'center'
      const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      }
      
      return (
        <figure className={`my-8 ${alignmentClasses[alignment]}`}>
          <div className={`relative w-full h-64 md:h-96 ${alignment === 'center' ? 'mx-auto' : ''}`}>
            <Image
              src={value.asset.url}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          {value.filename && (
            <div className="text-sm text-gray-400 mb-2 border-b border-gray-700 pb-2">
              {value.filename}
            </div>
          )}
          <code>{value.code}</code>
        </pre>
      )
    },

  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mt-3 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="ml-4">{children}</li>
  ),
      marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: any) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
      underline: ({ children }: any) => (
        <u className="underline">{children}</u>
      ),
      'strike-through': ({ children }: any) => (
        <del className="line-through">{children}</del>
      ),
      link: ({ value, children }: any) => {
        const target = value?.blank ? '_blank' : undefined
        return (
          <Link
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </Link>
        )
      },
      internalLink: ({ value, children }: any) => {
        if (!value?.reference) return <span>{children}</span>
        
        const href = value.reference._type === 'post' 
          ? `/blog/${value.reference.slug?.current}`
          : `/${value.reference.slug?.current}`
        
        return (
          <Link
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </Link>
        )
      },
    },
}

export function PortableText({ value }: PortableTextProps) {
  if (!value) return null

  return (
    <div className="prose prose-lg max-w-none">
      <PortableTextComponent value={value} components={portableTextComponents} />
    </div>
  )
} 