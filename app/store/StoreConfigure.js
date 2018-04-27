import {createStore,applyMiddleware} from 'redux';
import  thunkMiddleware from 'react-redux';
import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer,initialState)
}

/*const loggerMiddleware = createLogger();
export const store = createStore(
    reducers,
    applyMiddleware(
        thunk, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
);*/
