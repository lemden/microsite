import React from "react";
import PropTypes from "prop-types"
import MicroSitePageProps from "./micrositepage/props";
import MicroSitePage from "./micrositepage";
import "./microsite.styles.css";

export default
class MicroSite extends React.Component {
    constructor(props) {
        super(props);
        this.visiblePage = null;
        this.pageVisibilities = this.props.pages.map(
            (page) => {
                return {
                    page,
                    visible: false,
                };
            }
        );
        this.state ={
            activePage: null,
            pageToScroll: null,
        }
    }

    onPageVisibleChange(page, visible) {
        this.pageVisibilities.filter(
            (pageVisibility) => pageVisibility.page === page
        )[0].visible = visible;
        const activePage = this.getActivePage();
        if (this.state.activePage !== activePage) {
            this.setState({ activePage });
        }
    }

    /**
     * basically select page we want to highlight in the menu
     * because sometimes more than on page is visible
     */
    getActivePage(){
        const activeIndexes = [];
        this.pageVisibilities
            .forEach((page, index) => {
                if (page.visible) {
                    activeIndexes.push(index);
                }
            });
        // technically possible
        if (activeIndexes.length === 0) {
            return null;
        }
        // something in a middle
        return  this.pageVisibilities[
            activeIndexes[
                Math.floor((activeIndexes.length - 1) / 2)
            ]
        ].page;
    }

    scrollTo(pageToScroll) {
        this.setState({
            pageToScroll
        }, () => {
            this.setState({ pageToScroll: null });
        })
    }

    render() {
        return (
            <>
                {/* I know not optimal, but easy to maintain */}
                <menu className={"main-menu"}>
                    {this.props.pages.map((page) => (
                        <span 
                            onClick={() => this.scrollTo(page)}
                            className={page === this.state.activePage ? "active": ""}
                            key={`menuForPageId${page.id}`}>
                            {page.linkTitle}
                        </span>
                    ))}
                </menu>
                <main className={"main-content"}>
                    {this.props.pages.map(
                        (page => (
                            <MicroSitePage
                                key={`pageId${page.id}`}
                                scrollToMe={this.state.pageToScroll === page}
                                page={page}
                                onVisibilityChange={(p, v) => this.onPageVisibleChange(p, v)}
                            />
                        ))
                    )}
                </main>
            </>
        );
    }

    static propTypes() {
        return {
            pages: PropTypes.arrayOf(
                MicroSitePageProps
            ),
        };
    }
}