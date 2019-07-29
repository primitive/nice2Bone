import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Page from './page';
import Post from './post';
import Posts from './posts';
import Jokes from './jokes';
import Joke from './joke';
import Categories from './categories';
import Tags from './tags';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-7143300-34');

// Load the Sass file
require('./style.scss');

const App = () => (

    <div id="page-inner">
        <Header />
        <main id="content">
            <Switch>
                <Route exact path={PrimitiveSettings.path} component={withRouter(Posts)} />
                <Route exact path={PrimitiveSettings.path + 'posts/:slug'} component={withRouter(Post)} />
                
                <Route exact path={PrimitiveSettings.path + 'category/'} component={withRouter(Categories)}/>
                <Route exact path={PrimitiveSettings.path + 'category/:slug'} component={withRouter(Categories)}/>

                <Route exact path={PrimitiveSettings.path + 'tag/'} component={withRouter(Tags)} />
                <Route exact path={PrimitiveSettings.path + 'tag/:slug'} component={withRouter(Post)} />

                <Route exact path={PrimitiveSettings.path + 'think/:slug'} component={withRouter(Page)} />
                <Route exact path={PrimitiveSettings.path + 'life/:slug'} component={withRouter(Page)} />

                <Route exact path={PrimitiveSettings.path + 'jokes/'} component={withRouter(Jokes)} />
                <Route exact path={PrimitiveSettings.path + 'jokes/:slug'} component={withRouter(Joke)} />

                <Route path={PrimitiveSettings.path + ':slug'} component={withRouter(Page)} />
                
            </Switch>
        </main>
        <Footer />
    </div>
);

// Routes
const routes = (
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
);

render(
    (routes), document.getElementById('page')
);