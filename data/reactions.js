// 化学反应数据 - 60个预设反应（包含催化剂反应）
const reactionData = [
    // 基础反应（1-10）
    {
        equation: '2H2 + O2 -> 2H2O',
        reactants: ['H2', 'O2'],
        products: ['H2O'],
        description: '氢气燃烧反应，生成水，是清洁能源的代表反应',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'CH4 + 2O2 -> CO2 + 2H2O',
        reactants: ['CH4', 'O2'],
        products: ['CO2', 'H2O'],
        description: '甲烷燃烧反应，天然气的主要燃烧过程',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'Fe + CuSO4 -> FeSO4 + Cu',
        reactants: ['Fe', 'CuSO4'],
        products: ['FeSO4', 'Cu'],
        description: '铁与硫酸铜的置换反应，金属活动性顺序的典型例子',
        type: '置换反应',
        catalyst: null
    },
    {
        equation: '2Na + 2H2O -> 2NaOH + H2',
        reactants: ['Na', 'H2O'],
        products: ['NaOH', 'H2'],
        description: '钠与水的剧烈反应，生成氢氧化钠和氢气',
        type: '置换反应',
        catalyst: null
    },
    {
        equation: 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2',
        reactants: ['CaCO3', 'HCl'],
        products: ['CaCl2', 'H2O', 'CO2'],
        description: '碳酸钙与盐酸反应，实验室制取二氧化碳的方法',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: '2KClO3 -> 2KCl + 3O2',
        reactants: ['KClO3'],
        products: ['KCl', 'O2'],
        description: '氯酸钾分解反应，实验室制取氧气的方法',
        type: '分解反应',
        catalyst: 'MnO2'
    },
    {
        equation: '2Mg + O2 -> 2MgO',
        reactants: ['Mg', 'O2'],
        products: ['MgO'],
        description: '镁燃烧反应，产生耀眼白光',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2H2O2 -> 2H2O + O2',
        reactants: ['H2O2'],
        products: ['H2O', 'O2'],
        description: '过氧化氢分解反应，常用作消毒剂',
        type: '分解反应',
        catalyst: 'MnO2'
    },
    {
        equation: 'C2H4 + 3O2 -> 2CO2 + 2H2O',
        reactants: ['C2H4', 'O2'],
        products: ['CO2', 'H2O'],
        description: '乙烯燃烧反应，重要的有机化工原料',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2Al + 6HCl -> 2AlCl3 + 3H2',
        reactants: ['Al', 'HCl'],
        products: ['AlCl3', 'H2'],
        description: '铝与盐酸反应，生成氯化铝和氢气',
        type: '置换反应',
        catalyst: null
    },
    
    // 催化剂反应（11-20）
    {
        equation: 'N2 + 3H2 -> 2NH3',
        reactants: ['N2', 'H2'],
        products: ['NH3'],
        description: '哈伯法合成氨反应，工业制氨的基础反应',
        type: '合成反应',
        catalyst: 'Fe'
    },
    {
        equation: '2SO2 + O2 -> 2SO3',
        reactants: ['SO2', 'O2'],
        products: ['SO3'],
        description: '二氧化硫氧化反应，工业制硫酸的关键步骤',
        type: '氧化反应',
        catalyst: 'V2O5'
    },
    {
        equation: 'CO + H2O -> CO2 + H2',
        reactants: ['CO', 'H2O'],
        products: ['CO2', 'H2'],
        description: '水煤气变换反应，制氢的重要反应',
        type: '氧化还原反应',
        catalyst: 'Fe3O4'
    },
    {
        equation: 'CH4 + H2O -> CO + 3H2',
        reactants: ['CH4', 'H2O'],
        products: ['CO', 'H2'],
        description: '甲烷蒸汽重整反应，工业制氢的主要方法',
        type: '重整反应',
        catalyst: 'Ni'
    },
    {
        equation: '2C2H5OH + O2 -> 2CH3CHO + 2H2O',
        reactants: ['C2H5OH', 'O2'],
        products: ['CH3CHO', 'H2O'],
        description: '乙醇氧化反应，制乙醛的重要反应',
        type: '氧化反应',
        catalyst: 'Cu'
    },
    {
        equation: 'C6H12O6 -> 2C2H5OH + 2CO2',
        reactants: ['C6H12O6'],
        products: ['C2H5OH', 'CO2'],
        description: '葡萄糖发酵反应，酒精发酵的基础',
        type: '发酵反应',
        catalyst: '酶'
    },
    {
        equation: '2CO + O2 -> 2CO2',
        reactants: ['CO', 'O2'],
        products: ['CO2'],
        description: '一氧化碳燃烧反应，完全氧化过程',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'NH4Cl + NaOH -> NaCl + NH3 + H2O',
        reactants: ['NH4Cl', 'NaOH'],
        products: ['NaCl', 'NH3', 'H2O'],
        description: '铵盐与碱反应，实验室制氨气的方法',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: '2NaOH + CO2 -> Na2CO3 + H2O',
        reactants: ['NaOH', 'CO2'],
        products: ['Na2CO3', 'H2O'],
        description: '氢氧化钠吸收二氧化碳，制纯碱的反应',
        type: '酸碱反应',
        catalyst: null
    },
    {
        equation: 'CaO + H2O -> Ca(OH)2',
        reactants: ['CaO', 'H2O'],
        products: ['Ca(OH)2'],
        description: '生石灰与水反应生成熟石灰',
        type: '化合反应',
        catalyst: null
    },
    
    // 中等难度反应（21-30）
    {
        equation: 'Zn + H2SO4 -> ZnSO4 + H2',
        reactants: ['Zn', 'H2SO4'],
        products: ['ZnSO4', 'H2'],
        description: '锌与稀硫酸反应，实验室制取氢气的方法',
        type: '置换反应',
        catalyst: null
    },
    {
        equation: '2AgNO3 + Cu -> Cu(NO3)2 + 2Ag',
        reactants: ['AgNO3', 'Cu'],
        products: ['Cu(NO3)2', 'Ag'],
        description: '银离子与铜的置换反应，金属活动性顺序验证',
        type: '置换反应',
        catalyst: null
    },
    {
        equation: 'Na2CO3 + Ca(OH)2 -> CaCO3 + 2NaOH',
        reactants: ['Na2CO3', 'Ca(OH)2'],
        products: ['CaCO3', 'NaOH'],
        description: '碳酸钠与氢氧化钙反应生成碳酸钙和氢氧化钠',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: 'HCl + NaOH -> NaCl + H2O',
        reactants: ['HCl', 'NaOH'],
        products: ['NaCl', 'H2O'],
        description: '盐酸与氢氧化钠中和反应',
        type: '中和反应',
        catalyst: null
    },
    {
        equation: 'H2SO4 + 2NaOH -> Na2SO4 + 2H2O',
        reactants: ['H2SO4', 'NaOH'],
        products: ['Na2SO4', 'H2O'],
        description: '硫酸与氢氧化钠中和反应',
        type: '中和反应',
        catalyst: null
    },
    {
        equation: 'HNO3 + KOH -> KNO3 + H2O',
        reactants: ['HNO3', 'KOH'],
        products: ['KNO3', 'H2O'],
        description: '硝酸与氢氧化钾中和反应',
        type: '中和反应',
        catalyst: null
    },
    {
        equation: 'AgNO3 + NaCl -> AgCl + NaNO3',
        reactants: ['AgNO3', 'NaCl'],
        products: ['AgCl', 'NaNO3'],
        description: '硝酸银与氯化钠反应生成氯化银沉淀',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: 'BaCl2 + Na2SO4 -> BaSO4 + 2NaCl',
        reactants: ['BaCl2', 'Na2SO4'],
        products: ['BaSO4', 'NaCl'],
        description: '氯化钡与硫酸钠反应生成硫酸钡沉淀',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: 'CaCl2 + Na2CO3 -> CaCO3 + 2NaCl',
        reactants: ['CaCl2', 'Na2CO3'],
        products: ['CaCO3', 'NaCl'],
        description: '氯化钙与碳酸钠反应生成碳酸钙沉淀',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: 'MgCl2 + 2NaOH -> Mg(OH)2 + 2NaCl',
        reactants: ['MgCl2', 'NaOH'],
        products: ['Mg(OH)2', 'NaCl'],
        description: '氯化镁与氢氧化钠反应生成氢氧化镁沉淀',
        type: '复分解反应',
        catalyst: null
    },
    
    // 有机反应（31-40）
    {
        equation: 'CH4 + Cl2 -> CH3Cl + HCl',
        reactants: ['CH4', 'Cl2'],
        products: ['CH3Cl', 'HCl'],
        description: '甲烷与氯气的取代反应，生成一氯甲烷',
        type: '取代反应',
        catalyst: '光照'
    },
    {
        equation: 'C2H4 + Br2 -> C2H4Br2',
        reactants: ['C2H4', 'Br2'],
        products: ['C2H4Br2'],
        description: '乙烯与溴的加成反应，使溴水褪色',
        type: '加成反应',
        catalyst: null
    },
    {
        equation: 'C6H6 + Br2 -> C6H5Br + HBr',
        reactants: ['C6H6', 'Br2'],
        products: ['C6H5Br', 'HBr'],
        description: '苯与溴的取代反应，生成溴苯',
        type: '取代反应',
        catalyst: 'FeBr3'
    },
    {
        equation: 'CH3COOH + CH3CH2OH -> CH3COOCH2CH3 + H2O',
        reactants: ['CH3COOH', 'CH3CH2OH'],
        products: ['CH3COOCH2CH3', 'H2O'],
        description: '乙酸与乙醇的酯化反应，生成乙酸乙酯',
        type: '酯化反应',
        catalyst: '浓H2SO4'
    },
    {
        equation: 'C6H12O6 -> 2C2H5OH + 2CO2',
        reactants: ['C6H12O6'],
        products: ['C2H5OH', 'CO2'],
        description: '葡萄糖发酵反应，酒精发酵的基础',
        type: '发酵反应',
        catalyst: '酶'
    },
    {
        equation: 'C2H5OH + 3O2 -> 2CO2 + 3H2O',
        reactants: ['C2H5OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '乙醇燃烧反应，完全氧化生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'CH3COOH + NaOH -> CH3COONa + H2O',
        reactants: ['CH3COOH', 'NaOH'],
        products: ['CH3COONa', 'H2O'],
        description: '乙酸与氢氧化钠中和反应，生成乙酸钠',
        type: '中和反应',
        catalyst: null
    },
    {
        equation: 'C2H5OH + HBr -> C2H5Br + H2O',
        reactants: ['C2H5OH', 'HBr'],
        products: ['C2H5Br', 'H2O'],
        description: '乙醇与氢溴酸反应，生成溴乙烷',
        type: '取代反应',
        catalyst: '浓H2SO4'
    },
    {
        equation: 'C6H12O6 + 6O2 -> 6CO2 + 6H2O',
        reactants: ['C6H12O6', 'O2'],
        products: ['CO2', 'H2O'],
        description: '葡萄糖燃烧反应，完全氧化释放能量',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C2H2 + 5O2 -> 4CO2 + 2H2O',
        reactants: ['C2H2', 'O2'],
        products: ['CO2', 'H2O'],
        description: '乙炔燃烧反应，产生高温火焰',
        type: '燃烧反应',
        catalyst: null
    },
    
    // 复杂反应（41-50）
    {
        equation: '2C2H6 + 7O2 -> 4CO2 + 6H2O',
        reactants: ['C2H6', 'O2'],
        products: ['CO2', 'H2O'],
        description: '乙烷燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'C3H8 + 5O2 -> 3CO2 + 4H2O',
        reactants: ['C3H8', 'O2'],
        products: ['CO2', 'H2O'],
        description: '丙烷燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C4H10 + 13O2 -> 8CO2 + 10H2O',
        reactants: ['C4H10', 'O2'],
        products: ['CO2', 'H2O'],
        description: '丁烷燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C6H6 + 15O2 -> 12CO2 + 6H2O',
        reactants: ['C6H6', 'O2'],
        products: ['CO2', 'H2O'],
        description: '苯燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C7H16 + 22O2 -> 14CO2 + 16H2O',
        reactants: ['C7H16', 'O2'],
        products: ['CO2', 'H2O'],
        description: '庚烷燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C2H5OH + 6O2 -> 4CO2 + 6H2O',
        reactants: ['C2H5OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '乙醇燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2CH3OH + 3O2 -> 2CO2 + 4H2O',
        reactants: ['CH3OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '甲醇燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C3H7OH + 9O2 -> 6CO2 + 8H2O',
        reactants: ['C3H7OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '丙醇燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C4H9OH + 12O2 -> 8CO2 + 10H2O',
        reactants: ['C4H9OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '丁醇燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: '2C5H11OH + 15O2 -> 10CO2 + 12H2O',
        reactants: ['C5H11OH', 'O2'],
        products: ['CO2', 'H2O'],
        description: '戊醇燃烧生成二氧化碳和水',
        type: '燃烧反应',
        catalyst: null
    },
    
    // 催化剂反应补充（51-60）
    {
        equation: '2SO2 + O2 -> 2SO3',
        reactants: ['SO2', 'O2'],
        products: ['SO3'],
        description: '二氧化硫氧化反应，工业制硫酸的关键步骤',
        type: '氧化反应',
        catalyst: 'V2O5'
    },
    {
        equation: 'N2 + 3H2 -> 2NH3',
        reactants: ['N2', 'H2'],
        products: ['NH3'],
        description: '哈伯法合成氨反应，工业制氨的基础反应',
        type: '合成反应',
        catalyst: 'Fe'
    },
    {
        equation: 'CO + H2O -> CO2 + H2',
        reactants: ['CO', 'H2O'],
        products: ['CO2', 'H2'],
        description: '水煤气变换反应，制氢的重要反应',
        type: '氧化还原反应',
        catalyst: 'Fe3O4'
    },
    {
        equation: 'CH4 + H2O -> CO + 3H2',
        reactants: ['CH4', 'H2O'],
        products: ['CO', 'H2'],
        description: '甲烷蒸汽重整反应，工业制氢的主要方法',
        type: '重整反应',
        catalyst: 'Ni'
    },
    {
        equation: '2C2H5OH + O2 -> 2CH3CHO + 2H2O',
        reactants: ['C2H5OH', 'O2'],
        products: ['CH3CHO', 'H2O'],
        description: '乙醇氧化反应，制乙醛的重要反应',
        type: '氧化反应',
        catalyst: 'Cu'
    },
    {
        equation: 'C6H12O6 -> 2C2H5OH + 2CO2',
        reactants: ['C6H12O6'],
        products: ['C2H5OH', 'CO2'],
        description: '葡萄糖发酵反应，酒精发酵的基础',
        type: '发酵反应',
        catalyst: '酶'
    },
    {
        equation: '2CO + O2 -> 2CO2',
        reactants: ['CO', 'O2'],
        products: ['CO2'],
        description: '一氧化碳燃烧反应，完全氧化过程',
        type: '燃烧反应',
        catalyst: null
    },
    {
        equation: 'NH4Cl + NaOH -> NaCl + NH3 + H2O',
        reactants: ['NH4Cl', 'NaOH'],
        products: ['NaCl', 'NH3', 'H2O'],
        description: '铵盐与碱反应，实验室制氨气的方法',
        type: '复分解反应',
        catalyst: null
    },
    {
        equation: '2NaOH + CO2 -> Na2CO3 + H2O',
        reactants: ['NaOH', 'CO2'],
        products: ['Na2CO3', 'H2O'],
        description: '氢氧化钠吸收二氧化碳，制纯碱的反应',
        type: '酸碱反应',
        catalyst: null
    },
    {
        equation: 'CaO + H2O -> Ca(OH)2',
        reactants: ['CaO', 'H2O'],
        products: ['Ca(OH)2'],
        description: '生石灰与水反应生成熟石灰',
        type: '化合反应',
        catalyst: null
    }
];