import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors'
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    console.log(collection)
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
            {
                items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }

            </div>
        </div>
    )
}

/*state - overall reducer state, from the top
ownProps - props of the component that we are wrapping in the connect*/
const mapStateToProps = (state, ownProps) => (
    {
        collection: selectCollection(ownProps.match.params.collectionId)(state)

    })

export default connect(mapStateToProps)(CollectionPage);