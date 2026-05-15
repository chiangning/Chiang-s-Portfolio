import { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  description: 'Chiang Ning is a Melbourne-based architect and project manager helping organisations unlock asset potential and maximise value without compromising budget or timeline.',
}

export default function HomePage() {
  return <HomeContent />;
}
