import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <a
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </a>
  )
}

export default Tag
