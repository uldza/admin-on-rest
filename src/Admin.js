import React, { PropTypes } from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';

import adminReducer from './reducer';
import crudSaga from './sideEffect/saga';
import CrudRoute from './CrudRoute';
import Layout from './mui/layout/Layout';
import withProps from './withProps';
import TranslationProvider from './i18n/TranslationProvider';
import { loadTranslations, DEFAULT_LOCALE } from './i18n/TranslationLoader';

const Admin = ({ restClient, dashboard, children, title = 'Admin on REST', theme, locale = DEFAULT_LOCALE, messages = {}, appLayout = withProps({ title, theme })(Layout) }) => {
    const resources = React.Children.map(children, ({ props }) => props);
    const firstResource = resources[0].name;
    const sagaMiddleware = createSagaMiddleware();
    const reducer = combineReducers({
        admin: adminReducer(resources),
        form: formReducer,
        routing: routerReducer,
    });
    const store = createStore(reducer, undefined, compose(
        applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
    sagaMiddleware.run(crudSaga(restClient));

    const history = syncHistoryWithStore(hashHistory, store);

    const customMessages = messages[locale] || messages[DEFAULT_LOCALE] || {};
    const translations = { ...loadTranslations(locale), ...customMessages };

    return (
        <TranslationProvider locale={locale} messages={translations}>
            <Provider store={store}>
                <Router history={history}>
                    {dashboard ? undefined : <Redirect from="/" to={`/${firstResource}`} />}
                    <Route path="/" component={appLayout} resources={resources}>
                        {dashboard && <IndexRoute component={dashboard} restClient={restClient} />}
                        {resources.map(resource =>
                            <CrudRoute
                                key={resource.name}
                                path={resource.name}
                                list={resource.list}
                                create={resource.create}
                                edit={resource.edit}
                                show={resource.show}
                                remove={resource.remove}
                                options={resource.options}
                            />,
                        )}
                    </Route>
                </Router>
            </Provider>
        </TranslationProvider>
    );
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Admin.propTypes = {
    restClient: PropTypes.func.isRequired,
    appLayout: componentPropType,
    dashboard: componentPropType,
    children: PropTypes.node,
    title: PropTypes.string,
    theme: PropTypes.object,
    locale: PropTypes.string,
    messages: PropTypes.object,
};

export default Admin;
