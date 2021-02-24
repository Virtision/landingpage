import React, {Component} from 'react';
import PropTypes from 'prop-types';

export const toSearchString = (searchParams = {}) => {
    return Object.keys(searchParams).map(key =>
        `${key}=${encodeURIComponent(searchParams[key])}`
    ).join('&');

};

export const createMailtoLink = (email, headers) => {
    let link = `mailto:${email}`;
    if (headers) {
        link += `?${toSearchString(headers)}`;
    }
    return link;
};

export class Mailto extends Component {
    constructor(props){
        super(props)
    }

    /**
     * @param email - of the client that maintains the scene
     */
    logMailToEvent() {
      const {email} = this.props;
      gtag('event', 'Contact', {
        'event_category': 'Email',
        'event_label': email
      });
    }

    render() {
        return (this.props.obfuscate ? this.renderObfuscatedLink() : this.renderLink());
    }

    renderLink() {
        const {email, obfuscate, headers, children, ...others} = this.props;
        return (
            <a href={createMailtoLink(email, headers)} {...others} onClick={this.logMailToEvent.bind(this)}>
                {children}
            </a>
        );
    }

    renderObfuscatedLink() {
        const {email, obfuscate, headers, children, ...others} = this.props;
        return (
            <a onClick={this.handleClick.bind(this)} href="mailto:obfuscated" {...others}>
                {children}
            </a>
        );
    }

    handleClick(event) {
        event.preventDefault();
        const {email, headers} = this.props;
        window.location.href = createMailtoLink(email, headers);
    }
}

Mailto.propTypes = {
    children: PropTypes.node.isRequired,
    email: PropTypes.string.isRequired,
    headers: PropTypes.object,
    obfuscate: PropTypes.bool
};

Mailto.defaultProps = {
    obfuscate: false
};

export default Mailto;
