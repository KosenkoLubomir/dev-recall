import Image from "next/image";
import Link from "next/link";

type LogoProps = {
    view?: "standard" | "horizontal";
    classes?: string;
}

const Logo = (
    { view = "standard", classes }: LogoProps
) => {

    const standard = view === "standard";

    return (
        <Link className={`flex gap-2 font-bold items-center ${classes}`} href="/">
            <Image
                src="/images/dev-recall-logo.png"
                alt="Heard Logo"
                width={standard ? 34 : 24}
                height={standard ? 40 : 30}
            />
            <h1 className={`mb-0 leading-5 font-thin ${standard ? "text-2xl" : "text-xl"}`}>
                <span className={"text-indigo-700"}>Dev</span>
                {standard && <br/>}
                <span>Recall</span>
            </h1>
        </Link>
    )
}

export default Logo;