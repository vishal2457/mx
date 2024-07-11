import getUserBookmarkList from './get-all-user-bookmarks.api';
import createUserBookmark from './create-user-bookmark.api';
import deleteUserBookmark from './id/delete-user-bookmark.api';
import updateUserBookmark from '../userBookmark/id/update-user-bookmark.api';
import getUserBookmark from './id/get-user-bookmark.api';
import { asyncHandler } from '../../../shared/async-handler.util';

export const userBookmark = asyncHandler([ getUserBookmarkList, getUserBookmark, createUserBookmark, deleteUserBookmark, updateUserBookmark ])
