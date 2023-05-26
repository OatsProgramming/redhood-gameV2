import './globals.css'
import localFont from 'next/font/local'

const retroPixel = localFont({ src: '../assets/fonts/retro-pixel-thick.woff2' });

export const metadata = {
  title: "Redhood's Adventure",
  description: 'Venture and experience different things in the land of Ra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={retroPixel.className}>
        {children}
      </body>
    </html>
  )
}
