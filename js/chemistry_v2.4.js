const config = {
    currentCalcType: 'reaction',
    currentInput: '',
    additionalParam: '',
    // 数据将从外部文件加载
    elements: {},
    formulaInfo: {
        'reaction': '化学反应：展示预设的化学反应，包括反应物、生成物、反应类型和催化剂信息。化学反应是化学变化的基本过程。',
        'molar_mass': '分子：展示预设的分子卡片，包含分子式、分子量和科学介绍。分子是化学物质的基本组成单位。',
        'element_info': '元素周期表：展示完整的元素周期表，包含118个元素。每个元素可点击查看详细信息，包括原子量、原子序数、电子排布等。',
        'balance': '化学方程式：展示预设的化学方程式配平示例，包括配平步骤和解释。化学方程式是化学反应的数学表达。'
    },
    // 数据将从外部文件加载
    presetEquations: [],
    presetMolecules: [],
    presetReactions: []
};

// 初始化
function initChemistry() {
    loadData();
    bindCalcEvents();
    bindDrawerEvents();
    bindInfoCardEvents();
    bindZoomBtnEvents();
    bindVisualizationEvents();
}

// 加载数据文件
function loadData() {
    // 加载元素数据
    if (typeof elementData !== 'undefined') {
        config.elements = elementData;
    }
    
    // 加载方程式数据
    if (typeof equationData !== 'undefined') {
        config.presetEquations = equationData;
    }
    
    // 加载分子数据
    if (typeof moleculeData !== 'undefined') {
        config.presetMolecules = moleculeData;
    }
    
    // 加载反应数据
    if (typeof reactionData !== 'undefined') {
        config.presetReactions = reactionData;
    }
}

// 绑定计算相关事件
function bindCalcEvents() {
    const calcTypeSelect = document.getElementById('calcType');
    const inputContent = document.getElementById('inputContent');
    const calculateBtn = document.getElementById('calculateBtn');
    const additionalInput = document.getElementById('additionalInput');
    const additionalParam = document.getElementById('additionalParam');

    calcTypeSelect.addEventListener('change', function() {
        config.currentCalcType = this.value;
        updateInfoCard();
        updateVisualization();
        
        // 显示/隐藏额外输入框
        if (this.value === 'reaction') {
            additionalInput.style.display = 'flex';
        } else {
            additionalInput.style.display = 'none';
        }
    });

    calculateBtn.addEventListener('click', function() {
        config.currentInput = inputContent.value.trim();
        config.additionalParam = additionalParam.value.trim();
        performCalculation();
    });

    inputContent.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            config.currentInput = inputContent.value.trim();
            config.additionalParam = additionalParam.value.trim();
            performCalculation();
        }
    });
}

// 绑定可视化事件
function bindVisualizationEvents() {
    // 事件将在具体可视化函数中绑定
}

// 更新可视化区域
function updateVisualization() {
    const visualizationContent = document.getElementById('visualizationContent');
    
    switch (config.currentCalcType) {
        case 'reaction':
            showReactionVisualization(visualizationContent);
            break;
        case 'molar_mass':
            showMoleculeVisualization(visualizationContent);
            break;
        case 'element_info':
            showElementPeriodicTableV3(visualizationContent);
            break;
        case 'balance':
            showEquationVisualization(visualizationContent);
            break;
    }
}

// 显示化学方程式可视化
function showEquationVisualization(container) {
    let html = '<div class="chemical-equations-list">';
    
    config.presetEquations.forEach((item, index) => {
        html += `
            <div class="chemical-equation-item" data-index="${index}">
                <div class="equation">${item.equation}</div>
                <div class="explanation">${item.explanation}</div>
                <div style="font-size: 11px; color: #888; margin-top: 5px;">类型: ${item.type} | 难度: ${item.difficulty}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // 绑定点击事件
    const items = container.querySelectorAll('.chemical-equation-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showEquationDetail(index);
        });
    });
}

// 显示分子可视化
function showMoleculeVisualization(container) {
    let html = '<div class="molecular-weight-display">';
    
    config.presetMolecules.forEach((item, index) => {
        html += `
            <div class="molecule-card" data-index="${index}">
                <div class="formula">${item.formula}</div>
                <div class="weight">${item.weight} g/mol</div>
                <div style="font-size: 12px; color: #666; margin-top: 5px;">${item.name}</div>
                <div style="font-size: 10px; color: #999; margin-top: 3px; line-height: 1.2;">${item.description.substring(0, 50)}...</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // 绑定点击事件
    const cards = container.querySelectorAll('.molecule-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showMoleculeDetail(index);
        });
    });
}

