import { FC, useId } from "react";
import { useTheme } from "@mui/material";

interface ILogoProps {
    size?: number;
}

/**
 * "A_" monogram: a chevron A followed by a blinking terminal cursor,
 * a nod to the developer prompt. Decorative (the parent link carries the accessible name).
 */
const Logo: FC<ILogoProps> = ({ size = 40 }) => {
    const theme = useTheme();
    const id = useId();
    const ink = theme.palette.mode === "dark" ? "#080a12" : "#ffffff";

    return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden focusable="false">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={theme.palette.primary.main} />
                    <stop offset="1" stopColor={theme.palette.secondary.main} />
                </linearGradient>
            </defs>
            <rect width="40" height="40" rx="12" fill={`url(#${id})`} />
            <path d="M10.5 27 L16 14.5 L21.5 27 M12.5 22.5 H19.5" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="26" y="25.5" width="5" height="3" rx="1" fill={ink} style={{ animation: "blink 1.2s steps(1) infinite" }} />
        </svg>
    );
};

export default Logo;
