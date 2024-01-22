export class LocalStorageManager<T> {
	constructor(private key: string) {}

	initState(state: T) {
		if (this.getState()) return this.getState();
		localStorage.setItem(this.key, JSON.stringify(state));
	}

	setState(state: T) {
		localStorage.setItem(this.key, JSON.stringify(state));
		return this.getState();
	}

	getState(): T {
		return JSON.parse(localStorage.getItem(this.key) as string);
	}
}
