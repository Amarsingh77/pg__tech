import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}) => {
    const siteTitle = 'PG Tech - Tech Institute & Solutions';
    const defaultDescription = 'PG Tech provides top-notch technical education and software solutions. Browse our courses, view student projects, and get in touch.';
    const defaultKeywords = 'tech institute, coding courses, software development, web development, full stack, pg tech, punjab';
    const domain = 'https://pgtech.in'; // Replace with actual domain when live
    const fullUrl = url ? `${domain}${url}` : domain;
    const imageUrl = image ? (image.startsWith('http') ? image : `${domain}${image}`) : `${domain}/og-image.jpg`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;
