import { FC } from "react";
import { useTheme } from "@mui/material";
import { radius } from "../../theme/theme";

interface ILogoProps {
    size?: number;
}

/**
 * "A_" monogram on a flat accent square: a chevron A followed by a terminal cursor.
 * Decorative (the parent link carries the accessible name).
 */
const Logo: FC<ILogoProps> = ({ size = 40 }) => {
    const theme = useTheme();
    const ink = theme.palette.primary.contrastText;

    return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden focusable="false">
            <rect width="40" height="40" rx={radius.control} fill={theme.palette.primary.main} />
            <path d="M10.5 27 L16 14.5 L21.5 27 M12.5 22.5 H19.5" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="26" y="25.5" width="5" height="3" rx="1" fill={ink} />
        </svg>
    );
};

export default Logo;
