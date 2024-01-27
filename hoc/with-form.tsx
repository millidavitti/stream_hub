export function withForm(WrappedComponent: any, action: any) {
	return (props: any) => {
		return (
			<form action={action.bind(null, props.args)}>
				<WrappedComponent {...props} type='submit'>
					{props.children}
				</WrappedComponent>
			</form>
		);
	};
}
