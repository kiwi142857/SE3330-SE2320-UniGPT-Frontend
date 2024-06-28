import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import SearchBar from '../components/Search';
import { UserList, UserListType } from '../components/UserList';
import '../css/Market.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { getSearchUserList } from '../service/user';

const UserListPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const [pageIndex, setPageIndex] = useState(pageIndexStr != null ? Number.parseInt(pageIndexStr) - 1 : 0);
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 15;
    const [tabValue, setTabValue] = React.useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [users, setUsers] = useState([]);
    const {messageError, ErrorSnackbar} = useErrorHandler();

    const getSearchUsers = async () => {
        let type = tabValue === 0 ? "id" : "name";
        
        await getSearchUserList(pageIndex, pageSize, searchParams.get("keyword") || "", type)
            .then(response => {
                setUsers(response.users || []);
                if(!response.total) response.total = 0;
                setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
            })
            .catch(e => {
                messageError("Failed to get user list: " + e.message);
            });
    };

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        getSearchUsers();
    }, [searchParams, tabValue]);

    console.log("users", users);

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("page change", value - 1);
        setPageIndex(value - 1);
        setSearchParams({ ...searchParams, pageIndex: (value).toString() });
    };

    const userListType: UserListType = {
        type: 'Market'
    };

    return (
        <div className='nav'>
            <ErrorSnackbar />
            <div style={{ marginTop: '100px' }}>
                <SearchBar
                    tabValue={tabValue} 
                    setTabValue={setTabValue} 
                    onChange={handleSearch}
                    tabNames={['ID', 'Name']}
                >
                </SearchBar>
            </div>
            <div style={{ marginTop: '20px' }} className='market-card'>
                <UserList type={userListType} users={users}></UserList>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPage} page={pageIndex + 1} onChange={handlePageChange} className='pagination' />
            </div>
        </div>
    );
};

export default UserListPage;