const LogoHome = () => {
	return (
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="logo-home">
				<defs>
					<linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
						<stop offset="16.67%" style={{ stopColor: "#FF7F00", stopOpacity: 1 }} />
						<stop offset="33.33%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
						<stop offset="50%" style={{ stopColor: "#00FF00", stopOpacity: 1 }} />
						<stop offset="66.67%" style={{ stopColor: "#0000FF", stopOpacity: 1 }} />
						<stop offset="83.33%" style={{ stopColor: "#4B0082", stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: "#8B00FF", stopOpacity: 1 }} />
					</linearGradient>
				</defs>
				<path
					d="M32 2c-16.54 0-30 13.46-30 30s13.46 30 30 30 30-13.46 30-30S48.54 2 32 2zm0 56c-14.36 0-26-11.64-26-26S17.64 6 32 6s26 11.64 26 26-11.64 26-26 26z"
					fill="url(#rainbow-gradient)"
				/>
				<path
					d="M32 12c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16z"
					fill="url(#rainbow-gradient)"
				/>
				<path
					d="M32 22c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
					fill="#e11d48"
				/>
			</svg>
		</div>
	);
};

export default LogoHome;
