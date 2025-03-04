import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "../hooks/useTheme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import { ThemeMode } from "../contextProviders/ThemeContext";

interface IThemeModeSwitcherProps {
    showLabel?: boolean;
}

const ThemeModeSwitcher: FC<IThemeModeSwitcherProps> = ({ showLabel }) => {
    const { mode, toggleMode } = useTheme();
    const isDarkMode = mode === ThemeMode.Dark;
    const { t } = useI18n();

    const handleToggle = () => {
        toggleMode();
    }

    const styles = {
        icon: {
            fontSize: '2rem'
        }
    }

    const toggleButton = (
        <IconButton onClick={handleToggle} aria-label={isDarkMode ? t("theme.light.aria-label") : t("theme.dark.aria-label")}>
            {isDarkMode ? <LightMode sx={styles.icon} /> : <DarkMode sx={styles.icon} />}
        </IconButton>
    );

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {showLabel ? (
                <>
                    {toggleButton}
                    <Box onClick={handleToggle} sx={{ cursor: 'pointer' }} aria-hidden>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                            {isDarkMode ? t("theme.light.label") : t("theme.dark.label")}
                        </Typography>
                    </Box>
                </>
            ) : (
                <Tooltip title={isDarkMode ? t("theme.light.label") : t("theme.dark.label")} placement="left">
                    {toggleButton}
                </Tooltip>
            )}
        </Stack>
    )
}

export default ThemeModeSwitcher;