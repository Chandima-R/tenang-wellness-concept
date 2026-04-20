import './globals.css';
import {LenisProvider} from '@/components/providers/lenis-provider';
import {CustomCursor} from '@/components/ui/custom-cursor';
import {Intro} from '@/components/layout/intro';
import {Navigation} from "../components/layout/navigation";
import {Footer} from "../components/layout/footer";

export const metadata = {
  title: 'TENANG — Where the Earth Holds Its Breath',
  description: 'An ultra-luxury wellness sanctuary in the heart of the Indonesian archipelago. Healing rituals from USD 52,000. Twelve private villas. Ubud, Bali.',
};                                                                                                       

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
            rel="stylesheet"
        />
      </head>
      <body>
      <LenisProvider>
        <CustomCursor />
        <Intro />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </LenisProvider>
      </body>
      </html>
  );
}
