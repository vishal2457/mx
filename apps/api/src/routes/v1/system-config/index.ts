import getSystemConfigList from './get-all-system-configs.api';
import createSystemConfig from './create-system-config.api';
import deleteSystemConfig from './id/delete-system-config.api';
import updateSystemConfig from './id/update-system-config.api';
import getSystemConfig from './id/get-system-config.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const systemConfig = asyncHandler([getSystemConfigList, getSystemConfig, createSystemConfig, deleteSystemConfig, updateSystemConfig])
