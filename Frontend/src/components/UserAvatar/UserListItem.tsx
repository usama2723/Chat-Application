import React from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
// import { ChatState } from '../../Context/ChatProvider';

interface UserListItemProps {
    handleFunction: () => void; 
    user: User;
}
interface User {
    name: string;
    email: string;
    pic: string;
}

const UserListItem: React.FC<UserListItemProps> = ({user, handleFunction }) => {
    
    return (
        <Paper
            elevation={3}
            onClick={handleFunction}
            sx={{
                cursor: 'pointer',
                backgroundColor: '#E8E8E8',
                '&:hover': {
                    backgroundColor: '#38B2AC',
                    color: 'white',
                },
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                padding: 2,
                marginBottom: 2,
                borderRadius: '8px',
            }}
        >
            {/* User Avatar */}
            <Avatar
                sx={{ marginRight: 2, cursor: 'pointer' }}
                alt={user.name}
                src={user.pic}
            />

            {/* User Info */}
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
