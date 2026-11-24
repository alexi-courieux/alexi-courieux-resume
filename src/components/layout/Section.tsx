import { FC, ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";

interface ISectionProps {
    id: string;
    title: string;
    children: ReactNode;
}

const Section: FC<ISectionProps> = ({ id, title, children }) => (
    <Box component="section" id={id} aria-labelledby={`${id}-title`} sx={{ py: { xs: 8, md: 12 }, borderTop: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
            <Typography variant="h2" component="h2" id={`${id}-title`} sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: { xs: 4, md: 6 } }}>
                {title}
            </Typography>
            {children}
        </Container>
    </Box>
);

export default Section;
