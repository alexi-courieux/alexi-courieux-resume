import { FC, useEffect, useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";

interface IWordHighlightProps {
    text: string;
}

const DIM = 0.28;

/**
 * The page's one dealt moment: the words of a statement turn from muted to full ink as the
 * paragraph travels up the screen. The full text is always in the DOM for screen readers, and
 * under reduced motion every word is simply at full ink.
 */
const WordHighlight: FC<IWordHighlightProps> = ({ text }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const words = useMemo(() => text.split(" "), [text]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
        const paint = (lit: number) => spans.forEach((s, i) => { s.dataset.lit = i < lit ? "true" : "false"; });

        if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            el.dataset.static = "true";
            return;
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const { top, height } = el.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the paragraph's top enters at 85% of the screen, 1 once its bottom reaches 45%.
            const start = vh * 0.85;
            // The paragraph sits near the end of the page, so the page may stop scrolling before it gets
            // that high. Where its top rests at maximum scroll is the lowest point it can ever reach;
            // finish there at the latest so the last words always light up.
            const maxScroll = document.documentElement.scrollHeight - vh;
            const reachableTop = top - (maxScroll - window.scrollY);
            const end = Math.max(vh * 0.45 - height, reachableTop);
            const progress = start - end > 1 ? Math.min(1, Math.max(0, (start - top) / (start - end))) : 1;
            paint(Math.round(progress * spans.length));
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [words]);

    return (
        <Typography
            ref={ref}
            sx={{
                fontSize: { xs: "1.35rem", md: "2rem" }, lineHeight: 1.35, fontWeight: 500, maxWidth: 960,
                // Unlit words are dimmed; a lit word is at full ink. Nothing else changes.
                "& [data-word]": { opacity: DIM, transition: "opacity .2s" },
                "& [data-word][data-lit='true']": { opacity: 1 },
                // Reduced motion: everything at full ink.
                "&[data-static='true'] [data-word]": { opacity: 1 },
            }}
        >
            {words.map((word, i) => (
                <Box component="span" data-word key={`${word}-${i}`}>
                    {word}{i < words.length - 1 ? " " : ""}
                </Box>
            ))}
        </Typography>
    );
};

export default WordHighlight;
