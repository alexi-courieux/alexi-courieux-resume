import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface IRevealProps {
    children: ReactNode;
    delay?: number;
}

/** Fades/slides its children in when they enter the viewport. Neutralised by the global prefers-reduced-motion rule. */
const Reveal: FC<IRevealProps> = ({ children, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.12 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={ref}
            sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(28px)",
                transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            }}
        >
            {children}
        </Box>
    );
};

export default Reveal;
