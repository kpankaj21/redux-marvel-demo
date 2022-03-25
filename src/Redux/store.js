import { applyMiddleware, compose, createStore } from 'redux'
// import rootReducer from './Redux/Reducers/CartReducer'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { rootReducer } from  "./reducer/index"
const persistConfig = {
  key: 'root',
  storage
}   
const persistedReducer = persistReducer(persistConfig,rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store);
export   { store , persistor }