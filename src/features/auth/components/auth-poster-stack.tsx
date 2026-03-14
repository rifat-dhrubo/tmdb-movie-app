import { motion } from 'motion/react';

import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

const IMAGES = [
	'/w03EiJVHP8Un77boQeE7hg9DVdU.jpg',
	'/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
	'/79xm4gXw4l7A5D0XukUOJRocFYQ.jpg',
	'/niNdhTpPHSgw22tK0PLjQMV640v.jpg',
];

export function AuthPosterStack() {
	return (
		<div className="flex items-end gap-3">
			{IMAGES.map((path, i) => (
				<motion.div
					key={i}
					animate={{ opacity: 1, y: 0, rotate: -8 + i * 5 }}
					initial={{ opacity: 0, y: 40, rotate: -3 + i * 2 }}
					style={{ transformOrigin: 'bottom center' }}
					transition={{
						delay: 0.4 + i * 0.08,
						type: 'spring',
						stiffness: 150,
						damping: 18,
						mass: 1,
					}}
				>
					<motion.img
						alt="Movie poster"
						className="aspect-2/3 w-35 rounded-lg bg-primary"
						decoding="async"
						loading="lazy"
						whileHover={{ y: -12, scale: 1.08 }}
						whileTap={{ scale: 0.95 }}
						src={
							buildTmdbImageUrl({
								type: 'poster',
								path,
							}) ?? undefined
						}
						transition={{
							type: 'spring',
							stiffness: 150,
							damping: 10,
						}}
					/>
				</motion.div>
			))}
		</div>
	);
}
