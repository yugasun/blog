import { rewrite, next } from '@vercel/edge'

export default function middleware(request) {
  // if request url contain .html, remove it
  if (request.url.includes('.html')) {
    return rewrite(new URL(request.url.replace('.html', ''), request.url))
  }
  return next()
}
