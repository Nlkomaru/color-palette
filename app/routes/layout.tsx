import { Outlet } from "react-router";
import { css } from "../../styled-system/css";
import { Header } from "../components/organisms/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div
                className={css({
                    padding: "0 2rem",
                    width: "1200px",
                    margin: "0 auto",
                })}
            >
                <Outlet />
            </div>
        </div>
    );
}
