import { FC, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useI18n } from "../../hooks/useI18n";
import { links } from "../../assets/links";

/**
 * Phone action bar. On desktop the header carries the action, so this renders only under 900px.
 * Shown once the hero has scrolled away, hidden again while the contact section is on screen.
 */
const StickyCta: FC = () => {
    const { t } = useI18n();
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
        <Box
            // hidden state: out of the tab order and the accessibility tree
            aria-hidden={!visible}
            {...(visible ? {} : { inert: "" })}
            sx={{
                display: { xs: "block", md: "none" },
                position: "fixed", zIndex: 40, left: 0, right: 0, bottom: 0,
                p: 2, pb: "max(16px, env(safe-area-inset-bottom))",
                bgcolor: "background.default", borderTop: 1, borderColor: "divider",
                transform: visible ? "none" : "translateY(100%)",
                transition: "transform .3s",
            }}
        >
            <Button href={links.email} variant="contained" fullWidth>
                {t("hero.cta.contact")}
            </Button>
        </Box>
    );
};

export default StickyCta;
