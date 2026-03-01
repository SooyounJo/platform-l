import Head from 'next/head';
import LoadScreen from '@/components/load';

export default function Load() {
  return (
    <>
      <Head>
        <title>로딩 | Platform L</title>
      </Head>
      <LoadScreen />
    </>
  );
}
