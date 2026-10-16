export function getEl<T extends Element = HTMLElement>(
	id: string,
	root: { getElementById(id: string): Element | null } = document,
): T {
	const el = root.getElementById(id);
	if (!el) {
		throw new Error(`Expected element with id "${id}" to exist in the DOM`);
	}
	return el as T;
}

export function getChild<T extends Element = HTMLElement>(
	parent: ParentNode,
	selector: string,
): T {
	const el = parent.querySelector(selector);
	if (!el) {
		throw new Error(
			`Expected element matching "${selector}" to exist in the DOM`,
		);
	}
	return el as T;
}
