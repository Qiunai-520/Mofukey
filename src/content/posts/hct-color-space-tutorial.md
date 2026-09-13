---
title: "HCT 色彩空间：基于 CAM16 与 CIELAB 的感知均匀设计色彩系统"
published: 2026-09-12
pinned: false
description: "系统梳理 Material Design 3 所采用的 HCT 色彩模型：从传统色彩空间的局限出发，介绍 CAM16 色貌模型与 CIELAB 明度的结合方式、色调-对比度的数学关系，并给出色调色板生成算法的工程实现思路。"
tags: [色彩科学, Material Design, CAM16, 设计系统]
category: 技术教程
lang: zh-CN
draft: false
---

# HCT 色彩空间：基于 CAM16 与 CIELAB 的感知均匀设计色彩系统

**摘要**：本文系统介绍 Material Design 3 中提出的 HCT（Hue, Chroma, Tone）色彩模型。文章首先回顾传统色彩空间（RGB、HSL）在构建"感知均匀"设计系统时的局限性，随后引入 CIE 色貌模型 CAM16 与 CIELAB 明度分量 L*，说明二者如何被组合为 HCT；在此基础上，本文推导色调差异与对比度之间的近似关系，并给出色调色板（Tonal Palette）生成算法的伪代码与工程实现示例。文末对 HCT 与其他常见色彩空间进行简要比较，并列出延伸阅读文献。

**关键词**：色彩空间；CAM16；CIELAB；感知均匀性；设计系统；无障碍对比度

---

## 1. 引言

在现代设计系统（Design System）中，一套配色方案不仅要"好看"，还需要满足两个更工程化的目标：

1. **一致性**：同一色相在不同明暗层级（如浅色 / 深色主题）下，应当保持视觉上可预期的关系；
2. **可访问性**：文本与背景之间的对比度需要满足 WCAG 等规范的最低要求。

传统的 RGB 与 HSL 色彩空间在描述"人眼感知"层面存在明显缺陷：HSL 中的明度（Lightness）分量与人眼实际感知到的亮度并不是线性关系，这导致同一 Lightness 数值下，不同色相的色块在视觉上亮度并不一致。这正是 Material Design 3 引入 **HCT（Hue, Chroma, Tone）** 色彩空间的核心动机。

## 2. 相关色彩空间回顾

### 2.1 RGB 与 HSL 的局限性

RGB 是面向显示设备的加色模型，其数值本身不具有直接的感知意义；HSL / HSV 虽然引入了"色相 - 饱和度 - 明度"的直观维度，但其明度分量本质上仍是对 RGB 分量的简单几何变换（例如 `L = (max(R,G,B) + min(R,G,B)) / 2`），并未考虑人眼对不同色相、不同波长光的敏感度差异。

### 2.2 CIELAB 与感知均匀性

CIE 于 1976 年提出的 **CIELAB** 色彩空间，通过非线性变换使得色彩空间中的欧几里得距离能够较好地近似人眼感知到的色差，其中明度分量记作 **L\***，取值范围为 0（纯黑）到 100（纯白）。L\* 的计算基于 CIE XYZ 空间中的相对亮度 Y：

$$
L^{*} = 116 \, f\!\left(\frac{Y}{Y_n}\right) - 16,
\qquad
f(t) = \begin{cases}
t^{1/3} & t > \left(\dfrac{6}{29}\right)^{3} \\[6pt]
\dfrac{1}{3}\left(\dfrac{29}{6}\right)^{2} t + \dfrac{4}{29} & t \le \left(\dfrac{6}{29}\right)^{3}
\end{cases}
$$

其中 $Y_n$ 为参考白点的亮度。L\* 与人眼感知亮度大致呈线性关系，这一性质是后文"色调差即可近似估计对比度"结论的数学基础。

## 3. HCT 色彩空间

HCT 并非一个全新的颜色感知理论，而是将两个已有模型"缝合"在一起：**色相（Hue）与彩度（Chroma）取自 CAM16 色貌模型，明度（Tone）则直接取自 CIELAB 的 L\***。这种组合方式的用意在于：CAM16 在色相与彩度维度上更贴近人眼在真实观察条件下的感知，而 L\* 则提供了一个与对比度计算直接挂钩的明度量。

### 3.1 CAM16 色貌模型简介

与 RGB、HSL 这类"仅由颜色数值本身决定"的色彩空间不同，**CAM16（Color Appearance Model 2016）** 是一种色貌模型：它在计算色相、彩度时，额外引入了观察条件（如环境光、背景亮度、适应白点）作为输入。这意味着同一个 sRGB 数值，在不同的观察条件假设下，CAM16 给出的感知色相与彩度可能并不相同——这也正是"色貌"（appearance）与"色彩"（color）这两个概念的区别所在。

CAM16 的完整计算流程涉及锥体响应、色适应变换与非线性压缩等多个步骤，推导较为复杂，本文不做展开，感兴趣的读者可参阅文末参考文献。就 HCT 而言，我们只需要 CAM16 输出中的两个分量：

- **Hue**：0°–360° 的色相角；
- **Chroma**：感知彩度，数值越大代表颜色越"鲜艳"。

### 3.2 色调（Tone）与对比度的近似关系

HCT 中的 Tone 直接等价于 CIELAB 的 L\*，取值范围同样是 0–100。由于 L\* 与人眼感知亮度近似线性，Material Design 3 的设计规范给出了一个非常实用的经验结论：**两个颜色的 Tone 差值达到 40，可以保证 WCAG 对比度不低于 3.0；差值达到 50，则可以保证对比度不低于 4.5**。这也是 Material 3 的配色方案默认在前景 / 背景之间预留 60 及以上 Tone 差值的原因之一——为对比度留出了充足的安全余量。

