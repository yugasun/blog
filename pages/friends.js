import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import friendLinks from '@/data/friendLinks'

export default function Friends() {
  return (
    <>
      <PageSEO
        title={`友情链接 - ${siteMetadata.author}`}
        description="Friends and partners of this blog"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            友情链接
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            感谢各位朋友的支持与交流
          </p>
        </div>
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {friendLinks.map((link) => (
              <Link
                key={link.title}
                href={link.website}
                className="flex transform items-center rounded-lg bg-gray-100 p-6 transition duration-500 ease-in-out hover:scale-105 dark:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mr-5 flex-shrink-0">
                  <div className="overflow-hidden rounded-full border-4 border-primary-500 shadow-lg transition-all duration-300 hover:shadow-primary-500/50">
                    <img
                      className="h-16 w-16 rounded-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                      src={link.avatar || 'https://static.yugasun.com/avatar-default.png'}
                      alt={link.title}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
