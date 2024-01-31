"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { LocalStorageManager } from "../localStorageManager";

export interface HostSideBar {
	collapsed: Boolean;
}

const hostSidebarState = new LocalStorageManager<HostSideBar>("host-sidebar");

hostSidebarState.initState({ collapsed: false });

export function hostSidebarStateReducer(
	state: HostSideBar,
	action: any,
): HostSideBar {
	switch (action.type) {
		case "on_expand":
			return hostSidebarState.setState({ ...state, collapsed: false });
		case "on_collapse":
			return hostSidebarState.setState({ ...state, collapsed: true });

		default:
			return state;
	}
}

export interface HostSidebarReducer {
	hostSidebarRuntimeState: HostSideBar;
	hostSidebarDispatch: Dispatch<any>;
}

export const HostSidebarContext = createContext<HostSidebarReducer>({
	hostSidebarRuntimeState: { collapsed: false },
	hostSidebarDispatch() {},
});

export default function HostSidebarProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [hostSidebarRuntimeState, hostSidebarDispatch] = useReducer(
		hostSidebarStateReducer,
		hostSidebarState.getState(),
	);

	return (
		<HostSidebarContext.Provider
			value={{ hostSidebarRuntimeState, hostSidebarDispatch }}
		>
			{children}
		</HostSidebarContext.Provider>
	);
}