作为参照，WCAG 对比度的标准定义为：

$$
\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}
$$

其中 $L_1, L_2$ 分别是两个颜色的相对亮度（$L_1 \ge L_2$）。相比直接计算相对亮度，"比较两个 Tone 值之差"在设计工具与代码中显然是更轻量、更直观的近似方案。

## 4. 色调色板生成算法

Material Design 3 的设计系统要求：给定一个"种子颜色"（Seed Color），自动生成一整套色调色板（Tonal Palette），供浅色 / 深色主题共用。其基本思路可以概括为如下算法：

```text
算法：SeedToTonalPalette(seedArgb)
输入：种子颜色的 sRGB 值 seedArgb
输出：一组 (tone, argb) 映射，tone ∈ {0, 10, 20, ..., 100}

1. hct ← RGBToHCT(seedArgb)          // 通过 CAM16 + L* 得到 (H, C, T)
2. 固定 hue ← hct.hue, chroma ← hct.chroma
3. 对每一个目标 tone ∈ {0, 10, 20, ..., 100}:
     a. 尝试以 (hue, chroma, tone) 构造新颜色
     b. 若该 (hue, chroma) 组合在当前 tone 下超出 sRGB 色域，
        则对 chroma 做色域映射（gamut mapping），逐步降低至色域边界
     c. 将映射后的颜色转换回 sRGB，记录到结果表中
4. 返回结果表
```

这里最关键、也最容易被忽略的一步是 (b)：**并非所有 (Hue, Chroma) 组合在任意 Tone 下都能落在 sRGB 色域内**。例如高彩度的黄色在极低 Tone（接近黑色）下几乎不可能存在对应的 sRGB 颜色，算法需要通过色域映射在保持色相不变的前提下，寻找当前 Tone 下可实现的最大彩度。

## 5. 工程实现思路

下面给出一个高度简化的 TypeScript 示例，用来说明整体数据流，**并非官方实现的等价代码**（官方实现的色域映射部分要复杂得多，涉及数值迭代求解）：

```typescript
interface Hct {
  hue: number;    // 0-360
  chroma: number; // >= 0
  tone: number;   // 0-100
}

/**
 * 简化示意：真实实现中，hueFromRgb / chromaFromRgb
 * 需要经过完整的 CAM16 正向变换，而不是简单的几何公式。
 */
function rgbToHct(argb: number): Hct {
  const hue = hueFromRgb(argb);       // 来自 CAM16 的色相
  const chroma = chromaFromRgb(argb); // 来自 CAM16 的彩度
  const tone = lStarFromRgb(argb);    // 来自 CIELAB 的 L*
  return { hue, chroma, tone };
}

/**
 * 生成标准的 13 级色调色板。
 */
function generateTonalPalette(seedArgb: number): Map<number, number> {
  const seed = rgbToHct(seedArgb);
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  const palette = new Map<number, number>();

  for (const tone of tones) {
    let chroma = seed.chroma;
    let argb = hctToRgb({ hue: seed.hue, chroma, tone });

    // 若超出色域，逐步降低彩度，直到找到可行解
    while (!isInSrgbGamut(argb) && chroma > 0) {
      chroma -= 1;
      argb = hctToRgb({ hue: seed.hue, chroma, tone });
    }

    palette.set(tone, argb);
  }

  return palette;
}
```

在实际项目中，这部分色彩计算通常会作为设计系统的"原子层"，在构建阶段（build time）就把种子颜色展开为完整的 Design Token，再交给组件层消费——这也是 token-driven styling 架构中，色彩部分的核心实现逻辑。

## 6. HCT 与其他色彩空间的简要比较

| 色彩空间 | 明度是否感知均匀 | 是否考虑观察条件 | 典型应用场景 |
| :--- | :---: | :---: | :--- |
| RGB | 否 | 否 | 显示器像素表示 |
| HSL / HSV | 否 | 否 | 传统取色器交互 |
| CIELAB | 是（L\*） | 否 | 色差计算、图像处理 |
| CAM16 | 是（部分维度） | 是 | 色貌建模、跨设备一致性 |
| **HCT** | 是（Tone = L\*） | 是（H、C 部分） | Material Design 3 设计系统 |

## 7. 结论

HCT 色彩空间的核心贡献，并不在于提出了全新的色彩感知理论，而在于**工程化地组合**了 CAM16 与 CIELAB 各自的优势：用 CAM16 保证色相与彩度维度的感知一致性，用 CIELAB 的 L\* 保证明度维度与对比度计算的强关联性。对于需要自动生成、且需满足无障碍要求的设计系统而言，这是一个在数学严谨性与工程可行性之间取得了良好平衡的方案。

---

## 参考资料

- [material-color-utilities][mcu-repo]，Google 官方 HCT / CAM16 参考实现
- [HCT color space][coloraide-doc]，ColorAide 文档对 HCT 的独立实现说明
- [WCAG 2 对比度定义][wcag-doc]，Web Content Accessibility Guidelines

[mcu-repo]: https://github.com/material-foundation/material-color-utilities "material-color-utilities on GitHub"
[coloraide-doc]: https://facelessuser.github.io/coloraide/colors/hct/ "ColorAide HCT Documentation"
[wcag-doc]: https://www.w3.org/TR/WCAG21/#contrast-minimum "WCAG 2.1 Contrast (Minimum)"
