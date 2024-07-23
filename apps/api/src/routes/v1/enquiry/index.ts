import getEnquiryList from './get-enquiry-list.api';
import getAllEnquiry from './get-all-enquiry.api';
import createEnquiry from './create-enquiry.api';
import deleteEnquiry from './id/delete-enquiry.api';
import updateEnquiry from './id/update-enquiry.api';
import getEnquiry from './id/get-enquiry.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const enquiry = asyncHandler([
getEnquiryList,
getEnquiry,
createEnquiry,
deleteEnquiry,
updateEnquiry,
getAllEnquiry
])
