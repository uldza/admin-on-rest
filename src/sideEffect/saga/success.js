import { push } from 'react-router-redux';
import {
    CRUD_CREATE,
    CRUD_UPDATE,
    CRUD_DELETE,
} from '../../actions/dataActions';
import { showNotification } from '../../actions/notificationActions';
import linkToRecord from '../../util/linkToRecord';

export default (type, resource, payload, response) => {
    switch (type) {
    case CRUD_UPDATE:
        return [
            showNotification('aor.flashes.updated'),
            push(payload.basePath),
        ];
    case CRUD_CREATE:
        return [
            showNotification('aor.flashes.created'),
            push(linkToRecord(payload.basePath, response.id)),
        ];
    case CRUD_DELETE:
        return [
            showNotification('aor.flashes.deleted'),
            push(payload.basePath),
        ];
    default:
        return [];
    }
};
