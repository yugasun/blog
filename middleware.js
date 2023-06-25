import { rewrite, next } from '@vercel/edge'

export default function middleware(request) {
  const url = new URL(request.url)
  // if request url contain .html, remove it
  if (url.pathname.includes('.html')) {
    return rewrite(new URL(url.pathname.replace('.html', ''), request.url))
  }
  if (/page\/(\d+)/g.test(url.pathname) && !url.pathname.includes('/post')) {
    return rewrite(new URL(`/post${url.pathname}`, request.url))
  }
  return next()
}
