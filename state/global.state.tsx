"use client";

import { Dispatch, createContext, useReducer } from "react";
import { LocalStorageManager } from "./localStorageManager";

export interface GlobalState {
	test: string;
}

const globalState = new LocalStorageManager<GlobalState>("global");

globalState.initState({ test: "Init" });

export function globalStateReducer(
	state: GlobalState,
	action: any,
): GlobalState {
	switch (action.type) {
		case "test": {
			return globalState.setState({ ...state, test: action.test });
		}

		default:
			return state;
	}
}

interface GlobalReducer {
	globalRuntimeState: GlobalState;
	globalDispatch: Dispatch<any>;
}

export const GlobalStateContext = createContext<GlobalReducer>({
	globalRuntimeState: { test: "" },
	globalDispatch() {},
});

export default function GlobalStateProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [globalRuntimeState, globalDispatch] = useReducer(
		globalStateReducer,
		globalState.getState(),
	);
	return (
		<GlobalStateContext.Provider value={{ globalRuntimeState, globalDispatch }}>
			{children}
		</GlobalStateContext.Provider>
	);
}
