import { FC } from "react";
import { useI18n } from "../hooks/useI18n";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from "@mui/material";

interface IErrorProps {
    messageKey?: string;
    retryFunction?: () => void;
    retryMessageKey?: string;
    sx?: any;
}

const Error : FC<IErrorProps> = ({messageKey, retryFunction, retryMessageKey, sx}) => {
    const { t } = useI18n();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={sx}>
            <ErrorIcon color="error" style={{ fontSize: 60 }} />
            <Typography variant="subtitle2" style={{ marginTop: '16px' }} color="error">
                {messageKey ? t(messageKey) : t('common.error')}
            </Typography>
            {retryFunction && (
                <Button variant="contained" color="error" onClick={retryFunction} style={{ marginTop: '16px' }}>
                    {retryMessageKey ? t(retryMessageKey) : t('common.retry')}
                </Button>
            )}
        </Box>
    );
}

export default Error;