import React from "react";
import MicroSitePageProps from "./props";
import PropTypes from "prop-types"

export default
class MicroSitePage extends React.Component {

    constructor(props) {
        super(props);
        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        this.sectionRef = React.createRef();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.scrollToMe) {
            // this might not work in IE11
            window.scrollTo(0, 
                this.sectionRef
                    .current
                    .offsetTop
            );
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("scroll", this.onWindowScroll);
        this.notifyAboutVisible();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener("scroll", this.onWindowScroll);
    }

    onWindowScroll() {
        this.notifyAboutVisible();
    }

    onWindowResize() {
        this.notifyAboutVisible();
    }

    notifyAboutVisible(){
        this.props.onVisibilityChange(
            this.props.page, this.amIVisible()
        );
    }

    amIVisible(){
        if (this.sectionRef.current) {
            const clientRect = this.sectionRef.current.getBoundingClientRect();
            return (clientRect.top >= 0 
                        && clientRect.top < window.innerHeight)
                        ||
                    (clientRect.bottom >= 0 
                            && clientRect.bottom < window.innerHeight)
                        ||
                    (clientRect.top <= 0 && clientRect.bottom >= window.innerHeight);
        }
        return false;
    }

    render(){
        return (
            <section ref={this.sectionRef}>
                <h1>{this.props.page.title}</h1>
                <p>
                    {this.props.page.content}
                </p>
            </section>
        )
    }
    static propTypes() {
        return {
            page: MicroSitePageProps,
            onVisibilityChange: PropTypes.func.isRequired,
        };
    }
}
