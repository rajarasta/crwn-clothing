import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.util";

export const fetshCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetshCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCES,
  payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetshCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetshCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionFailure(error.message)));
  };
};
