import { Box } from "@mui/system";
import React from "react";
import { AddItem } from "../components/AddItem";



export default function DashBoardPage() {
    return (
        <>
            <Box>
                <Box>
                    <AddItem />
                </Box>
            </Box>
        </>
    )
}