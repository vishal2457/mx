import getOrganisationList from './get-all-organisations.api';
import createOrganisation from './create-organisation.api';
import deleteOrganisation from './id/delete-organisation.api';
import updateOrganisation from './id/update-organisation.api';
import getOrganisation from './id/get-organisation.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const organisation = asyncHandler([getOrganisationList, getOrganisation, createOrganisation, deleteOrganisation, updateOrganisation])
