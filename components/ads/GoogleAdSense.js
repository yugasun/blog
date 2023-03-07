import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const GoogleAdSenseScript = () => {
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteMetadata.analytics.googleAdSenseId}`}
        crossorigin="anonymous"
        id="adsense-script"
      ></Script>
    </>
  )
}

export default GoogleAdSenseScript
