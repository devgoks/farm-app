import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
           <title>{title}</title> 
           <meta name='description' content={description} />
           <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To FarmConnect',
    description: 'Agriclutural website by farm connect',
    keywords: 'farmers, farm connect, department of agriculture, agricultural science'
}

export default Meta
