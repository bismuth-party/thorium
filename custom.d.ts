declare namespace Express {
	export interface Response {
		send_ok(_?:object): void;
		send_err(_:string): void;
	}
}
