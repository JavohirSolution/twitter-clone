import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Hmm...this page doesn't exist. Try searching for something else.</p>
            <Link href="/" className='bg-sky-500 px-3 py-2 '>Search</Link>
        </div>
    )
}