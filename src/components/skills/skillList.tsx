import { Autocomplete, Box, Chip, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import { SkillSchema } from "../../api/generated";
import { stringSort } from "../../utils/sort";

interface ISkillListProps {
    skills: SkillSchema[];
    searchBar?: boolean;
}

interface Category {
    name: string;
    skills: SkillSchema[];
}

const SkillList: FC<ISkillListProps> = ({ skills, searchBar = false }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [hideUnselected, setHideUnselected] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const hint = useRef<string>('');

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
        })).sort((a, b) => stringSort(a.name, b.name));

        setCategories(newCategories);
    }, [skills]);

    const filteredSkills = useMemo(() => {
        let fSkills = [...skills];
        
        if (searchInput) {
            fSkills = fSkills.filter(skill => skill.name.toLowerCase().includes(searchInput.toLowerCase()));
        }

        if (activeCategories.length > 0 && hideUnselected) {
            fSkills = fSkills.filter(skill => activeCategories.some(category => skill.categories.includes(category)));
        }

        return fSkills;
    }, [skills, searchInput, activeCategories, hideUnselected]);

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
            <Box>
                {searchBar && (
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                        <Autocomplete
                            sx={{ width: 300 }}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    if (hint.current) {
                                        setSearchInput(hint.current);
                                        e.preventDefault();
                                    }
                                }
                            }}
                            onClose={() => {
                                hint.current = '';
                            }}
                            onChange={(_, v) => {
                                setSearchInput(v && v.label ? v.label : '');
                            }}
                            disablePortal
                            inputValue={searchInput}
                            options={skills.map(skill => ({ label: skill.name }))}
                            renderInput={(params) => {
                                return (
                                    <Box sx={{ position: 'relative' }}>
                                        <Typography
                                            sx={{
                                                position: 'absolute',
                                                opacity: 0.5,
                                                left: 14,
                                                top: 16,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                width: 'calc(100% - 75px)', // Adjust based on padding of TextField
                                            }}
                                        >
                                            {hint.current}
                                        </Typography>
                                        <TextField
                                            {...params}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                setSearchInput(newValue);
                                                const matchingOption = skills.map(s => ({ label: s.name })).find((option) =>
                                                    option.label.startsWith(newValue),
                                                );

                                                if (newValue && matchingOption) {
                                                    hint.current = matchingOption.label;
                                                } else {
                                                    hint.current = '';
                                                }
                                            }}
                                            label="Skill"
                                            size="small"
                                        />
                                    </Box>
                                )
                            }}
                        />
                    </Box>
                )}
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                {filteredSkills.map((skill) => {
                    const isActive = activeCategories.some(category => skill.categories.includes(category));
                    return <Chip key={skill.id} label={skill.name} color="secondary" variant={isActive ? "filled" : "outlined"} />
                })}
            </Box>
        </>
    )
}

export default SkillList;