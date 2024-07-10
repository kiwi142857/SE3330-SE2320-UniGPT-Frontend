import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import { PluginCallsCard } from '../components/CallsCard';
import DetailCard from '../components/DetailCard';
import DetailCarousel from '../components/DetailCarousel';
import '../css/App.css';
import '../css/DetailPage.css';
import { useErrorHandler } from '../hooks/errorHandler';
import { getPluginDetail, pluginDetailInfo } from '../service/PluginDetail';
import { Bot } from '../service/market';

// plugin详情页
const PluginDetailPage: React.FC = () => {
    const [plugin, setPlugin] = useState<pluginDetailInfo | null>(null);
    const {messageError, ErrorSnackbar} = useErrorHandler();

    let { id } = useParams<{ id: string }>();

    const getPlugin = async () => {
        if (id) {
            await getPluginDetail(id)
                .then((res) => setPlugin(res))
                .catch(() => messageError("Failed to get plugin detail"));
        }
    }

    useEffect(() => {
        getPlugin();
    }, [id]);

    return (
        <>
            {plugin && id &&
                <div className="main-container bot-detail-container">
                    <ErrorSnackbar />
                    <DetailCard
                        id={plugin.id}
                        name={plugin.name}
                        author={plugin.creator}
                        authorId={plugin.creatorId}
                        avatar={plugin.avatar}
                        description={plugin.description}
                        likeNumber={"0"}
                        starNumber={"0"}
                        isLiked={false}
                        isStarred={false}
                        canEdit={plugin.asCreator || plugin.asAdmin}
                        forBot={false}
                    />

                    <PluginCallsCard bots={plugin.bots} />

                    <DetailCarousel photos={plugin.photos} />

                    <Typography
                        sx={{ color: 'primary.light' }}
                        align='left'
                    >
                        <p className='bot-detail-long'>
                            {plugin.detail}
                        </p>
                    </Typography>
                </div>
            }
        </>
    );
}

export default PluginDetailPage;
