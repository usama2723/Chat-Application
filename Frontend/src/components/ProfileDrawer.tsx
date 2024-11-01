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
import { ChatState } from "../Context/ChatProvider";

const ProfileDrawer = ({ openDrawer, toggleDrawer }
    :
    {
        openDrawer: boolean;
        toggleDrawer: () => void;
    }) => {

    const { user } = ChatState();
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
                    src={user?.pic}
                    alt={user?.name}
                />
                <Box
                    sx={{
                        paddingTop: 5,
                        paddingLeft: 3,
                    }}>
                    <Typography
                        sx={{

                            color: "#05805d",
                            fontSize: "13px",
                        }}
                    >
                        Your Name
                    </Typography>
                    <Typography sx={{ paddingTop: 3, fontSize: "20px" }}>
                        {user?.name}
                    </Typography>
                    <Typography
                        sx={{
                            paddingTop: 3,
                            color: "#05805d",
                            fontSize: "13px",
                        }}
                    >
                        Your Email
                    </Typography>
                    <Typography
                        sx={{
                            paddingTop: 3,
                            fontSize: "15px",
                            color: "gray",
                        }}
                    >
                        Email: {user?.email}

                    </Typography>
                    <Typography
                        sx={{
                            color: "#05805d",
                            paddingTop: 3,
                            fontSize: "13px",
                        }}
                    >
                        About
                    </Typography>
                    <Typography
                        sx={{
                            paddingTop: 3,
                            fontSize: "17px",
                        }}
                    >
                        ∆™ ♾️ $impli¢îTy îs My St¥le~ 😇
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default ProfileDrawer;
