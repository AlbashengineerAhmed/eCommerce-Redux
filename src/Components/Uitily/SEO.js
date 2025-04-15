import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

/**
 * SEO Component for managing meta tags
 */
const SEO = ({ title, description, keywords, canonical, meta = {} }) => {
  const defaultTitle = "E-Commerce Store";
  const defaultDescription = "Welcome to our e-commerce store";
  const defaultKeywords = "ecommerce, shopping, online store";

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    canonical: canonical || window.location.href,
    meta: {
      ...meta,
      "og:title": title || defaultTitle,
      "og:description": description || defaultDescription,
      "twitter:title": title || defaultTitle,
      "twitter:description": description || defaultDescription,
    },
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.canonical} />
      {Object.entries(seo.meta).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  meta: PropTypes.object,
};

SEO.defaultProps = {
  meta: {},
};

export default SEO;
