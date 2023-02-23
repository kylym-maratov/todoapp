import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useContext, useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppContext } from "../store";
import { useAuth } from "../hooks/use.auth";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export const Menu = () => {
    const { state, dispatch } = useContext(AppContext);
    const { openMenu, userData } = state;
    const { logout } = useAuth()


    function logoutUser() {
        logout()
        dispatch({ type: "SET_OPEN_MENU", payload: false });
    }

    return (
        <Drawer
            anchor={"right"}
            open={openMenu}
            onClose={() => dispatch({ type: "SET_OPEN_MENU", payload: false })}
        >
            <Box
                role="presentation"
                sx={{ width: 300 }}
            >
                <List>
                    {[userData ? userData.username : "Profile", 'In trash', 'Settings', 'Logout'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={index === 3 ? logoutUser : () => { }}>
                                <ListItemIcon>
                                    {index === 0 && <AccountBoxIcon />}
                                    {index === 1 && <DeleteSweepOutlinedIcon />}
                                    {index === 2 && <SettingsIcon />}
                                    {index === 3 && <LogoutIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>

    )
}