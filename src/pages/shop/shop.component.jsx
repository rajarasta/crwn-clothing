import React from 'react';
import { Route } from 'react-router-dom';


import CollectionsOverview from '../../components/collection-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';



const ShopPage = ({ match }) => {
    return (
        /*Ako je stavljen page u Route, kad se do njega dode automatski su passani propsi match, location, history.*/
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    )
};

export default ShopPage;