import Head from 'next/head';
import React, { ReactNode } from 'react'
import DashboardNav from './dashboard-nav'

type Props = {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>Giza | Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="gigza" />
      </Head>
      <DashboardNav />
      <main className="mt-12 md:mt-20">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout