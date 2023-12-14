"use client";
import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    Flex
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/components/"


export default function Navbar() {

    return (
        <nav className="px-6 py-4 border-b-4">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="5">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
}

function NavLinks() {
    const pathname = usePathname();
    const links = [
        { name: "Dashboard", href: "/" },
        { name: "Issues", href: "/issues" },
    ];
    return (
        <ul className="flex space-x-6 items-center">
            {links.map(({ name, href }) => (
                <li key={name}>
                    <Link
                        href={href}
                        className={classNames({
                            "text-black font-bold": pathname === href,
                            "text-zinc-600 hover:text-black transition-colors":
                                pathname !== href,
                        })}
                    >
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function AuthStatus() {
    const { status, data: session } = useSession();
    if (status === "loading") return <Skeleton width="2rem" height="2rem" borderRadius="2rem" />;
    if (status === "unauthenticated") {
        return (
            <Link href="/api/auth/signin" className="text-black font-bold">
                Sign in
            </Link>
        );
    }
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback="?"
                        radius="full"
                        className="cursor-pointer"
                        size="2"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end" sideOffset={5}>
                    <DropdownMenuLabel>{session!.user!.name!}</DropdownMenuLabel>

                    <DropdownMenuLabel>{session!.user!.email!}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <Link href="/api/auth/signout">
                        <DropdownMenu.Item>
                            Sign out
                        </DropdownMenu.Item>
                    </Link>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
}
