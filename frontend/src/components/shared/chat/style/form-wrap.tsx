import {styled} from "@mui/material/styles";
import {AppBar} from "@mui/material";

const ChatFormWrap = styled(AppBar)(({theme}) => ({
    justifyContent: "center",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#eeeeee",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
        padding: "12px",
    },
}))

export default ChatFormWrap