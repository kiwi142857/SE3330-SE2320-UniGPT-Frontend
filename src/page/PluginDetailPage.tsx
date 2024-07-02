import React from 'react';
import { useParams } from 'react-router-dom';

const PluginDetailPage = () => {

    let { id } = useParams<{ id: string }>();

    return (
        <div style={{ marginTop: '200px' }}>
            <h1>{"Plugin " + id + " Detail Page"}</h1>
        </div>
    );
}

export default PluginDetailPage;