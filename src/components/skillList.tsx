import { Box, Chip, Divider, Tooltip } from "@mui/material";
import { FC } from "react";

const SkillList: FC = () => {
    return (
        <>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                <Chip label="Frontend" color="primary" onClick={() => alert("Frontend")} onDelete={() => alert("Frontend")}/>
                <Chip label="Backend" color="primary" variant="outlined" onClick={() => alert("Backend")}/>
                <Chip label="Database" color="primary" onClick={() => alert("Database")} onDelete={() => alert("Database")}/>
                <Chip label="DevOps" color="primary" variant="outlined" onClick={() => alert("DevOps")}/>
                <Chip label="Version control" color="primary" variant="outlined" onClick={() => alert("Version control")}/>
                <Chip label="Testing" color="primary" variant="outlined" onClick={() => alert("Testing")}/>
                <Chip label="Methodologies" color="primary" variant="outlined" onClick={() => alert("Methodologies")}/>
                <Chip label="Soft skills" color="primary" variant="outlined" onClick={() => alert("Soft skills")}/>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                <Chip label="Angular" color="info" variant="outlined" />
                <Chip label="React" color="info" variant="outlined" />
                <Chip label="Vue" color="info" variant="outlined" />
                <Chip label="SQL" color="info" variant="outlined" />
                <Chip label="MongoDB" color="info" variant="outlined" />
                <Chip label="Node.js" variant="outlined" />
                <Chip label="Express" variant="outlined" />
                <Chip label="Spring" variant="outlined" />
                <Chip label="Hibernate" variant="outlined" />
                <Chip label="Docker" variant="outlined" />
            </Box>
        </>
    )
}

export default SkillList;