import React, { useState } from "react";
import VoiceOutput from "./VoiceOutput";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

function MessageBubble({ sender, text }) {
    const isUser = sender === "user";

    const CodeBlock = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || "");
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        if (!inline && match) {
            return (
                <div className="code-block-wrapper">
                    <div className="code-block-header">
                        <span className="code-block-language">{match[1]}</span>
                        <button className="code-block-copy-btn" onClick={handleCopy} title="Copy code">
                            {copied ? <FiCheck /> : <FiCopy />}
                            <span className="copy-text">{copied ? "Copied!" : "Copy"}</span>
                        </button>
                    </div>
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="syntax-highlighter"
                        {...props}
                    >
                        {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                </div>
            );
        }

        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    };

    return (
        <div className={`message-row ${isUser ? "message-row-user" : "message-row-ai"}`}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`message-bubble ${isUser ? "message-bubble-user" : "message-bubble-ai"}`}
            >
                <div className="message-text">
                    {isUser ? (
                        text.replace(/BRBR/g, "\n")
                    ) : (
                        <ReactMarkdown
                            components={{
                                code: CodeBlock,
                            }}
                        >
                            {text}
                        </ReactMarkdown>
                    )}
                </div>
            </motion.div>

            {!isUser && (
                <VoiceOutput text={text} />
            )}
        </div>
    );
}

export default MessageBubble;
