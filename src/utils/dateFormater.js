import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (dateString) => {
    if (!dateString) return "";

    return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
    });
};