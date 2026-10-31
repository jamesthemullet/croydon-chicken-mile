export interface WheelRestaurant {
	name: string;
	tagline: string;
}

const COLORS = ["#E8210A", "#FFD000", "#FF7800", "#3D1C00"];
const TEXT_COLORS = ["#FFFDF8", "#1C0A00", "#FFFDF8", "#FFFDF8"];

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

export function pickWinnerIndex(segmentCount: number): number {
	return Math.floor(Math.random() * segmentCount);
}

export function drawWheel(
	ctx: CanvasRenderingContext2D,
	canvas: { width: number; height: number },
	restaurants: WheelRestaurant[],
	rot: number,
): void {
	const n = restaurants.length;
	const arc = (2 * Math.PI) / n;
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const radius = cx - 8;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.save();
	ctx.shadowColor = "rgba(0,0,0,0.45)";
	ctx.shadowBlur = 14;
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "#1C0A00";
	ctx.fill();
	ctx.restore();

	restaurants.forEach((r, i) => {
		const start = rot + i * arc;
		const end = start + arc;
		const ci = i % COLORS.length;

		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.arc(cx, cy, radius, start, end);
		ctx.closePath();
		ctx.fillStyle = COLORS[ci];
		ctx.fill();
		ctx.strokeStyle = "#1C0A00";
		ctx.lineWidth = 1.5;
		ctx.stroke();

		ctx.save();
		ctx.translate(cx, cy);
		ctx.rotate(start + arc / 2);
		ctx.textAlign = "right";
		ctx.fillStyle = TEXT_COLORS[ci];
		ctx.font = "bold 11px Nunito, sans-serif";
		const label = r.name.length > 18 ? `${r.name.slice(0, 16)}…` : r.name;
		ctx.fillText(label, radius - 12, 4);
		ctx.restore();
	});

	ctx.save();
	ctx.beginPath();
	ctx.moveTo(cx, cy - radius + 20);
	ctx.lineTo(cx - 12, cy - radius - 8);
	ctx.lineTo(cx + 12, cy - radius - 8);
	ctx.closePath();
	ctx.fillStyle = "#FFFDF8";
	ctx.strokeStyle = "#1C0A00";
	ctx.lineWidth = 2;
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	ctx.beginPath();
	ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
	ctx.fillStyle = "#1C0A00";
	ctx.fill();
	ctx.strokeStyle = "#FFD000";
	ctx.lineWidth = 3;
	ctx.stroke();

	ctx.font = "20px serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("🍗", cx, cy);
}
