import { FC, ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import Reveal from "./Reveal";
import { fontMono } from "../../theme/theme";

interface ISectionProps {
    id: string;
    index: string;
    title: string;
    children: ReactNode;
}

const Section: FC<ISectionProps> = ({ id, index, title, children }) => (
    <Box component="section" id={id} aria-labelledby={`${id}-title`} sx={{ py: { xs: 7, md: 12 } }}>
        <Container maxWidth="lg">
            <Reveal>
                <Box sx={{ mb: { xs: 4, md: 7 }, display: "flex", alignItems: "baseline", gap: 2 }}>
                    <Typography aria-hidden sx={{ fontFamily: fontMono, color: "primary.main", fontSize: "0.95rem", fontWeight: 700 }}>
                        {index}
                    </Typography>
                    <Typography variant="h2" component="h2" id={`${id}-title`} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                        {title}
                    </Typography>
                    <Box aria-hidden sx={{ flexGrow: 1, height: "1px", bgcolor: "divider", alignSelf: "center", ml: 1 }} />
                </Box>
            </Reveal>
            {children}
        </Container>
    </Box>
);

export default Section;
