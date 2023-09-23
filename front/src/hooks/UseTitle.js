import React from 'react'
import { Helmet } from "react-helmet-async";


export default function useTitle(props) {
    const title = props.title;
    const jsx = (
        <Helmet>
            <meta charSet="utf-8"/>
            <title>{title}</title>
        </Helmet>
    );
    return jsx
}
