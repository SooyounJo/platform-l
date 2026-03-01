import Head from 'next/head';
import LandingScreen from '@/components/landing';

export default function Landing() {
  return (
    <>
      <Head>
        <title>랜딩 | Platform L</title>
      </Head>
      <LandingScreen />
    </>
  );
}
