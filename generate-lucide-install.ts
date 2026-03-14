import fs from 'node:fs';
import path from 'node:path';

import ignore from 'ignore';

const root = process.cwd();

// --- Load .gitignore ---
const gitignorePath = path.join(root, '.gitignore');
const ig = ignore();
if (fs.existsSync(gitignorePath)) {
	ig.add(fs.readFileSync(gitignorePath, 'utf-8'));
}

// --- Helper: recursively list files ---
function getAllFiles(dir: string): Array<string> {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	return entries.flatMap((entry) => {
		const res = path.join(dir, entry.name);
		if (ig.ignores(path.relative(root, res))) return [];
		return entry.isDirectory() ? getAllFiles(res) : [res];
	});
}

// --- Find lucide icons used in codebase ---
function findLucideIcons() {
	const files = getAllFiles(root).filter((f) => /\.(tsx?|jsx?)$/.test(f));
	const icons = new Set<string>();

	for (const file of files) {
		const content = fs.readFileSync(file, 'utf-8');
		// Match: import { Icon1, Icon2 } from 'lucide-react'
		const match = /import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/.exec(
			content,
		);
		if (match) {
			const names = match[1]
				.split(',')
				.map((n) => n.trim())
				.filter(Boolean);
			names.forEach((n) => icons.add(n));
		}
	}
	return Array.from(icons);
}

// --- Convert PascalCase to kebab-case ---
function toKebabCase(name: string) {
	return name
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();
}

// --- Generate install command ---
function generateInstallCommand(icons: Array<string>) {
	if (icons.length === 0) {
		console.log('No lucide icons found.');
		return;
	}

	const kebabIcons = icons.map(toKebabCase);
	const command = `pnpm dlx @sly-cli/sly@latest add lucide ${kebabIcons.join(' ')}`;

	console.log(`\n✅ Found ${icons.length} Lucide icons:\n`);
	console.log(icons.join(', '));
	console.log(`\n💡 Install them via:\n`);
	console.log(command);
}

// --- Run ---
const icons = findLucideIcons();
generateInstallCommand(icons);
