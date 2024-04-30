import React from 'react';
import MarketSearch from '../components/MarketSearch';
import MarketCard from '../components/MarketCard';
import { useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../provider/LanguageProvider";
import { getSearchBotList } from '../service/bot';
import { useEffect } from 'react';
import { useState } from 'react';
// bot市场
const MarketPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const [bots, setBots] = useState([]); // [botListType
    const getSearchBots = async () => {
        let response = await getSearchBotList(pageIndex, pageSize, searchParams.get("keyword") || "");
        console.log(response);
        setBots(response.bots);
    }

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        getSearchBots();
    }, [searchParams]);

    console.log("tabValue", tabValue);

    const keyword = searchParams.get("keyword");

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    }

    return (
        <div className='nav'>
            <div style={{ marginTop: '100px' }}>
                <MarketSearch tabValue={tabValue} setTabValue={setTabValue} onChange={handleSearch}></MarketSearch>
            </div>
            <div style={{ marginTop: '20px' }}>
                <MarketCard bots={bots}></MarketCard>
            </div>
        </div>
    );
};

export default MarketPage;