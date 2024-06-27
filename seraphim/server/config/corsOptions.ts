import { CorsOptions } from "cors";

const allowedOrigins: string[] = [
	"http://localhost:5173",
	"https://seraphim-lusb2af25-oleh-collins-projects.vercel.app",
];

const corsOptions: CorsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

export default corsOptions;
