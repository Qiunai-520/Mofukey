/**
 * 设备展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/devicesConfig.ts 控制。
 */
import type { DeviceItem } from "@/types/devicesConfig";

export const devicesData: DeviceItem[] = [
	{
		id: "macbook-pro-16",
		name: "MacBook Pro 16 英寸",
		brand: "苹果",
		category: "桌面设备",
		status: "active",
		specs: "M5 Max 18 核 CPU / 40 核 GPU / 128GB / 8TB",
		description: "用于日常开发、设计、AI 任务以及高负载渲染的主力工作站。",
		icon: "material-symbols:laptop-mac-rounded",
		featured: true,
		year: "2026",
		link: "https://www.apple.com.cn/macbook-pro/",
	},
	{
		id: "oneplus-15t",
		name: "一加 15T",
		brand: "一加",
		category: "手机",
		status: "active",
		specs: "旗舰芯片 / 16GB / 1TB",
		description:
			"高性能旗舰手机，适合日常使用、游戏娱乐以及移动端开发和高负载任务。",
		icon: "material-symbols:smartphone",
		featured: true,
		year: "2026",
	},
	{
		id: "airpods-pro-3",
		name: "AirPods Pro 3",
		brand: "苹果",
		category: "音频",
		status: "active",
		specs: "主动降噪 / 空间音频 / USB-C",
		description:
			"苹果新一代专业级无线耳机，提供强大的主动降噪、空间音频和沉浸式聆听体验。",
		icon: "material-symbols:headphones-rounded",
		year: "2025",
		link: "https://www.apple.com.cn/airpods-pro/",
	},
	{
		id: "mchose-g87-v2",
		name: "迈从 G87 V2",
		brand: "迈从",
		category: "外设",
		status: "active",
		specs: "87 键 / Gasket 结构 / TTC 快金轴 V3",
		description:
			"紧凑型机械键盘，搭载 TTC 快金轴 V3，兼顾快速触发、舒适手感与出色的声音表现。",
		icon: "material-symbols:keyboard-outline-rounded",
		year: "2026",
	},
	{
		id: "ipad-pro-11-2022",
		name: "iPad Pro 11 英寸",
		brand: "苹果",
		category: "平板电脑",
		status: "backup",
		specs: "M2 芯片 / 16GB / 2TB",
		description:
			"高配置专业平板，用于日常阅读、绘图、笔记以及作为开发时的辅助设备。",
		icon: "material-symbols:tablet-mac-rounded",
		year: "2022",
	},
];

/** 获取所有设备数据列表 */
export function getDevicesList(): DeviceItem[] {
	return devicesData;
}
