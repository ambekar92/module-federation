import React from 'react'
import { Helmet } from 'react-helmet'

interface SEOProps {
   title: string
   description: string
   canonicalUrl: string
   ogTitle?: string
   ogDescription?: string
   ogImage?: string
   ogUrl?: string
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl, ogTitle, ogDescription, ogImage, ogUrl }) => (
   <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {ogTitle != null && <meta property="og:title" content={ogTitle} />}
      {ogDescription != null && <meta property="og:description" content={ogDescription} />}
      {ogImage != null && <meta property="og:image" content={ogImage} />}
      {ogUrl != null && <meta property="og:url" content={ogUrl} />}
   </Helmet>
)

export default SEO
