import React, { PropTypes } from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import CreateButton from '../button/CreateButton';
import LocalizedComponent from '../../i18n/LocalizedComponent';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const Actions = ({ resource, filter, displayedFilters, filterValues, hasCreate, basePath, showFilter, refresh, translate }) => (
    <CardActions style={cardActionStyle}>
        {filter && React.cloneElement(filter, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        {hasCreate && <CreateButton basePath={basePath} />}
        <FlatButton primary label={translate('aor.action.refresh')} onClick={refresh} icon={<NavigationRefresh />} />
    </CardActions>
);

Actions.propTypes = {
    translate: PropTypes.func.isRequired,
};

export default LocalizedComponent(Actions);
