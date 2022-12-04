import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './footer';
import NavBar from './navbar'

type Props = {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Giza | Home</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="gigza" />
            </Head>
            <div className="content">
                <NavBar />
                <main className="mt-[78px] md:mt-20">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Layout