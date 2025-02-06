import { Box, Chip, FormControlLabel, FormGroup, Switch, ToggleButton, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Skill } from "../../api/models/skill";
import { useI18n } from "../../hooks/useI18n";

interface ISkillListProps {
    skills: Skill[];
}

interface Category {
    name: string;
    skills: Skill[];
}

const SkillList: FC<ISkillListProps> = ({ skills }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [hideUnselected, setHideUnselected] = useState<boolean>(false);

    const { t } = useI18n();

    useEffect(() => {
        const categories = skills.reduce((acc: Category[], skill) => {
            const category = acc.find((category) => category.name === skill.category);
            if (category) {
                category.skills.push(skill);
            }
            else {
                acc.push({ name: skill.category, skills: [skill] });
            }
            return acc;
        }, []);
        setCategories(categories);
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
                {t('resume.skills.clickFilter')}
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
                    <FormControlLabel control={<Switch value={hideUnselected} onChange={(e) => setHideUnselected(e.target.checked)} />} label={t("resume.skills.hideUnselected")} />
                </FormGroup>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                {skills.map((skill) => {
                    if (hideUnselected && !activeCategories.includes(skill.category)) {
                        return null;
                    }
                    return <Chip key={skill.id} label={skill.name + " " + skill.category} color="secondary" variant={activeCategories.includes(skill.category) ? "filled" : "outlined"} />
                })}
            </Box>
        </>
    )
}

export default SkillList;