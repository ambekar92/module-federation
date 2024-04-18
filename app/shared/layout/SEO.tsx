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

// The SEO component can be used in the layout or page components to set the above properties.
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {ogTitle && <meta property="og:title" content={ogTitle} />}
    {ogDescription && (
      <meta property="og:description" content={ogDescription} />
    )}
    {ogImage && <meta property="og:image" content={ogImage} />}
    {ogUrl && <meta property="og:url" content={ogUrl} />}
  </Helmet>
)

export default SEO
