import { Box, Chip, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import { SkillSchema } from "../../api/generated";

interface ISkillListProps {
    skills: SkillSchema[];
}

interface Category {
    name: string;
    skills: SkillSchema[];
}

const SkillList: FC<ISkillListProps> = ({ skills }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [hideUnselected, setHideUnselected] = useState<boolean>(false);

    const { t } = useI18n();

    useEffect(() => {
        const categoryMap: { [key: string]: SkillSchema[] } = {};
        skills.forEach(skill => {
            skill.categories.forEach(categoryName => {
                if (!categoryMap[categoryName]) {
                    categoryMap[categoryName] = [];
                }
                categoryMap[categoryName].push(skill);
            });
        });

        const newCategories = Object.keys(categoryMap).map(categoryName => ({
            name: categoryName,
            skills: categoryMap[categoryName],
        })).sort((a, b) => a.name.localeCompare(b.name));

        setCategories(newCategories);
    }, [skills]);

    const handleClickAddCategory = (categoryName: string) => {
        const newActiveCategories = [...activeCategories, categoryName];
        setActiveCategories(newActiveCategories);
    }

    const handleClickRemoveCategory = (categoryName: string) => {
        const newActiveCategories = activeCategories.filter((category) => category !== categoryName);
        setActiveCategories(newActiveCategories);
    }

    return (
        <>
            <Typography variant="h6" align="center" gutterBottom>
                {t('resume.skill.clickFilter')}
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1} mb={2}>
                {categories.map((category) => {
                    if (activeCategories.includes(category.name)) {
                        return <Chip key={category.name} label={category.name} color="primary" onClick={() => handleClickRemoveCategory(category.name)} onDelete={() => handleClickRemoveCategory(category.name)} />
                    }
                    else {
                        return <Chip key={category.name} label={category.name} color="primary" variant="outlined" onClick={() => handleClickAddCategory(category.name)} />
                    }
                })}
                <FormGroup>
                    <FormControlLabel control={<Switch value={hideUnselected} onChange={(e) => setHideUnselected(e.target.checked)} />} label={t("resume.skill.hideUnselected")} />
                </FormGroup>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                {skills.map((skill) => {
                    const isActive = activeCategories.some(category => skill.categories.includes(category));
                    if (hideUnselected && !isActive) {
                        return null;
                    }
                    return <Chip key={skill.id} label={skill.name} color="secondary" variant={isActive ? "filled" : "outlined"} />
                })}
            </Box>
        </>
    )
}

export default SkillList;