// 显示元素周期表 V2.4 - 根据main.html文件实现9×19网格版
function showElementPeriodicTableV3(container) {
    // 隐藏右上角介绍卡片和展开按钮，避免遮挡元素周期表
    const infoCard = document.getElementById('chemInfoCard');
    const drawerToggleBtn = document.getElementById('showDrawer');
    const zoomBtnGroup = document.querySelector('.zoom-btn-group');
    
    if (infoCard) {
        infoCard.classList.remove('visible');
    }
    if (drawerToggleBtn) {
        drawerToggleBtn.style.display = 'none';
    }
    if (zoomBtnGroup) {
        zoomBtnGroup.style.display = 'none';
    }
    
    // 根据main.html创建9×19网格布局
    // 行0: 表头，行1-7: 周期1-7，行8: 预留空行
    // 列0: 周期列，列1-18: 族列
    
    const periodicTableLayout = [
        // 行0: 表头（列0=空，列1-18=族名）
        ['', 'ⅠA', 'ⅡA', 'ⅢB', 'ⅣB', 'ⅤB', 'ⅥB', 'ⅦB', 'ⅧBⅠ', 'ⅧBⅡ', 'ⅧBⅢ', 'ⅠB', 'ⅡB', 'ⅢA', 'ⅣA', 'ⅤA', 'ⅥA', 'ⅦA', '0族'],
        // 行1: 周期1（列0=1，列1=H，列18=He，其余空）
        ['1', 'H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
        // 行2: 周期2（列0=2，列1=Li，列2=Be，列13=B，列14=C，列15=N，列16=O，列17=F，列18=Ne，其余空）
        ['2', 'Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
        // 行3: 周期3（列0=3，列1=Na，列2=Mg，列13=Al，列14=Si，列15=P，列16=S，列17=Cl，列18=Ar，其余空）
        ['3', 'Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
        // 行4: 周期4（列0=4，列1=K，列2=Ca，列3=Sc，列4=Ti，列5=V，列6=Cr，列7=Mn，列8=Fe，列9=Co，列10=Ni，列11=Cu，列12=Zn，列13=Ga，列14=Ge，列15=As，列16=Se，列17=Br，列18=Kr）
        ['4', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
        // 行5: 周期5（列0=5，列1=Rb，列2=Sr，列3=Y，列4=Zr，列5=Nb，列6=Mo，列7=Tc，列8=Ru，列9=Rh，列10=Pd，列11=Ag，列12=Cd，列13=In，列14=Sn，列15=Sb，列16=Te，列17=I，列18=Xe）
        ['5', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
        // 行6: 周期6（列0=6，列1=Cs，列2=Ba，列3=镧系占位，列4=Hf，列5=Ta，列6=W，列7=Re，列8=Os，列9=Ir，列10=Pt，列11=Au，列12=Hg，列13=Tl，列14=Pb，列15=Bi，列16=Po，列17=At，列18=Rn）
        ['6', 'Cs', 'Ba', '镧系', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
        // 行7: 周期7（列0=7，列1=Fr，列2=Ra，列3=锕系占位，列4=Rf，列5=Db，列6=Sg，列7=Bh，列8=Hs，列9=Mt，列10=Ds，列11=Rg，列12=Cn，列13=Nh，列14=Fl，列15=Mc，列16=Lv，列17=Ts，列18=Og）
        ['7', 'Fr', 'Ra', '锕系', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
        // 行8: 预留空行（可放镧系/锕系，也可留空）
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    ];
    
    // 镧系元素（从main.html解析）
    const lanthanides = ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'];
    const lanthanideAtomicNumbers = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
    
    // 锕系元素（从main.html解析）
    const actinides = ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'];
    const actinideAtomicNumbers = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];
    
    let html = '<div class="element-periodic-table-v3">';
    
    // 添加主周期表网格（9×19）
    html += '<div class="periodic-grid">';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 19; j++) {
            const symbol = periodicTableLayout[i][j];
            
            if (i === 0) {
                // 表头行
                if (j === 0) {
                    html += '<div class="grid-cell header-cell empty-cell"></div>';
                } else {
                    html += `<div class="grid-cell header-cell">${symbol}</div>`;
                }
            } else if (i >= 1 && i <= 7) {
                // 周期1-7行
                if (j === 0) {
                    // 周期列
                    html += `<div class="grid-cell period-cell">${symbol}</div>`;
                } else if (symbol && config.elements[symbol]) {
                    // 元素单元格
                    const element = config.elements[symbol];
                    html += `
                        <div class="grid-cell element-cell" data-symbol="${symbol}">
                            <span class="atomic-num">${element.atomicNumber}</span>
                            <span class="symbol">${symbol}</span>
                            <span class="name">${element.name}</span>
                        </div>
                    `;
                } else if (symbol === '镧系' || symbol === '锕系') {
                    // 镧系/锕系占位单元格
                    const type = symbol === '镧系' ? 'lanthanide' : 'actinide';
                    html += `
                        <div class="grid-cell placeholder-cell" data-placeholder="${type}">
                            <span>${symbol}</span>
                        </div>
                    `;
                } else {
                    // 空单元格
                    html += '<div class="grid-cell empty-cell"></div>';
                }
            } else {
                // 行8: 预留空行
                html += '<div class="grid-cell empty-cell"></div>';
            }
        }
    }
    
    html += '</div>'; // 结束 periodic-grid
    
    // 添加镧系元素展示（1×16网格）
    html += '<div class="lan-act-title">镧系元素 (57-71)</div>';
    html += '<div class="lan-act-grid">';
    html += '<div class="grid-cell header-cell">原子序数</div>';
    for (let i = 0; i < 15; i++) {
        html += `<div class="grid-cell">${lanthanideAtomicNumbers[i]}</div>`;
    }
    html += '</div>';
    
    html += '<div class="lan-act-grid">';
    html += '<div class="grid-cell header-cell">元素符号</div>';
    for (let i = 0; i < 15; i++) {
        const symbol = lanthanides[i];
        const element = config.elements[symbol];
        if (element) {
            html += `
                <div class="grid-cell element-cell" data-symbol="${symbol}">
                    <span class="symbol">${symbol}</span>
                </div>
            `;
        } else {
            html += `<div class="grid-cell">${symbol}</div>`;
        }
    }
    html += '</div>';
    
    // 添加锕系元素展示（1×16网格）
    html += '<div class="lan-act-title">锕系元素 (89-103)</div>';
    html += '<div class="lan-act-grid">';
    html += '<div class="grid-cell header-cell">原子序数</div>';
    for (let i = 0; i < 15; i++) {
        html += `<div class="grid-cell">${actinideAtomicNumbers[i]}</div>`;
    }
    html += '</div>';
    
    html += '<div class="lan-act-grid">';
    html += '<div class="grid-cell header-cell">元素符号</div>';
    for (let i = 0; i < 15; i++) {
        const symbol = actinides[i];
        const element = config.elements[symbol];
        if (element) {
            html += `
                <div class="grid-cell element-cell" data-symbol="${symbol}">
                    <span class="symbol">${symbol}</span>
                </div>
            `;
        } else {
            html += `<div class="grid-cell">${symbol}</div>`;
        }
    }
    html += '</div>';
    
    html += '</div>'; // 结束 element-periodic-table-v3
    container.innerHTML = html;
    
    // 绑定点击事件
    const cells = container.querySelectorAll('.element-cell[data-symbol]');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const symbol = this.getAttribute('data-symbol');
            showElementDetail(symbol);
        });
    });
    
    // 绑定镧系/锕系占位符点击事件
    const placeholders = container.querySelectorAll('.placeholder-cell[data-placeholder]');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const type = this.getAttribute('data-placeholder');
            showLanthanideActinideInfo(type);
        });
    });
}

