import { FC, useEffect, useState } from "react";
import { Button, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";

/** Floating contact button: shown once the hero has scrolled away, hidden again when the contact section is on screen. */
const StickyCta: FC = () => {
    const { t } = useI18n();
    const theme = useTheme();
    const dark = theme.palette.mode === "dark";
    const [heroVisible, setHeroVisible] = useState(true);
    const [contactVisible, setContactVisible] = useState(false);

    useEffect(() => {
        const hero = document.getElementById("top");
        const contact = document.getElementById("contact");
        const observers: IntersectionObserver[] = [];
        const watch = (el: HTMLElement | null, set: (v: boolean) => void) => {
            if (!el) return;
            const observer = new IntersectionObserver(([entry]) => set(entry.isIntersecting));
            observer.observe(el);
            observers.push(observer);
        };
        watch(hero, setHeroVisible);
        watch(contact, setContactVisible);
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const visible = !heroVisible && !contactVisible;

    return (
        <Button
            href={links.email}
            variant="contained"
            startIcon={<EmailIcon />}
            // hidden state: out of the tab order and the accessibility tree
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            sx={{
                position: "fixed", zIndex: 40, bottom: { xs: 16, md: 28 }, right: { xs: 16, md: 28 },
                px: 3, py: 1.2, fontSize: "1rem", color: dark ? "#080a12" : "#fff",
                background: `linear-gradient(100deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 12px 36px -8px ${theme.palette.primary.main}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                pointerEvents: visible ? "auto" : "none",
                transition: "opacity .3s, transform .3s",
                "&:hover": { transform: visible ? "translateY(-2px)" : undefined },
            }}
        >
            {t("hero.cta.contact")}
        </Button>
    );
};

export default StickyCta;
