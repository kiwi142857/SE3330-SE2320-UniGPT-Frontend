import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useErrorHandler } from '../hooks/errorHandler';
import { LanguageContext } from '../provider/LanguageProvider';
import { Plugin, getSearchPluginList } from '../service/market';
import { PluginSelectList } from './PluginList';
import SearchBar from './Search';

function PluginSelectDialog({open, handleClickClose, plugins, setPlugins} :
     {  open: boolean, 
        handleClickClose: () => void, 
        plugins: Plugin[],
        setPlugins: React.Dispatch<React.SetStateAction<Plugin[]>>
    }) {

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

      useEffect(() => {
          i18n.changeLanguage(context?.language);
      }, [context?.language, i18n]);

      const [searchParams, setSearchParams] = useSearchParams();
      const pageIndexStr = searchParams.get("pageIndex");
      const pageSizeStr = searchParams.get("pageSize");
      const [pageIndex, setPageIndex] = useState(pageIndexStr != null ? Number.parseInt(pageIndexStr) - 1 : 0);
      const [tabValue, setTabValue] = useState(1);
      const [totalPage, setTotalPage] = useState(0);
      const {messageError, ErrorSnackbar} = useErrorHandler();

      const [marketPlugins, setMarketPlugins] = useState<Plugin[]>([]);

      const getSearch = async () => {
        // let order = tabValue === 0 ? "latest" : "like";
        let order = "latest";
        const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 15;
            getSearchPluginList(pageIndex, pageSize, searchParams.get("keyword") || "", order)
                .then(response => {
                    setMarketPlugins(response.plugins);
                    setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
                })
                .catch(e => {
                    messageError("Failed to get plugin list: " + e.message);
                });
        }

    useEffect(() => {
        getSearch();
    }, [searchParams, tabValue]);

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("page change", value - 1);
        setPageIndex(value - 1);
        setSearchParams({ ...searchParams, pageIndex: (value).toString() });
    };

    return (
        <Dialog open={open} onClose={handleClickClose} fullWidth maxWidth='xl'>
                <DialogTitle>
                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', fontSize: '28px' }}>
                        {t('Select Plugin')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <ErrorSnackbar />
                    <SearchBar
                        tabValue={tabValue} 
                        setTabValue={setTabValue} 
                        onChange={handleSearch}
                        tabNames={['Latest', 'Hottest']}
                    >
                    </SearchBar>
                    <div style={{ marginTop: '20px' }} className='market-card'>
                        <PluginSelectList 
                            allPlugins={marketPlugins}
                            selectedPlugins={plugins}
                            setSelectedPlugins={setPlugins}
                        />
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <Pagination 
                            count={totalPage} 
                            page={pageIndex + 1} 
                            onChange={handlePageChange} 
                            className='pagination' 
                        />
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleClickClose} variant="contained" color="primary">
                        {t('Confirm')}
                    </Button>
                </DialogActions>
          </Dialog>
    );
}

export default PluginSelectDialog;