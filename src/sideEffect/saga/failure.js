import { push } from 'react-router-redux';
import {
    CRUD_GET_ONE,
} from '../../actions/dataActions';
import { showNotification } from '../../actions/notificationActions';

export default (type, resource, payload, error) => {
    switch (type) {
    case CRUD_GET_ONE:
        return payload.basePath ? [
            showNotification('aor.flashes.item_doesnt_exist', 'warning'),
            push(payload.basePath),
        ] : [];
    default:
        console.error(error);
        return [
            showNotification(error.message, 'warning'),
        ];
    }
};
