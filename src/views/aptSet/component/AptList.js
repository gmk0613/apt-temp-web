import PropTypes from 'prop-types';

UserListHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    headLabel: PropTypes.array,
    onRequestSort: PropTypes.func,
};

export default function UserListHead({ order, orderBy, headLabel, onRequestSort }) {

    return (
        
    )
}