import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {
            light: "#003892",
            main: "#003892",
            dark: "#003892",
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#f6e009",
            main: "#f6e009",
            dark: "#f6e009",
            contrastText: "#1f1f1f",
        },
        info: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff",
            contrastText: "#000000",
        },
        background: {
            default: "#2d293a",
            paper: "#1c1b21"
        },
        mode: "dark"
    },
    typography: {
        fontFamily: "'Inter', sans-serif"
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "inherit",
                    borderRadius: 10
                },
                sizeLarge: {
                    fontSize: 18
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1f1f1f",
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 8px 24px"
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                regular: {
                    minHeight: "54px"
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
                    backgroundColor: "#212121"
                }
            }
        }
    }
})

export default darkTheme