import { AppBar, Avatar, Button, Grid, IconButton, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import logo from "../raccoomender.png";


export default function Header(props) {
    const {loggedIn,handleChange} = props;
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate("/");
    };

    const handleClickLogin = () => {
        navigate("/login");
    };

    const handleClickProfile = () => {
        // TODO
    }

    const handleClickCreate = () => {
        navigate("/create");
    }
 
    return (
        <>
        <AppBar 
            sx={{
                backgroundColor: "#4B6584",
            }}>
            <Toolbar>
                <Grid 
                    container
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                    <Grid 
                        item
                        sx={{
                            cursor: "pointer"
                        }}
                        onClick={handleClickLogo}>
                        <Grid
                            container
                            sx={{
                                alignItems: "center"
                            }}>
                            <Grid 
                                item>
                                <img 
                                    src={logo} 
                                    width={50}
                                    alt="logo">
                                </img>
                            </Grid>
                            <Grid
                                item>
                                <Typography
                                    color="#ffffff"
                                    variant="h5">
                                    Raccoomender
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid 
                        item
                        sx={{
                            justifyContent: "center",
                            display: "inline-block"
                        }}>
                        <Grid
                            item
                            sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: "4px",
                                float: "left",
                                marginRight: "20px",
                                position: "relative"
                            }}>
                            <Grid
                                sx={{
                                    alignItems: 'center',
                                    height: "100%",
                                    justifyContent: 'center',
                                    position: 'absolute'
                                }}>
                                <SearchIcon 
                                    sx={{ 
                                        color: "#000000",
                                        height: "100%",
                                        left: "1ch",
                                        position: "absolute" 
                                    }}/>
                            </Grid>
                            <InputBase
                                sx={{
                                    color: "#000000",
                                    paddingLeft: "6ch",
                                    width: "40ch"
                                }}
                                onChange={(e) => {handleChange(e.target.value)}}
                                placeholder="Search Raccoomender..."/>
                            
                        </Grid>
                        <Grid
                            sx={{
                                float: "right"
                            }}>
                            { loggedIn ? (
                                <AddCircleIcon
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={handleClickCreate}>
                                </AddCircleIcon>
                            ) : null}
                        </Grid>
                    </Grid>
                    <Grid
                        item>
                        {loggedIn ? (
                            <IconButton
                                onClick={handleClickProfile}>
                                <Avatar></Avatar>
                            </IconButton>
                        ) : (
                            <Button 
                                sx={{
                                    backgroundColor: "#ffffff",
                                    color: "#000000",
                                }}
                                variant="filled" 
                                onClick={handleClickLogin}>
                                Login
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Toolbar >
        </AppBar>
        <Toolbar/>
        <Toolbar/>
        </>
    );

}
