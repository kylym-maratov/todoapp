import { ButtonGroup, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';

const style = {
    menu: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

export const Todos = () => {
    const todos = [1];
    return (
        <Box>
            {todos.length ?
                <Box>
                    <Box sx={{ ...style.menu }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Todos
                        </Typography>
                        <ButtonGroup >
                            <IconButton type="button" >
                                <DashboardIcon />
                            </IconButton>
                            <IconButton type="button">
                                <FormatListBulletedIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Box>

                </Box> :
                <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                    You don't have any tasks created yet, you can create a new task above in the input box. If something is not clear go to the info page
                </Typography>}
        </Box>
    )
}