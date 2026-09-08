/**
 * 技能页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/skillsConfig.ts 控制。
 */
import type { SkillItem } from "@/types/skillsConfig";

export const skillsData: SkillItem[] = [
	{
		name: "JavaScript",
		description:
			"ES2020+ syntax, async plumbing, and event-driven browser code.",
		icon: "simple-icons:javascript",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "TypeScript",
		description: "Typed application code and maintainable contracts.",
		icon: "simple-icons:typescript",
		category: "frontend",
		level: "expert",
	},
	{
		name: "Astro",
		description: "Content-focused sites with fast server-rendered output.",
		icon: "simple-icons:astro",
		category: "frontend",
		level: "advanced",
	},
	{
		name: "Vue",
		description: "Progressive component authoring for rapid single-page apps.",
		icon: "simple-icons:vuedotjs",
		category: "frontend",
		level: "intermediate",
	},
	{
		name: "Node.js",
		description: "Build tooling, services, and content pipelines.",
		icon: "simple-icons:nodedotjs",
		category: "backend",
		level: "advanced",
	},
	{
		name: "Python",
		description: "Scripting, data wrangling, and service automation.",
		icon: "simple-icons:python",
		category: "backend",
		level: "intermediate",
	},
	{
		name: "Rust",
		description: "Memory-safe systems code and performance-critical paths.",
		icon: "simple-icons:rust",
		category: "backend",
		level: "beginner",
	},
	{
		name: "C++",
		description: "Native modules and performance-sensitive components.",
		icon: "simple-icons:cplusplus",
		category: "backend",
		level: "beginner",
	},
	{
		name: "C",
		description: "Low-level systems work close to the runtime.",
		icon: "simple-icons:c",
		category: "backend",
		level: "beginner",
	},
	{
		name: "PostgreSQL",
		description: "Relational data modeling and application queries.",
		icon: "simple-icons:postgresql",
		category: "backend",
		level: "intermediate",
	},
];

/** 获取所有技能数据列表 */
export function getSkillsList(): SkillItem[] {
	return skillsData;
}
