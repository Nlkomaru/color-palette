import { Outlet } from "react-router";
import { Header } from "../components/organisms/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
