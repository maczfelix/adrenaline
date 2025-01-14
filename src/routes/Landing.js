import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Popup from "../components/Popup";
import Button from "../components/Button";
import Header from "../containers/Header";

import { withRouter } from "../utilities";

import "./Landing.css";

class Landing extends Component {
	constructor(props) {
		super(props);

		this.onOpenPopup = this.onOpenPopup.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
		this.onSetPopupRef = this.onSetPopupRef.bind(this);

		this.state = { askForAPIKey: false };
	}

	onOpenPopup() {
		window.gtag("event", "click_set_api_key");

		this.setState({ askForAPIKey: true });
	}

	onSubmit() { this.setState({ askForAPIKey: false }); }

	onClosePopup(event) {
    if (this.popupRef && this.popupRef.contains(event.target)) {
      return;
    }

    this.setState({ askForAPIKey: false });
  }

	onSetPopupRef(ref) { this.popupRef = ref; }

	render() {
		const { location } = this.props.router;
		const { askForAPIKey } = this.state;

		window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });

    return (
			<Fragment>
				{askForAPIKey ? (
          <div className="popupLayer" onClick={this.onClosePopup}>
            <Popup
              onSubmit={this.onSubmit}
              setRef={this.onSetPopupRef}
            />
          </div>
        ) : null}
	      <div className="landing">
	        <Header onClick={this.onOpenPopup} isPlaygroundActive={false} />
	        <div className="landingBody">
	          <div className="landingLHS">
	            <div className="landingHeading">
	              <span className="landingTitle">Stop plugging your errors into StackOverflow</span>
	              <p className="landingSubtitle">Adrenaline is a debugging assistant powered by the OpenAI Codex. It can fix and explain your broken code in seconds.</p>
	            </div>
	            <div className="ctaButtons">
	              <Link to="/playground">
	                <Button
										className="getStartedButton"
										isPrimary
										onClick={() => window.gtag("event", "click_get_started")}
									>
	                  Fix your code
	                </Button>
	              </Link>
	              <Button
									className="githubButton"
									isPrimary={false}
									onClick={() => window.gtag("event", "click_view_on_github")}
								>
	                <a href="https://github.com/shobrook/adrenaline/" target="_blank">View on Github</a>
	              </Button>
	            </div>
	          </div>
	          <img className="demoImage" src="demo.png" />
	        </div>
	      </div>
			</Fragment>
    );
	}
}

export default withRouter(Landing);
