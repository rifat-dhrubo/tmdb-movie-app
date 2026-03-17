const reportWebVitals = (onPerfEntry?: () => void) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		void import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
			onCLS(onPerfEntry);
			onINP(onPerfEntry);
			onFCP(onPerfEntry);
			onLCP(onPerfEntry);
			onTTFB(onPerfEntry);
		});
	}
};

export { reportWebVitals };
