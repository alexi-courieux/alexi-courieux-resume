import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ILoadingProps {
    messageKey?: string;
    sx?: any;
}

const Loading : FC<ILoadingProps> = ({messageKey, sx}) => {
    const { t } = useI18n();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={sx}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: '16px' }}>
                {messageKey ? t(messageKey) : t('common.loading')}
            </Typography>
        </Box>
    );
}

export default Loading;