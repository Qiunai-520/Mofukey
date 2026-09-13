import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Qiunai",
	bio: "用最初的心 走最远的路.",
	links: [
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		},
		{
			name: "X",
			icon: "fa6-brands:x-twitter", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://x.com/Qiunai_520",
		},
		{
			name: "telegram",
			icon: "fa6-brands:telegram",
			url: "https://t.me/Qiunai520",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Qiunai-520",
		},
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://b23.tv/9GLTpv9",
		},
	],
});
