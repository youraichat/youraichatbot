import {styled} from "@mui/material/styles";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    minHeight: "56px",
    background: "transparent"
}));


export default DrawerHeader