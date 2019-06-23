import PropTypes from "prop-types"

export default {
    id: PropTypes.number.isRequired,	
    title: PropTypes.string.isRequired,
    content: PropTypes.node,
    linkTitle: PropTypes.string.isRequired,	
    bgImg: PropTypes.string,	
    bgTheme: PropTypes.oneOf(
                ["light", "dark"]
            ),
};
