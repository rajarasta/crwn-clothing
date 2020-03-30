import { takeLatest, call, put } from "redux-saga/effects";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.util";
import {
  fetchCollectionFailure,
  fetchCollectionsSuccess
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  yield console.log("i am fired");

  try {
    const collectionRef = firestore.collection("collections");

    const shapshot = yield collectionRef.get();
    //Call takes first parameter as a function and takes other parameters as parameters of that function
    //Gives control of that to call to saga middleware
    const collectionMap = yield call(convertCollectionSnapshotToMap, shapshot);
    //Inside sagas functions are not dispathed with dispath function, but with "put"
    yield put(fetchCollectionsSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure);
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
