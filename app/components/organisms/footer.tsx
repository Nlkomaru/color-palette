import { Link } from "react-router";
import { css } from "../../../styled-system/css";

export function Footer() {
    return (
        <footer
            className={css({
                width: "100%",
                padding: "2rem",
                marginTop: "5rem",
                backgroundColor: "gray.100",
            })}
        >
            <div
                className={css({
                    maxWidth: "1200px",
                    margin: "0 auto",
                    textAlign: "center",
                })}
            >
                <p
                    className={css({
                        color: "gray.600",
                        fontSize: "sm",
                    })}
                >
                    Written by{" "}
                    <Link to="https://www.nikomaru.dev" target="_blank" rel="noopener noreferrer">
                        Nikomaru
                    </Link>
                    . No rights reserved.
                </p>
            </div>
        </footer>
    );
}
