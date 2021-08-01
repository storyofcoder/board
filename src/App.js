import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/scss/main.scss";
import "./App.css"

// redux initilization
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./redux/State";
import Saga from "./redux/RootSagas";

// saga config
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Saga);

const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default App;