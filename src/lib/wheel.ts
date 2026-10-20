export function computeTargetAngle(
	currentAngle: number,
	winnerIdx: number,
	segmentCount: number,
): number {
	const arc = (2 * Math.PI) / segmentCount;
	const pointer = -Math.PI / 2;
	const segCenter = winnerIdx * arc + arc / 2;
	const base = pointer - segCenter;
	const minTarget = currentAngle + 8 * 2 * Math.PI;
	const n = Math.ceil((minTarget - base) / (2 * Math.PI));
	return base + n * 2 * Math.PI;
}

export function formatResultTagline(tagline: string): string {
	return `"${tagline}"`;
}
