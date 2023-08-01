import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} >
        {props.children}
    </Tooltip>
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.primary.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.primary.main,
    },
}));


export default BootstrapTooltip
