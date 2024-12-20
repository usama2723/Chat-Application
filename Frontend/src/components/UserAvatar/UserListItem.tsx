import React from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import { UserInfo } from '../../Context/ChatProvider';

interface UserListItemProps {
    handleFunction: () => void;
    user: UserInfo;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, handleFunction }) => {
    console.log("User ID:", user._id);

    return (

        <Paper
            elevation={3}
            onClick={handleFunction}
            sx={{
                cursor: 'pointer',
                backgroundColor: '#2a3942',
                color: 'white',

                '&:hover': {
                    backgroundColor: '#38B2AC',
                    color: 'white',
                },
                width: '90%',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                marginBottom: 2,
                borderRadius: '8px',
            }}
        >
            <Avatar
                sx={{ marginRight: 2, cursor: 'pointer' }}
                alt={user.name}
                src={user.pic}
            />
            <Box>
                <Typography variant="subtitle1" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <b>Email: </b>{user.email}
                </Typography>
            </Box>
        </Paper>

    );
};


export default UserListItem;
