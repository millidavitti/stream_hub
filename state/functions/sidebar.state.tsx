"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { LocalStorageManager } from "../localStorageManager";

export interface SideBar {
	collapsed: Boolean;
}

const sidebarState = new LocalStorageManager<SideBar>("sidebar");

sidebarState.initState({ collapsed: false });

export function sidebarStateReducer(state: SideBar, action: any): SideBar {
	switch (action.type) {
		case "on_expand":
			return sidebarState.setState({ ...state, collapsed: false });
		case "on_collapse":
			return sidebarState.setState({ ...state, collapsed: true });

		default:
			return state;
	}
}

export interface SidebarReducer {
	sidebarRuntimeState: SideBar;
	sidebarDispatch: Dispatch<any>;
}

export const SidebarContext = createContext<SidebarReducer>({
	sidebarRuntimeState: { collapsed: false },
	sidebarDispatch() {},
});

export default function SidebarProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarRuntimeState, sidebarDispatch] = useReducer(
		sidebarStateReducer,
		sidebarState.getState(),
	);

	return (
		<SidebarContext.Provider value={{ sidebarRuntimeState, sidebarDispatch }}>
			{children}
		</SidebarContext.Provider>
	);
}
