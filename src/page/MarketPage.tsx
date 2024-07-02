import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import { BotList, BotListType } from '../components/BotList';
import { PluginList } from '../components/PluginList';
import SearchBar, { SearchTabs } from '../components/Search';
import '../css/Market.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from "../provider/LanguageProvider";
import { Bot, Plugin, getSearchBotList, getSearchPluginList } from '../service/market';

// bot市场
const MarketPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const [pageIndex, setPageIndex] = useState(pageIndexStr != null ? Number.parseInt(pageIndexStr) - 1 : 0);
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 15;
    const [tabValue, setTabValue] = useState(1);
    const [marketValue, setMarketValue] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const {messageError, ErrorSnackbar} = useErrorHandler();

    const [bots, setBots] = useState<Bot[]>([]); // [botListType
    const [plugins, setPlugins] = useState<Plugin[]>([]);

    const getSearch = async () => {
        let order = tabValue === 0 ? "latest" : "like";
        if (marketValue === 1) {
            getSearchPluginList(pageIndex, pageSize, searchParams.get("keyword") || "", order)
                .then(response => {
                    setPlugins(response.plugins);
                    setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
                })
                .catch(e => {
                    messageError("Failed to get plugin list: " + e.message);
                });
        } else {
            getSearchBotList(pageIndex, pageSize, searchParams.get("keyword") || "", order)
                .then(response => {
                    setBots(response.bots);
                    setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
                })
                .catch(e => {
                    messageError("Failed to get bot list: " + e.message);
                });
        }
    }

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        getSearch();
    }, [searchParams, tabValue, marketValue]);

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("page change", value - 1);
        setPageIndex(value - 1);
        setSearchParams({ ...searchParams, pageIndex: (value).toString() });
    };

    const botListType: BotListType = {
        type: 'Market'
    };

    return (
        <div className='nav'>
            <ErrorSnackbar />
            <div className='market-choose'>
                <SearchTabs
                    tabValue={marketValue}
                    setTabValue={setMarketValue}
                    tabNames={['Bot Market', 'Plugin Market']}
                >
                </SearchTabs>
            </div>
            <div style={{ marginTop: '150px' }}>
                <SearchBar
                    tabValue={tabValue} 
                    setTabValue={setTabValue} 
                    onChange={handleSearch}
                    tabNames={['Latest', 'Hottest']}
                >
                </SearchBar>
            </div>
            <div style={{ marginTop: '20px' }} className='market-card'>
                {marketValue === 0 ? 
                    <BotList type={botListType} bots={bots}></BotList> 
                    : <PluginList plugins={plugins}></PluginList>
                }
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Pagination 
                    count={totalPage} 
                    page={pageIndex + 1} 
                    onChange={handlePageChange} 
                    className='pagination' 
                />
            </div>
        </div>
    );
};
export default MarketPage;