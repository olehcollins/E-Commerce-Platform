export const saveToLocalStorage = (key: string, value: unknown) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
	const storedValue = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : null;
};
