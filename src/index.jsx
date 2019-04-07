import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Posts from './posts';
import Post from './post';
import Categories from './categories';
import Tags from './tags';
import Products from './products';
import Product from './product';
import Page from './page';

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

                <Route exact path={PrimitiveSettings.path + 'tag'} component={withRouter(Tags)} />
                <Route exact path={PrimitiveSettings.path + 'tag/:slug'} component={withRouter(Post)} />

                <Route exact path={PrimitiveSettings.path + 'products'} component={withRouter(Products)} />
                <Route exact path={PrimitiveSettings.path + 'products/:product'} component={withRouter(Product)} />
                
                <Route exact path={PrimitiveSettings.path + ':slug'} component={withRouter(Page)} />
            </Switch>
        </main>
        <Footer />
    </div>
);

// Routes
const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

render(
    (routes), document.getElementById('page')
);