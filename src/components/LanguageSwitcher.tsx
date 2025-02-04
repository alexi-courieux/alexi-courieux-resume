import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import { Box, Button } from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const LanguageSwitcher: FC = () => {
    const { i18n, languages } = useI18n();

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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            {languages.map((language) => (
                <Button key={language.key}
                    onClick={() => handleChange(language.key)}
                    aria-label={language.nativeName}
                    sx={{ fontSize: '2rem' }}>
                    <span className={`fi fi-${language.flag}`}></span>
                </Button>
            ))}
        </Box>
    );
};

export default LanguageSwitcher;