import { Box, IconButton } from "@mui/material";
import { useTheme } from "../hooks/useTheme";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeModeSwitcher = () => {
    const { mode, toggleMode } = useTheme();

    const handleToggle = () => {
        toggleMode();
    }

    const styles = {
        icon: {
            fontSize: '2rem'
        }
    }

    return (
        <IconButton onClick={handleToggle}>
            {mode === 'light' ? <DarkMode sx={styles.icon} /> : <LightMode sx={styles.icon} />}
        </IconButton>
    )
}

export default ThemeModeSwitcher;