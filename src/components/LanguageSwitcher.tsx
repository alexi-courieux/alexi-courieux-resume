import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import { Box, Button, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import "flag-icons/css/flag-icons.min.css";
const LanguageSwitcher: FC = () => {
    const { t, i18n, languages } = useI18n();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (language: string) => {
        if (language === i18n.language) {
            return
        }
        i18n.changeLanguage(language);
        document.documentElement.lang = language;
        const url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url);
    };

    const getI18nKey = (key: string) => {
        return `language.to.${key}`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {languages.map((language) => (
                <Tooltip key={language.key} title={t(getI18nKey(language.key))} placement={isMobile ? 'top' : 'left'}>
                    <Button
                        onClick={() => handleChange(language.key)}
                        aria-label={language.nativeName}
                        sx={{ fontSize: '2rem', width: isMobile ? '100%' : 'auto' }}>
                        <span className={`fi fi-${language.flag}`}></span>
                    </Button>
                </Tooltip>
            ))}
        </Box>
    );
};

export default LanguageSwitcher;