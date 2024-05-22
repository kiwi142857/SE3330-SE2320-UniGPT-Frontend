import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../provider/LanguageProvider";

export function ListButton() {

    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const unorderListIConUrl = process.env.PUBLIC_URL + '/assets/unordered_list.png';

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button onMouseEnter={handleMouseEnter}>
                <img src={unorderListIConUrl} alt="Unorder List" style={{ height: 40 }} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                MenuListProps={{ onMouseLeave: handleMouseLeave }}
            >
                <MenuItem onClick={handleMouseLeave}>
                    <Link to="/market" style={{ textDecoration: 'none', color: 'inherit' }}>{t("Market")}</Link>
                </MenuItem>
                <MenuItem onClick={handleMouseLeave}>
                    <Link to="/botedit" style={{ textDecoration: 'none', color: 'inherit' }}>{t("Bot Create")}</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}