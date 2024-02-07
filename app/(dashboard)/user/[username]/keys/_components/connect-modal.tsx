"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition } from "react";
import { createIngressAction } from "@/db/actions/ingress.action";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
export default function ConnectModal() {
	const [ingressType, setIngressType] = useState<IngressType>(RTMP);
	const [pending, startTransition] = useTransition();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Generate Connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate Connection</DialogTitle>
				</DialogHeader>
				<Select
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Ingress Type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle className='h-4 w-4' />
					<AlertDescription>
						This action will reset all active streams suing the current
						connection configuration
					</AlertDescription>
				</Alert>
				<div className='flex justify-between'>
					<DialogClose asChild>
						<Button variant='ghost'>Cancel</Button>
					</DialogClose>
					<Button
						disabled={pending}
						className='active:scale-95 transition'
						variant='primary'
						onClick={() => {
							startTransition(async () => {
								const data = await createIngressAction(+ingressType);
								data
									? toast.success(
											"Your server URL and stream key has been successfully generated!",
									  )
									: toast.error(
											"Your server URL and stream key generation failed!",
									  );
							});
						}}
					>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
