import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Scanners',
  description: 'Browse our complete catalog of XTOOL professional diagnostic scanners and tools. Find the perfect scanner for your workshop.',
  keywords: 'XTOOL scanners, buy auto scanner, OBD2 tools, diagnostic tablets',
};

export default function ScannersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
