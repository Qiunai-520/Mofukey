/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "Mofukey",
		title: "Mofukey",
		summary:
			"一个基于 Shirone 深度定制的个人博客与网站，融合 M3E 设计体系、丰富的内容体验与 Mofukey 专属功能。",
		category: "theme",
		phase: "building",
		technologies: ["Astro", "Svelte", "TypeScript", "Tailwind CSS"],
		icon: "material-symbols:deployed-code-outline-rounded",
		cover: "/assets/images/mofukeybg.webp",
		coverAlt: "Mofukey 网站首页预览",
		featured: true,
		repository: "https://github.com/Qiunai-520/Mofukey",
		year: "2026",
	},
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