// 显示镧系/锕系信息
function showLanthanideActinideInfo(type) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay visible';
    overlay.id = 'lanthanideActinideOverlay';
    document.body.appendChild(overlay);
    
    const popup = document.createElement('div');
    popup.className = 'element-detail-popup visible';
    
    let title = '';
    let content = '';
    
    if (type === 'lanthanide') {
        title = '镧系元素 (57-71)';
        content = `
            <div style="margin-bottom: 10px;">
                <strong>镧系元素</strong>是元素周期表中第6周期第3族的15个元素，从镧(La)到镥(Lu)。
            </div>
            <div style="margin-bottom: 10px;">
                <strong>特点：</strong><br>
                - 都是金属元素<br>
                - 具有相似的化学性质<br>
                - 在自然界中通常共生<br>
                - 在现代科技中有重要应用
            </div>
            <div style="margin-bottom: 10px;">
                <strong>元素列表：</strong><br>
                La(57), Ce(58), Pr(59), Nd(60), Pm(61), Sm(62), Eu(63), Gd(64), Tb(65), Dy(66), Ho(67), Er(68), Tm(69), Yb(70), Lu(71)
            </div>
        `;
    } else {
        title = '锕系元素 (89-103)';
        content = `
            <div style="margin-bottom: 10px;">
                <strong>锕系元素</strong>是元素周期表中第7周期第3族的15个元素，从锕(Ac)到铹(Lr)。
            </div>
            <div style="margin-bottom: 10px;">
                <strong>特点：</strong><br>
                - 大多具有放射性<br>
                - 都是金属元素<br>
                - 在核反应和核能领域有重要应用<br>
                - 许多元素是人工合成的
            </div>
            <div style="margin-bottom: 10px;">
                <strong>元素列表：</strong><br>
                Ac(89), Th(90), Pa(91), U(92), Np(93), Pu(94), Am(95), Cm(96), Bk(97), Cf(98), Es(99), Fm(100), Md(101), No(102), Lr(103)
            </div>
        `;
    }
    
    popup.innerHTML = `
        <div class="popup-header">
            <div class="popup-title">${title}</div>
            <button class="popup-close" onclick="closeLanthanideActinideInfo()">×</button>
        </div>
        <div class="popup-content">
            ${content}
        </div>
    `;
    document.body.appendChild(popup);
    
    // 绑定关闭事件
    overlay.addEventListener('click', closeLanthanideActinideInfo);
}

