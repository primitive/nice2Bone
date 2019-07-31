import React from "react";
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import { isEmpty } from './helpers';
import NotFound from "./not-found";
import He from "he";
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };

  }

  componentWillUnmount() {
    console.log("unmount page");
  }

  componentDidMount() {
    this.fetchData();
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('page');
  }

  fetchData = () => {
    const url = window.location.href.split("/");
    const slug = url.pop() || url.pop();

    fetch(`${PrimitiveSettings.URL.api}pages?slug=${slug}`)
      .then(response => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ page: res[0] });
        document.title = isEmpty(res[0]) ? "404 Page Not Found | Nice2b.me" : (He.decode(res[0].title.rendered) + " | Nice2b.me");
        //console.log("response", res[0]);
      });
  };

  renderPage() {
    if (this.state.page.title) {
      if (this.state.page.page_header) {
        return (
          <article className="card hasHeader">
            <img className="card-img-top" src={this.state.page.page_header} alt={He.decode(this.state.page.title.rendered)}></img>
            <div className="card-body">
              <h1 className="card-title" dangerouslySetInnerHTML={{ __html: this.state.page.title.rendered }} />
              <p
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: this.state.page.content.rendered
                }}
              />
            </div>
          </article>
        );
      }
      else {
        return (
          <article className="card noHeader">
            <div className="card-body">
              <h1 className="card-title" dangerouslySetInnerHTML={{ __html: this.state.page.title.rendered }} />
              <p
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: this.state.page.content.rendered
                }}
              />
            </div>
          </article>
        );
      }
    }
    else {
      this.renderEmpty();
    }
  }

  renderEmpty() {
    return <NotFound />;
  }

  render() {
    return (
      <div className="container post-entry">
        {this.state.page ? this.renderPage() : this.renderEmpty()}
      </div>
    );
  }
}

//export default Page;
export default withRouter(Page);