'use client';

import dynamic from 'next/dynamic';

const KontakClient = dynamic(() => import('./KontakClient'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return <KontakClient />;
}
