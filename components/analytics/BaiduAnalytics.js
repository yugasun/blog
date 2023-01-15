import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const BDScript = () => {
  return (
    <>
      <Script strategy="lazyOnload" id="bd-script">
        {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${siteMetadata.analytics.baiduAnalyticsId}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
        `}
      </Script>
    </>
  )
}

export default BDScript
