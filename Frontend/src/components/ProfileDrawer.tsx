import {
    AppBar,
    Box,
    Drawer,
    Avatar,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfileDrawer = ({ openDrawer, toggleDrawer }
    :
    {
        openDrawer: boolean;
        toggleDrawer: () => void;
    }) => {
    return (
        <Drawer
            variant="persistent"
            open={openDrawer}
            onClose={toggleDrawer}
            PaperProps={{
                sx: {
                    backgroundColor: "#111b21",
                    color: "white",
                    margin: "20px",
                },
            }}
        >
            <AppBar
                position="static"
                sx={{ backgroundColor: "#202c33", height: 110 }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer}
                        sx={{ marginTop: 7 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography
                        sx={{ marginTop: 7, marginLeft: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Profile
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    width: 450,
                }}
                role="presentation"
            >
                <Avatar
                    sx={{
                        width: 200,
                        height: 200,
                        margin: "auto",
                        marginTop: 5,
                    }}
                    src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                />
                <Typography
                    sx={{
                        paddingTop: 5,
                        paddingLeft: 3,
                        color: "#05805d",
                        fontSize: "13px",
                    }}
                >
                    Your Name
                </Typography>
                <Typography sx={{ paddingTop: 3, paddingLeft: 3, fontSize: "17px" }}>
                    〽️R $@m...♌
                </Typography>
                <Typography
                    sx={{
                        paddingTop: 3,
                        paddingLeft: 3,
                        fontSize: "15px",
                        color: "gray",
                    }}
                >
                    This is not your username or pin. This name will be visible to your
                    contacts.
                </Typography>
                <Typography
                    sx={{
                        color: "#05805d",
                        paddingTop: 5,
                        paddingLeft: 3,
                        fontSize: "13px",
                    }}
                >
                    About
                </Typography>
                <Typography
                    sx={{
                        paddingTop: 3,
                        paddingLeft: 3,
                        fontSize: "17px",
                    }}
                >
                    ∆™ ♾️ $impli¢îTy îs My St¥le~ 😇
                </Typography>
            </Box>
        </Drawer>
    );
};

export default ProfileDrawer;
