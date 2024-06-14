export const stuff = import.meta.glob('./stuff/**', {
	eager: true,
	query: '?url'
});
