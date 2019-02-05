import React                    from 'react';
import ReactDOM                 from 'react-dom';
import {BrowserRouter,Route}    from 'react-router-dom';
import Home                     from './Modules/Home/Components/Home.screen';


// export const store = createStore(
//     mainReducer,
//     applyMiddleware(thunk, BrowserRouter)
// );



ReactDOM.render((

    <BrowserRouter>
        <Route path='/' component={Home} />
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
