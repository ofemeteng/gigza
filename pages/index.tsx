import Layout from '@/modules/common/components/layout'
import Find from '@/modules/common/sections/find'
import Hero from '@/modules/common/sections/hero'
import NextGig from '@/modules/common/sections/next-gig'
import TalentMarket from '@/modules/common/sections/talent-market'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Find />
      <TalentMarket />
      <NextGig />
    </Layout>
  )
}

export default Home
