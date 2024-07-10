import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Divider, ListItemButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import '../css/BotChatPage.css';
import theme from './theme';
const ChatHistoryItem = (
    {
        title,
        message,
        selected,
        onClick,
        onDelete
    }
        : {
            title: string,
            message: string,
            selected: boolean,
            onClick: () => void,
            onDelete: () => void
        }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleMenuClose = (event: React.MouseEvent<HTMLLIElement>) => {
        setAnchorEl(null);
        event.stopPropagation();
    };
    const {t} = useTranslation();

    return (
        <ListItemButton
            className="drawer-item chat-history-item"
            style={{ backgroundColor: selected ? theme.palette.secondary.main : "white" , display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
            onClick={() => { onClick(); console.log('item clicked')}}
        >
            <div className="drawer-item-container">
                <div className="drawer-item-title">{title}</div>
                <div className="drawer-item-content"
                    style={{ color: theme.palette.primary.light }}>{message}</div>
            </div>
            <div>
                <Button
                    onClick={handleMenuClick}
                >
                    <MenuIcon data-testid="menu-icon" />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem 
                        onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                            onDelete();
                            handleMenuClose(e);
                        }
                    }>
                        <DeleteIcon />
                        <div className="drawer-item-menu">{t('Delete')}</div>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ArchiveIcon />
                        <div className="drawer-item-menu">{t('Archive')}</div>
                    </MenuItem>
                </Menu>
            </div>
        </ListItemButton>
    );
};

export default ChatHistoryItem;