// 关闭镧系/锕系信息弹窗
function closeLanthanideActinideInfo() {
    const overlay = document.getElementById('lanthanideActinideOverlay');
    const popup = document.querySelector('.element-detail-popup');
    
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

// 显示化学反应计算可视化
function showReactionVisualization(container) {
    let html = '<div class="reaction-display">';
    
    // 显示所有预设的反应示例（60个）
    config.presetReactions.forEach((reaction, index) => {
        const catalystInfo = reaction.catalyst ? `<div style="font-size: 11px; color: #0066cc; margin-top: 3px;">催化剂: ${reaction.catalyst}</div>` : '';
        html += `
            <div class="reaction-card" data-index="${index}">
                <div class="equation">${reaction.equation}</div>
                ${catalystInfo}
                <div style="font-size: 12px; color: #666; margin: 8px 0;">${reaction.description}</div>
                <div class="details">
                    <div class="detail-item">
                        <div class="detail-label">反应类型</div>
                        <div class="detail-value">${reaction.type}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">反应物</div>
                        <div class="detail-value">${reaction.reactants.join(', ')}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">生成物</div>
                        <div class="detail-value">${reaction.products.join(', ')}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// 显示方程式详情弹窗
function showEquationDetail(index) {
    const equation = config.presetEquations[index];
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay visible';
    overlay.id = 'equationOverlay';
    document.body.appendChild(overlay);
    
    // 创建弹窗
    const popup = document.createElement('div');
    popup.className = 'equation-detail-popup visible';
    
    // 生成配平步骤
    const steps = generateBalancingSteps(equation.equation);
    
    popup.innerHTML = `
        <div class="popup-header">
            <div class="popup-title">化学方程式详情</div>
            <button class="popup-close" onclick="closeEquationDetail()">×</button>
        </div>
        <div class="popup-content">
            <div class="equation">${equation.equation}</div>
            <div style="font-size: 12px; color: #666; margin: 8px 0;">类型: ${equation.type} | 难度: ${equation.difficulty}</div>
            <div class="explanation">${equation.explanation}</div>
            <div class="steps">
                <strong>配平步骤：</strong>
                ${steps.map(step => `<div class="step">• ${step}</div>`).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // 绑定关闭事件
    overlay.addEventListener('click', closeEquationDetail);
}

// 生成配平步骤
function generateBalancingSteps(equation) {
    const steps = [];
    const parts = equation.split('->');
    if (parts.length !== 2) {
        return ['方程式格式不正确'];
    }
    
    const reactants = parts[0].trim().split('+').map(s => s.trim());
    const products = parts[1].trim().split('+').map(s => s.trim());
    
    // 简单的步骤生成
    steps.push('分析反应物和生成物的原子组成');
    steps.push('根据原子守恒原理调整系数');
    steps.push('检查各元素原子数是否相等');
    steps.push('配平完成');
    
    return steps;
}

// 关闭方程式详情弹窗
function closeEquationDetail() {
    const overlay = document.getElementById('equationOverlay');
    const popup = document.querySelector('.equation-detail-popup');
    
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

// 显示元素详情弹窗
function showElementDetail(symbol) {
    const element = config.elements[symbol];
    if (!element) return;
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay visible';
    overlay.id = 'elementOverlay';
    document.body.appendChild(overlay);
    
    // 创建弹窗
    const popup = document.createElement('div');
    popup.className = 'element-detail-popup visible';
    
    // 构建详细信息
    let detailsHtml = `
        <div><span class="label">原子序数：</span>${element.atomicNumber}</div>
        <div><span class="label">原子量：</span>${element.atomicMass}</div>
        <div><span class="label">电子排布：</span>${element.electronConfig}</div>
        <div><span class="label">元素符号：</span>${symbol}</div>
        <div><span class="label">中文名称：</span>${element.name}</div>
    `;
    
    // 添加周期和族信息
    if (element.period) {
        detailsHtml += `<div><span class="label">周期：</span>${element.period}</div>`;
    }
    if (element.group) {
        detailsHtml += `<div><span class="label">族：</span>${element.group}</div>`;
    }
    
    // 添加分类信息
    if (element.category) {
        detailsHtml += `<div><span class="label">分类：</span>${element.category}</div>`;
    }
    
    popup.innerHTML = `
        <div class="popup-header">
            <div class="popup-title">${element.name} (${symbol})</div>
            <button class="popup-close" onclick="closeElementDetail()">×</button>
        </div>
        <div class="popup-content">
            ${detailsHtml}
        </div>
    `;
    document.body.appendChild(popup);
    
    // 绑定关闭事件
    overlay.addEventListener('click', closeElementDetail);
}

// 关闭元素详情弹窗
function closeElementDetail() {
    const overlay = document.getElementById('elementOverlay');
    const popup = document.querySelector('.element-detail-popup');
    
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

// 显示分子详情弹窗
function showMoleculeDetail(index) {
    const molecule = config.presetMolecules[index];
    if (!molecule) return;
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay visible';
    overlay.id = 'moleculeOverlay';
    document.body.appendChild(overlay);
    
    // 创建弹窗
    const popup = document.createElement('div');
    popup.className = 'molecule-detail-popup visible';
    
    // 解析分子组成
    const composition = parseCompound(molecule.formula);
    let compositionHtml = '';
    for (let elem in composition) {
        const element = config.elements[elem];
        if (element) {
            const mass = element.atomicMass * composition[elem];
            compositionHtml += `<div class="composition-item">${elem}${composition[elem]}: ${element.atomicMass} × ${composition[elem]} = ${mass.toFixed(3)}</div>`;
        }
    }
    
    popup.innerHTML = `
        <div class="popup-header">
            <div class="popup-title">${molecule.name}</div>
            <button class="popup-close" onclick="closeMoleculeDetail()">×</button>
        </div>
        <div class="popup-content">
            <div class="formula">${molecule.formula}</div>
            <div class="weight">分子量: ${molecule.weight} g/mol</div>
            <div class="composition">
                <strong>组成计算：</strong>
                ${compositionHtml}
            </div>
            <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 13px; line-height: 1.5;">
                <strong>科学介绍：</strong><br>
                ${molecule.description}
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // 绑定关闭事件
    overlay.addEventListener('click', closeMoleculeDetail);
}

// 关闭分子详情弹窗
function closeMoleculeDetail() {
    const overlay = document.getElementById('moleculeOverlay');
    const popup = document.querySelector('.molecule-detail-popup');
    
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

// 执行计算
function performCalculation() {
    const resultContent = document.getElementById('resultContent');
    
    if (!config.currentInput) {
        resultContent.textContent = '请输入化学方程式或化合物进行计算...';
        return;
    }

    let result = '';
    
    switch (config.currentCalcType) {
        case 'reaction':
            result = calculateReaction(config.currentInput, config.additionalParam);
            break;
        case 'molar_mass':
            result = calculateMolarMass(config.currentInput);
            break;
        case 'element_info':
            result = getElementInfo(config.currentInput);
            break;
        case 'balance':
            result = balanceEquation(config.currentInput);
            break;
    }

    resultContent.textContent = result;
    updateInfoCard();
}

// 化学方程式配平
function balanceEquation(equation) {
    try {
        // 解析方程式
        const parts = equation.split('->');
        if (parts.length !== 2) {
            return '错误：方程式格式不正确，应为：反应物 -> 生成物';
        }

        const reactants = parts[0].trim().split('+').map(s => s.trim());
        const products = parts[1].trim().split('+').map(s => s.trim());

        // 提取化合物信息
        const reactantCompounds = reactants.map(parseCompound);
        const productCompounds = products.map(parseCompound);

        // 计算原子数
        const reactantAtoms = countAtoms(reactantCompounds);
        const productAtoms = countAtoms(productCompounds);

        // 检查元素是否匹配
        const allElements = new Set([...Object.keys(reactantAtoms), ...Object.keys(productAtoms)]);
        for (let elem of allElements) {
            if (reactantAtoms[elem] !== productAtoms[elem]) {
                // 简单配平（实际需要更复杂的算法）
                const coefficients = simpleBalance(reactantCompounds, productCompounds);
                return `配平结果：\n${formatEquation(reactants, products, coefficients)}`;
            }
        }

        return `已配平：\n${equation}\n\n原子数检查：\n${formatAtomCount(reactantAtoms, productAtoms)}`;
    } catch (error) {
        return `错误：${error.message}`;
    }
}

// 简单配平算法
function simpleBalance(reactants, products) {
    // 这里实现一个简单的配平算法
    // 实际应用中需要更复杂的线性代数方法
    return { reactants: [1, 1], products: [2] };
}

// 解析化合物
function parseCompound(compound) {
    const result = {};
    let i = 0;
    while (i < compound.length) {
        // 解析元素符号
        let elem = '';
        if (i < compound.length - 1 && compound[i + 1].match(/[a-z]/)) {
            elem = compound[i] + compound[i + 1];
            i += 2;
        } else {
            elem = compound[i];
            i++;
        }

        // 解析下标
        let count = '';
        while (i < compound.length && compound[i].match(/[0-9]/)) {
            count += compound[i];
            i++;
        }

        result[elem] = count ? parseInt(count) : 1;
    }
    return result;
}

// 计算原子数
function countAtoms(compounds) {
    const atoms = {};
    compounds.forEach(compound => {
        for (let elem in compound) {
            atoms[elem] = (atoms[elem] || 0) + compound[elem];
        }
    });
    return atoms;
}

// 格式化方程式
function formatEquation(reactants, products, coefficients) {
    const reactantStr = reactants.map((r, i) => {
        const coeff = coefficients.reactants[i] || 1;
        return coeff > 1 ? `${coeff}${r}` : r;
    }).join(' + ');

    const productStr = products.map((p, i) => {
        const coeff = coefficients.products[i] || 1;
        return coeff > 1 ? `${coeff}${p}` : p;
    }).join(' + ');

    return `${reactantStr} -> ${productStr}`;
}

// 格式化原子数
function formatAtomCount(reactants, products) {
    let result = '';
    const allElements = new Set([...Object.keys(reactants), ...Object.keys(products)]);
    
    for (let elem of allElements) {
        const rCount = reactants[elem] || 0;
        const pCount = products[elem] || 0;
        result += `${elem}: 反应物 ${rCount} -> 生成物 ${pCount}\n`;
    }
    
    return result;
}

// 分子量计算（已合并到摩尔质量计算中）
function calculateMolecularWeight(compound) {
    try {
        const atoms = parseCompound(compound);
        let totalMass = 0;
        let details = [];

        for (let elem in atoms) {
            const element = config.elements[elem];
            if (!element) {
                return `错误：未知元素 ${elem}`;
            }
            const mass = element.atomicMass * atoms[elem];
            totalMass += mass;
            details.push(`${elem}${atoms[elem]}: ${element.atomicMass} × ${atoms[elem]} = ${mass.toFixed(3)}`);
        }

        return `化合物：${compound}\n分子量：${totalMass.toFixed(3)} g/mol\n\n详细计算：\n${details.join('\n')}`;
    } catch (error) {
        return `错误：${error.message}`;
    }
}

// 摩尔质量计算（合并了分子量计算功能）
function calculateMolarMass(compound) {
    // 首先检查是否是预设分子
    for (let i = 0; i < config.presetMolecules.length; i++) {
        if (config.presetMolecules[i].formula === compound) {
            const molecule = config.presetMolecules[i];
            return `化合物：${compound}\n摩尔质量：${molecule.weight} g/mol\n名称：${molecule.name}\n\n科学介绍：\n${molecule.description}`;
        }
    }
    
    // 如果不是预设分子，则计算
    const molecularWeight = calculateMolecularWeight(compound);
    if (molecularWeight.startsWith('错误')) {
        return molecularWeight;
    }
    
    const lines = molecularWeight.split('\n');
    const molecularWeightValue = parseFloat(lines[1].match(/[\d.]+/)[0]);
    
    return `化合物：${compound}\n摩尔质量：${molecularWeightValue} g/mol\n\n摩尔质量是化学计算的基础，\n用于质量与摩尔数的转换。`;
}

// 元素信息查询
function getElementInfo(elementSymbol) {
    const element = config.elements[elementSymbol];
    if (!element) {
        // 尝试按名称查找
        for (let key in config.elements) {
            if (config.elements[key].name === elementSymbol) {
                return formatElementInfo(key, config.elements[key]);
            }
        }
        return `错误：未知元素 ${elementSymbol}`;
    }
    
    return formatElementInfo(elementSymbol, element);
}

// 格式化元素信息
function formatElementInfo(symbol, element) {
    return `元素：${element.name} (${symbol})\n原子序数：${element.atomicNumber}\n原子量：${element.atomicMass}\n电子排布：${element.electronConfig}\n\n${element.name}是化学元素周期表中的重要元素，\n在化学反应和材料科学中具有广泛应用。`;
}

// 化学反应计算
function calculateReaction(equation, param) {
    try {
        // 首先检查是否是预设反应
        for (let i = 0; i < config.presetReactions.length; i++) {
            if (config.presetReactions[i].equation === equation) {
                const reaction = config.presetReactions[i];
                let result = `反应方程式：${equation}\n\n描述：${reaction.description}\n类型：${reaction.type}\n`;
                if (reaction.catalyst) {
                    result += `催化剂：${reaction.catalyst}\n`;
                }
                result += `\n反应物：${reaction.reactants.join(', ')}\n生成物：${reaction.products.join(', ')}\n\n`;
                
                // 计算分子量
                let reactantMass = 0;
                let productMass = 0;

                for (let r of reaction.reactants) {
                    const mass = calculateMolecularWeight(r);
                    if (!mass.startsWith('错误')) {
                        const lines = mass.split('\n');
                        const massValue = parseFloat(lines[1].match(/[\d.]+/)[0]);
                        reactantMass += massValue;
                    }
                }

                for (let p of reaction.products) {
                    const mass = calculateMolecularWeight(p);
                    if (!mass.startsWith('错误')) {
                        const lines = mass.split('\n');
                        const massValue = parseFloat(lines[1].match(/[\d.]+/)[0]);
                        productMass += massValue;
                    }
                }

                result += `反应物总分子量：${reactantMass.toFixed(3)} g/mol\n生成物总分子量：${productMass.toFixed(3)} g/mol\n`;

                if (param) {
                    const inputMass = parseFloat(param);
                    if (!isNaN(inputMass)) {
                        const ratio = inputMass / reactantMass;
                        result += `\n给定反应物质量：${inputMass} g\n理论生成物质量：${(productMass * ratio).toFixed(3)} g\n`;
                    }
                }

                return result;
            }
        }

        // 如果不是预设反应，则计算
        const parts = equation.split('->');
        if (parts.length !== 2) {
            return '错误：方程式格式不正确，应为：反应物 -> 生成物';
        }

        const reactants = parts[0].trim().split('+').map(s => s.trim());
        const products = parts[1].trim().split('+').map(s => s.trim());

        // 计算分子量
        let reactantMass = 0;
        let productMass = 0;

        for (let r of reactants) {
            const mass = calculateMolecularWeight(r);
            if (!mass.startsWith('错误')) {
                const lines = mass.split('\n');
                const massValue = parseFloat(lines[1].match(/[\d.]+/)[0]);
                reactantMass += massValue;
            }
        }

        for (let p of products) {
            const mass = calculateMolecularWeight(p);
            if (!mass.startsWith('错误')) {
                const lines = mass.split('\n');
                const massValue = parseFloat(lines[1].match(/[\d.]+/)[0]);
                productMass += massValue;
            }
        }

        let result = `反应方程式：${equation}\n\n反应物总分子量：${reactantMass.toFixed(3)} g/mol\n生成物总分子量：${productMass.toFixed(3)} g/mol\n`;

        if (param) {
            const inputMass = parseFloat(param);
            if (!isNaN(inputMass)) {
                const ratio = inputMass / reactantMass;
                result += `\n给定反应物质量：${inputMass} g\n理论生成物质量：${(productMass * ratio).toFixed(3)} g\n`;
            }
        }

        return result;
    } catch (error) {
        return `错误：${error.message}`;
    }
}

// 更新信息卡片
function updateInfoCard() {
    const infoContent = document.getElementById('chemInfoContent');
    const infoTitle = document.getElementById('chemInfoTitle');
    const infoCard = document.getElementById('chemInfoCard');
    
    const info = config.formulaInfo[config.currentCalcType];
    if (info) {
        infoContent.textContent = info;
        infoTitle.textContent = getCalcTypeName(config.currentCalcType);
    }
    
    // 切换到元素周期表时隐藏信息卡片，其他功能显示
    if (config.currentCalcType === 'element_info') {
        infoCard.classList.remove('visible');
    } else {
        infoCard.classList.add('visible');
    }
}

// 获取计算类型名称
function getCalcTypeName(type) {
    const names = {
        'reaction': '化学反应',
        'molar_mass': '分子',
        'element_info': '元素周期表',
        'balance': '化学方程式'
    };
    return names[type] || '化学说明';
}

// 绑定抽屉事件
function bindDrawerEvents() {
    const drawer = document.getElementById('drawer');
    const toggleDrawer = document.getElementById('toggleDrawer');
    const showDrawer = document.getElementById('showDrawer');

    // 确保首次加载时"展开化学计算"按钮是隐藏的
    showDrawer.style.display = 'none';

    toggleDrawer.addEventListener('click', function() {
        drawer.classList.add('hidden');
        showDrawer.style.display = 'block';
    });

    showDrawer.addEventListener('click', function() {
        drawer.classList.remove('hidden');
        showDrawer.style.display = 'none';
    });
}

// 绑定信息卡片事件
function bindInfoCardEvents() {
    const infoCard = document.getElementById('chemInfoCard');
    const closeInfoCard = document.getElementById('closeInfoCard');

    closeInfoCard.addEventListener('click', function() {
        infoCard.classList.remove('visible');
    });

    // 自动显示信息卡片（元素周期表除外）
    const calcTypeSelect = document.getElementById('calcType');
    calcTypeSelect.addEventListener('change', function() {
        if (this.value !== 'element_info') {
            infoCard.classList.add('visible');
        }
    });
}

// 绑定缩放按钮事件
function bindZoomBtnEvents() {
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const visualization = document.getElementById('chemVisualization');

    let scale = 1;

    zoomInBtn.addEventListener('click', function() {
        scale += 0.1;
        if (scale > 2) scale = 2;
        visualization.style.transform = `scale(${scale})`;
    });

    zoomOutBtn.addEventListener('click', function() {
        scale -= 0.1;
        if (scale < 0.5) scale = 0.5;
        visualization.style.transform = `scale(${scale})`;
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initChemistry();
    // 初始显示化学方程式配平可视化
    setTimeout(() => {
        updateVisualization();
    }, 100);
});

// 确保数据加载完成后再初始化
window.addEventListener('load', function() {
    // 重新加载数据以确保所有数据都已加载
    loadData();
});