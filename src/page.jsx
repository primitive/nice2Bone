import React from "react";
import { withRouter } from 'react-router';
import NotFound from "./not-found";

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
    console.log("mount page", this.props.match);
  }

  fetchData = () => {
    const url = window.location.href.split("/");
    const slug = url.pop() || url.pop();

    fetch(`${PrimitiveSettings.URL.api}pages?slug=${slug}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ page: res[0] });
      });
  };

  renderPage() {
    if (this.state.page.title) {
      return (
        <article className="card">
          <div className="card-body">
            <h1 className="card-title">{this.state.page.title.rendered}</h1>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: this.state.page.content.rendered
              }}
            />
          </div>
        </article>
      );
    } else {
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
export default withRouter(Page)