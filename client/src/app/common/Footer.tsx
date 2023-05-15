import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer>
            <p>© Caitlin Whiteley plane finder ltd</p>
            <Link
                className="link"
                href="https://openskynetwork.github.io/opensky-api/">
                API info
            </Link>
        </footer>
    );
}
