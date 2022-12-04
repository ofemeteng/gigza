import Link from "next/link"
import { useRouter } from "next/router"
import ProposalLink from "./proposal-link";

type Prop = {
    title: string;
    to: string;
}

const NavLink = ({ title, to }: Prop) => {
    const router = useRouter()
    return title.toLowerCase()==="proposals" ? <ProposalLink /> : (
        <Link href={to}>
            <a className={`capitalize ${router.pathname.toLowerCase() === to.toLowerCase() ? 'text-primary ' : 'text-b4 text-[15px] leading-5 font-satoshiRegular'}`}>{title}</a>
        </Link>
    )
}

export default NavLink
