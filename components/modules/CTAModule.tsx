'use client'

interface CTAModuleProps {
  module: {
    title: string
    description?: string
    buttonText: string
    buttonLink: string
    backgroundColor?: string
    buttonStyle?: string
    alignment?: 'left' | 'center' | 'right'
  }
}

export function CTAModule({ module }: CTAModuleProps) {
  const { 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    backgroundColor = 'primary',
    buttonStyle = 'primary',
    alignment = 'center'
  } = module

  const bgColors = {
    default: 'bg-gray-100',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    dark: 'bg-gray-900',
    light: 'bg-gray-50',
  }

  const textColors = {
    default: 'text-gray-900',
    primary: 'text-white',
    secondary: 'text-white',
    dark: 'text-white',
    light: 'text-gray-900',
  }

  const buttonStyles = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100',
    secondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
    outline: 'bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    ghost: 'bg-transparent text-white hover:bg-white hover:text-gray-900',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <section className={`py-16 ${bgColors[backgroundColor as keyof typeof bgColors]}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={alignmentClasses[alignment as keyof typeof alignmentClasses]}>
          <h2 className={`text-3xl font-bold mb-4 ${textColors[backgroundColor as keyof typeof textColors]}`}>
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg mb-8 ${textColors[backgroundColor as keyof typeof textColors]} opacity-90`}>
              {description}
            </p>
          )}

          <a
            href={buttonLink}
            className={`inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${buttonStyles[buttonStyle as keyof typeof buttonStyles]}`}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
} 