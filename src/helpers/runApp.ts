export default async function (): Promise<void> {
	console.info("Starting app");
	await sample();
}

const sample = async (): Promise<void> => {
	await console.info("App started");
};
