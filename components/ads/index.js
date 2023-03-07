import GoogleAdSense from './GoogleAdSense'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Ads = () => {
  return <>{isProduction && siteMetadata.analytics.googleAdSenseId && <GoogleAdSense />}</>
}

export default Ads
