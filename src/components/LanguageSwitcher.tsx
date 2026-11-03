import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import { Box, ButtonBase, Tooltip } from "@mui/material";
import { fontMono } from "../theme/theme";

const LanguageSwitcher: FC = () => {
    const { t, i18n, languages } = useI18n();

    const handleChange = (language: string) => {
        if (language === i18n.language) {
            return;
        }
        i18n.changeLanguage(language);
        document.documentElement.lang = language;
        const url = new URL(globalThis.location.href);
        url.searchParams.set('lang', language);
        globalThis.history.replaceState({}, '', url);
    };

    return (
        <Box
            role="group"
            aria-label={t("language.label")}
            sx={{ display: 'inline-flex', p: '3px', gap: '2px', borderRadius: 999, border: 1, borderColor: 'divider', ml: 1 }}
        >
            {languages.map((language) => {
                const selected = language.key === i18n.language;
                return (
                    <Tooltip key={language.key} title={t(`language.to.${language.key}`)}>
                    <ButtonBase
                        lang={language.key}
                        onClick={() => handleChange(language.key)}
                        aria-pressed={selected}
                        aria-label={language.nativeName}
                        sx={{
                            px: 1.25, py: 0.5, borderRadius: 999, fontFamily: fontMono, fontSize: '0.8rem', fontWeight: 700,
                            textTransform: 'uppercase', transition: 'background-color .2s, color .2s',
                            bgcolor: selected ? 'primary.main' : 'transparent',
                            color: selected ? 'background.default' : 'text.secondary',
                            '&:hover': { bgcolor: selected ? 'primary.main' : 'action.hover', color: selected ? 'background.default' : 'text.primary' },
                        }}
                    >
                        {language.key}
                    </ButtonBase>
                    </Tooltip>
                );
            })}
        </Box>
    );
};

export default LanguageSwitcher;
