'use client'

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'GenCon Cal',
  description: 'Generated by create next app',
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

import '@/assets/styles/application.scss';
import { Navigation } from '@/components';
import EventData from '@/assets/events/events.json';
import { DataProps } from '@/assets/interfaces';

export const { eventData, filteredEvents } = EventData as DataProps;

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [faves, setFaves] = useState<number[]>([]);

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Navigation />
      <main>
        { !hasMounted ? (
          <div>
            Loading...
          </div>
        ) : (
          <Component faves={faves} setFaves={setFaves} {...pageProps} />
        )}
        <Analytics />
      </main>
    </>
  )
}
