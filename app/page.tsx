import GithubLink from '@atoms/GithubLink'
import LenisTitle from '@organisms/LenisTitle'

export default function Page() {
    return (
        <div style={{ height: 2000 }}>
            <div className="flex h-[100vh] flex-col px-vw-13 py-vw-10">
                <div className="flex-1">
                    <LenisTitle color="pink" />
                </div>
                <div className="flex w-full">
                    <div className="ml-auto">
                        <GithubLink />
                    </div>
                </div>
            </div>
        </div>
    )
}
