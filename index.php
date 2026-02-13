<?php
/**
 * 化学公式计算器 v2.4
 * 核心功能：化学反应、分子、元素周期表、化学方程式
 * 数据存储在data目录下，实现功能与数据分离
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>化学公式计算器 v2.4</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="lib/math.min.js"></script>
    <script src="data/elements.js"></script>
    <script src="data/equations.js"></script>
    <script src="data/molecules.js"></script>
    <script src="data/reactions.js"></script>
</head>
<body>
    <!-- 左侧抽屉（化学计算区）- 层级100 -->
    <div class="drawer" id="drawer">
        <div class="drawer-header">
            <h3>毅学化学 v2.4</h3>
            <button class="toggle-btn" id="toggleDrawer">收起</button>
        </div>
        <div class="drawer-content">
            <div class="calc-group">
                <label>计算类型：</label>
                <select id="calcType">
                    <option value="reaction">化学反应</option>
                    <option value="molar_mass">分子</option>
                    <option value="element_info">元素周期表</option>
                    <option value="balance">化学方程式</option>
                </select>
            </div>
            <div class="calc-group">
                <label>输入内容：</label>
                <input type="text" id="inputContent" placeholder="例如：H2 + O2 -> H2O" value="">
                <button id="calculateBtn">计算</button>
            </div>
            <div class="calc-group" id="additionalInput" style="display: none;">
                <label>额外参数：</label>
                <input type="text" id="additionalParam" placeholder="例如：质量、摩尔数等" value="">
            </div>
            <div class="result-display" id="resultDisplay">
                <h4>计算结果：</h4>
                <div id="resultContent">请输入化学方程式或化合物进行计算...</div>
            </div>
            <div class="tips">
                支持的计算类型：<br>
                1. 化学反应：60个预设反应（含催化剂）<br>
                2. 分子：60个预设分子<br>
                3. 元素周期表：118个元素（含稀土元素）<br>
                4. 化学方程式：60个预设方程式
            </div>
        </div>
    </div>

    <!-- 化学说明卡片 - 层级99（低于抽屉） -->
    <div class="chem-info-card" id="chemInfoCard">
        <div class="card-header">
            <span id="chemInfoTitle">化学说明</span>
            <button class="close-card-btn" id="closeInfoCard">×</button>
        </div>
        <div class="card-content" id="chemInfoContent">
            请选择一个计算类型查看详细说明...
        </div>
    </div>

    <!-- 缩放按钮组：固定在右下角 - 层级98（低于卡片/抽屉） -->
    <div class="zoom-btn-group">
        <button class="zoom-btn" id="zoomInBtn">放大</button>
        <button class="zoom-btn" id="zoomOutBtn">缩小</button>
    </div>

    <!-- 抽屉展开按钮：固定在左上角 - 层级101（高于抽屉） -->
    <button class="drawer-toggle-btn" id="showDrawer" style="display: none;">展开化学计算</button>

    <!-- 化学可视化区域 - 层级1 -->
    <div class="chem-visualization" id="chemVisualization">
        <div class="visualization-content" id="visualizationContent">
            <div class="chem-diagram" id="chemDiagram">
                <div class="diagram-placeholder">化学结构可视化区域</div>
            </div>
        </div>
    </div>

    <script src="js/chemistry_v2.4.js"></script>
</body>
</html>
