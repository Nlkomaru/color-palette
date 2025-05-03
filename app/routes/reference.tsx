import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import "../markdown.css";

export default function Reference() {
    const [content, setContent] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行される
        setIsClient(true);
        // マークダウンファイルを読み込む
        fetch("/reference.md")
            .then((response) => response.text())
            .then((text) => setContent(text));
    }, []);

    if (!isClient) {
        // サーバーサイドでは何も表示しない
        return null;
    }

    return (
        <div
            className={css({
                width: "1200px",
                margin: "0 auto",
                padding: "2rem",
            })}
        >
            <Markdown className="markdown">{content}</Markdown>
        </div>
    );
}
