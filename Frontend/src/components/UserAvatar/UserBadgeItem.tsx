import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { UserInfo } from '../../Context/ChatProvider';

interface UserBadgeItemProps {
    handleFunction: () => void;
    user: UserInfo;
    admin: string;
}

const UserBadgeItem: React.FC<UserBadgeItemProps> = ({ user, handleFunction, admin }) => {
    return (
        <Box
            display="inline-flex"
            alignItems="center"
            px={2}
            py={1}
            borderRadius="8px"
            m={1}
            mb={2}
            bgcolor="success.main"
            color="white"
            fontSize={12}
            sx={{ cursor: 'pointer' }}
            onClick={handleFunction}
        >
            <Badge color="secondary">
                {user.name}
            </Badge>
            {admin === user._id && <span> (Admin)</span>}
            <IoCloseCircleOutline style={{ marginLeft: 4, fontSize: 20 }} />
        </Box>
    );
};

export default UserBadgeItem;
