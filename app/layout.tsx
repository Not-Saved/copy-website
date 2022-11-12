import './globals.css'
import Contexts from './contexts'
import ScrollProgressBar from '@atoms/ScrollProgressBar'
import Intro from '@organisms/Intro'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta name="viewport" content="width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <Contexts>
                    <Intro />
                    <ScrollProgressBar />
                    {children}
                </Contexts>
                <div className="background-gradient pointer-events-none fixed top-0 left-0 z-[-1] h-full w-full bg-black"></div>
            </body>
        </html>
    )
}
