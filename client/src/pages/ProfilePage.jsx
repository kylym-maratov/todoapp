import { Box, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useAxios } from "../api/api";
import { Header } from "../components/Header";



export default function ProfilePage() {
    const { requestApi } = useAxios();
    const [user, setUser] = useState(null);

    useEffect(() => {
        requestApi("/api/user/get-user").then(({ data }) => {
            setUser(data.user);
        })
    }, [])

    return (
        <>
            <Header />
            {user &&
                <Box display="flex" justifyContent="center" marginTop={10}>
                    <Box textAlign="center">
                        <Typography>
                            {user.firstname + " " + user.lastname}
                        </Typography>
                        <Typography>
                            {user.username}
                        </Typography>
                        <Typography>
                            {user.email}
                        </Typography>
                        <Typography>
                            {user.phone}
                        </Typography>
                        <Typography>
                            {user.createdAt}
                        </Typography>
                    </Box>
                </Box>}
        </>
    )
}