import Link from "next/link";


export default function NavBar() {
    return (
        <ul className="w-full flex justify-evenly text-xl uppercase">
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/categories/beach'>Praia</Link>
            </li>
            <li>
                <Link href='/categories/fitness'>Fitness</Link>
            </li>
            <li>
                <Link href='/categories/swim'>Natação</Link>
            </li>
        </ul>
    )
}