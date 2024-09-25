import getEventList from './get-event-list.api';
import getAllEvent from './get-all-event.api';
import createEvent from './create-event.api';
import deleteEvent from './id/delete-event.api';
import updateEvent from './id/update-event.api';
import getEvent from './id/get-event.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const event = asyncHandler([
getEventList,
getEvent,
createEvent,
deleteEvent,
updateEvent,
getAllEvent
])
