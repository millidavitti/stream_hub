"use server";
import { createIngress } from "@/db/controllers/create-ingress.controller";
import { IngressInput } from "livekit-server-sdk";
export async function createIngressAction(ingressType: IngressInput) {
	return await createIngress(ingressType);
}
