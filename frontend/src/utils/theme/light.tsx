import {createTheme} from "@mui/material";

const lightTheme = createTheme({
    palette: {
        primary: {
            light: "#7A0BC0",
            main: "#7A0BC0",
            dark: "#7A0BC0",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#1f1f1f",
            main: "#1f1f1f",
            dark: "#1f1f1f",
            contrastText: "#ffffff",
        },
        info: {
            light: "#1f1f1f",
            main: "#1f1f1f",
            dark: "#1f1f1f",
            contrastText: "#ffffff",
        },
        background: {
            default: "#5b556c",
            paper: "#ffffff"
        },
        mode: "light"
    },
    typography: {
        fontFamily: "'Inter', sans-serif"
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "inherit",
                    borderRadius: 8
                },
                sizeLarge: {
                    fontSize: 18
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#7A0BC0",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f9f9f9"
                }
            }
        }
    }
})

export default lightTheme