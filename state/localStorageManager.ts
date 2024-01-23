export class LocalStorageManager<T> {
	constructor(private key: string) {}

	initState(state: T) {
		if (this.getState()) return this.getState();

		if (typeof window !== "undefined")
			localStorage.setItem(this.key, JSON.stringify(state));
	}

	setState(state: T) {
		localStorage.setItem(this.key, JSON.stringify(state));
		return this.getState();
	}

	getState(): T {
		if (typeof window !== "undefined")
			return JSON.parse(localStorage.getItem(this.key) as string);
		return {} as any;
	}
}
