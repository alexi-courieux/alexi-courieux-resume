import { Autocomplete, Box, Chip, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import { SkillSchema } from "../../api/generated";
import { stringSortAsc } from "../../utils/sort";

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
    const [hideUnselectedCategories, setHideUnselectedCategories] = useState<boolean>(false);
    const [hideUnsearchedSkills, setHideUnsearchedSkills] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');

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
        })).sort((a, b) => stringSortAsc(a.name, b.name));

        setCategories(newCategories);
    }, [skills]);

    const searchedSkills = useMemo(() => {
        return skills.filter(skill => skill.name.toLowerCase().includes(searchInput.toLowerCase()));
    }, [skills, searchInput]);

    const activeCategoriesSkills = useMemo(() => {
        return skills.filter(skill => activeCategories.some(category => skill.categories.includes(category)));
    }, [skills, activeCategories]);

    const activeSkills = useMemo(() => {
        if (searchInput) {
            if (activeCategoriesSkills.length > 0) {
                return searchedSkills.filter(skill => activeCategoriesSkills.includes(skill));
            }
            return searchedSkills;
        }
        return activeCategoriesSkills;
    }, [searchInput, activeCategoriesSkills, searchedSkills]);

    const filteredSkills = useMemo(() => {
        let fSkills = [...skills];

        if (hideUnselectedCategories && activeCategoriesSkills.length > 0) {
            fSkills = activeCategoriesSkills;
        }

        if (searchInput && hideUnsearchedSkills) {
            fSkills = fSkills.filter(skill => skill.name.toLowerCase().includes(searchInput.toLowerCase()));
        }

        return fSkills;
    }, [skills, hideUnselectedCategories, activeCategoriesSkills, searchInput, hideUnsearchedSkills]);

    const handleClickAddCategory = (categoryName: string) => {
        const newActiveCategories = [...activeCategories, categoryName];
        setActiveCategories(newActiveCategories);
    }

    const handleClickRemoveCategory = (categoryName: string) => {
        const newActiveCategories = activeCategories.filter((category) => category !== categoryName);
        setActiveCategories(newActiveCategories);
    }

    const HandleSearchInputChange = (e: any) => {
        setSearchInput(e.target.value);
    }

    return (
        <>
            <Typography variant="h6" align="center" gutterBottom>
                {t('resume.skill.clickFilter')}
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1} mb={2}>
                {categories.map((category) => {
                    if (activeCategories.includes(category.name)) {
                        return <Chip 
                        key={category.name} 
                        label={category.name} 
                        color="primary" 
                        onClick={() => handleClickRemoveCategory(category.name)} 
                        onDelete={() => handleClickRemoveCategory(category.name)} 
                        aria-label={t("resume.skill.removeCategory", { category: category.name })} />
                    }
                    else {
                        return <Chip        
                        key={category.name} 
                        label={category.name} 
                        color="primary" 
                        variant="outlined" 
                        onClick={() => handleClickAddCategory(category.name)} 
                        aria-label={t("resume.skill.addCategory", { category: category.name })}
                        />
                    }
                })}
                <FormGroup>
                    <FormControlLabel control={<Switch value={hideUnselectedCategories} onChange={(e) => setHideUnselectedCategories(e.target.checked)} />} label={t("resume.skill.hideUnselected.category")} />
                </FormGroup>
            </Box>
            <Box>
                {searchBar && (
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center" mb={2} gap={1} >
                        <Autocomplete
                            sx={{ width: 300 }}
                            onChange={(_, v) => {
                                setSearchInput(v?.label ?? '');
                            }}
                            disablePortal
                            inputValue={searchInput}
                            options={skills.map(skill => ({ label: skill.name }))}
                            renderInput={(params) => {
                                return (
                                    <Box sx={{ position: 'relative' }}>
                                        <TextField
                                            {...params}
                                            onChange={HandleSearchInputChange}
                                            label={t("resume.skill.search")}
                                            size="small"
                                        />
                                    </Box>
                                )
                            }}
                        />
                        <FormGroup>
                            <FormControlLabel control={<Switch value={hideUnsearchedSkills} onChange={(e) => setHideUnsearchedSkills(e.target.checked)} />} label={t("resume.skill.hideUnselected.search")} />
                        </FormGroup>
                    </Box>
                )}
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
                {filteredSkills.map((skill) => {
                    const isActive = activeSkills.includes(skill);
                    return <Chip key={skill.id} label={skill.name} color="secondary" variant={isActive ? "filled" : "outlined"} />
                })}
            </Box>
        </>
    )
}

export default SkillList;