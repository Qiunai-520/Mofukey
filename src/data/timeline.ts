/**
 * 时间线页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/timelineConfig.ts 控制。
 */
import type { TimelineItem } from "@/types/timelineConfig";

export const timelineData: TimelineItem[] = [
{
	title: "Mofukey个人博客上线",
	date: "2026.09",
	category: "milestone",
	subtitle: "开源项目",
	description:
		"基于'Shirone'开源个人博客项目进行创作",
	highlights: [
		"实现动态 HCT 色彩方案计算与状态层 Token",
		"新增时间线、技能、项目与受保护相册等多页面能力",
		"实现严格类型检查零错误与自动化视觉回归测试",
	],
	tags: ["Astro", "Svelte 5", "M3E", "Tailwind 4", "Shirone"],
	links: [
		{
			label: "GitHub 仓库",
			url: "https://github.com/Qiunai-520/Mofukey",
			icon: "fa6-brands:github",
		},
	],
	icon: "material-symbols:rocket-launch-rounded",
	featured: true,
},
{
	title: "购买了Mofukey.top顶级域名",
	date: "2026.05.23",
	category: "project",
	subtitle: "独立创作",
	tags: ["域名", "计算机网络", "HTML", "Cloudflare"],
	icon: "material-symbols:deployed-code-outline-rounded",
},
{
	title: "偶然接触IMGUI(C++)",
	date: "2023.09 – 2024.06",
	category: "project",
	location: "泌阳，中国",
	highlights: [
		"以优异成绩毕业，并获得优秀毕业论文相关荣誉",
		"参与并组织校园开源社区与技术交流活动",
	],
	tags: ["C++", "IMGUI", "PUBGM"],
	icon: "material-symbols:school-rounded",
},
{
	title: "开始个人博客与技术记录",
	date: "2022.12",
	category: "life",
	subtitle: "踏入技术写作的第一步",
	description:
		"发布第一篇线上文章，开始记录前端开发、开源项目以及个人技术探索。",
	tags: ["博客", "技术写作", "开放网络"],
	icon: "material-symbols:edit-note-rounded",
},

];

/** 获取所有时间线数据列表 */
export function getTimelineList(): TimelineItem[] {
	return timelineData;
}
