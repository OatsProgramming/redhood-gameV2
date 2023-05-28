import './globals.css'
import localFont from 'next/font/local'

const retroPixel = localFont({ src: '../assets/fonts/retro-pixel-thick.woff2' });

export const metadata = {
  title: "Paper Pixel Planet",
  description: 'Save a Universe of Imagination: Immerse yourself in a captivating narrative that celebrates the power of creativity and imagination. Join forces with quirky characters, face the challenges of a troubled world, and ignite the spark of hope to save the Paper Pixel Planet from impending darkness.',
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
