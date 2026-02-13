// 化学方程式配平数据 - 60个预设方程式
const equationData = [
    // 基础反应（1-10）
    { equation: '2H2 + O2 -> 2H2O', explanation: '氢气燃烧生成水', type: '燃烧反应', difficulty: '简单' },
    { equation: '2Na + 2H2O -> 2NaOH + H2', explanation: '钠与水反应生成氢氧化钠和氢气', type: '置换反应', difficulty: '简单' },
    { equation: 'CH4 + 2O2 -> CO2 + 2H2O', explanation: '甲烷燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '简单' },
    { equation: '2Al + 6HCl -> 2AlCl3 + 3H2', explanation: '铝与盐酸反应生成氯化铝和氢气', type: '置换反应', difficulty: '简单' },
    { equation: 'Fe + CuSO4 -> FeSO4 + Cu', explanation: '铁与硫酸铜反应生成硫酸亚铁和铜', type: '置换反应', difficulty: '简单' },
    { equation: '2KClO3 -> 2KCl + 3O2', explanation: '氯酸钾分解生成氯化钾和氧气', type: '分解反应', difficulty: '简单' },
    { equation: 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2', explanation: '碳酸钙与盐酸反应生成氯化钙、水和二氧化碳', type: '复分解反应', difficulty: '简单' },
    { equation: '2Mg + O2 -> 2MgO', explanation: '镁燃烧生成氧化镁', type: '燃烧反应', difficulty: '简单' },
    { equation: '2H2O2 -> 2H2O + O2', explanation: '过氧化氢分解生成水和氧气', type: '分解反应', difficulty: '简单' },
    { equation: 'C2H4 + 3O2 -> 2CO2 + 2H2O', explanation: '乙烯燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '简单' },
    
    // 中等难度（11-20）
    { equation: 'Zn + H2SO4 -> ZnSO4 + H2', explanation: '锌与稀硫酸反应生成硫酸锌和氢气', type: '置换反应', difficulty: '中等' },
    { equation: '2AgNO3 + Cu -> Cu(NO3)2 + 2Ag', explanation: '银离子与铜的置换反应', type: '置换反应', difficulty: '中等' },
    { equation: 'Na2CO3 + Ca(OH)2 -> CaCO3 + 2NaOH', explanation: '碳酸钠与氢氧化钙反应生成碳酸钙和氢氧化钠', type: '复分解反应', difficulty: '中等' },
    { equation: 'NH4Cl + NaOH -> NaCl + NH3 + H2O', explanation: '铵盐与碱反应生成氯化钠、氨气和水', type: '复分解反应', difficulty: '中等' },
    { equation: '2NaOH + CO2 -> Na2CO3 + H2O', explanation: '氢氧化钠与二氧化碳反应生成碳酸钠和水', type: '酸碱反应', difficulty: '中等' },
    { equation: 'CaO + H2O -> Ca(OH)2', explanation: '生石灰与水反应生成熟石灰', type: '化合反应', difficulty: '简单' },
    { equation: '2CO + O2 -> 2CO2', explanation: '一氧化碳燃烧生成二氧化碳', type: '燃烧反应', difficulty: '中等' },
    { equation: 'N2 + 3H2 -> 2NH3', explanation: '氮气与氢气合成氨气', type: '合成反应', difficulty: '中等' },
    { equation: '2SO2 + O2 -> 2SO3', explanation: '二氧化硫氧化生成三氧化硫', type: '氧化反应', difficulty: '中等' },
    { equation: 'C + CO2 -> 2CO', explanation: '碳与二氧化碳反应生成一氧化碳', type: '氧化还原反应', difficulty: '中等' },
    
    // 酸碱反应（21-30）
    { equation: 'HCl + NaOH -> NaCl + H2O', explanation: '盐酸与氢氧化钠中和反应', type: '中和反应', difficulty: '简单' },
    { equation: 'H2SO4 + 2NaOH -> Na2SO4 + 2H2O', explanation: '硫酸与氢氧化钠中和反应', type: '中和反应', difficulty: '简单' },
    { equation: 'HNO3 + KOH -> KNO3 + H2O', explanation: '硝酸与氢氧化钾中和反应', type: '中和反应', difficulty: '简单' },
    { equation: 'H3PO4 + 3NaOH -> Na3PO4 + 3H2O', explanation: '磷酸与氢氧化钠中和反应', type: '中和反应', difficulty: '中等' },
    { equation: '2HCl + Ca(OH)2 -> CaCl2 + 2H2O', explanation: '盐酸与氢氧化钙中和反应', type: '中和反应', difficulty: '简单' },
    { equation: 'H2SO4 + Ba(OH)2 -> BaSO4 + 2H2O', explanation: '硫酸与氢氧化钡反应生成硫酸钡沉淀', type: '复分解反应', difficulty: '中等' },
    { equation: '2HNO3 + Mg(OH)2 -> Mg(NO3)2 + 2H2O', explanation: '硝酸与氢氧化镁中和反应', type: '中和反应', difficulty: '简单' },
    { equation: 'HCl + NH3 -> NH4Cl', explanation: '盐酸与氨气反应生成氯化铵', type: '化合反应', difficulty: '简单' },
    { equation: 'H2SO4 + 2NH3 -> (NH4)2SO4', explanation: '硫酸与氨气反应生成硫酸铵', type: '化合反应', difficulty: '简单' },
    { equation: 'H3PO4 + 3NH3 -> (NH4)3PO4', explanation: '磷酸与氨气反应生成磷酸铵', type: '化合反应', difficulty: '中等' },
    
    // 沉淀反应（31-40）
    { equation: 'AgNO3 + NaCl -> AgCl + NaNO3', explanation: '硝酸银与氯化钠反应生成氯化银沉淀', type: '复分解反应', difficulty: '简单' },
    { equation: 'BaCl2 + Na2SO4 -> BaSO4 + 2NaCl', explanation: '氯化钡与硫酸钠反应生成硫酸钡沉淀', type: '复分解反应', difficulty: '简单' },
    { equation: 'CaCl2 + Na2CO3 -> CaCO3 + 2NaCl', explanation: '氯化钙与碳酸钠反应生成碳酸钙沉淀', type: '复分解反应', difficulty: '简单' },
    { equation: 'MgCl2 + 2NaOH -> Mg(OH)2 + 2NaCl', explanation: '氯化镁与氢氧化钠反应生成氢氧化镁沉淀', type: '复分解反应', difficulty: '简单' },
    { equation: 'CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4', explanation: '硫酸铜与氢氧化钠反应生成氢氧化铜沉淀', type: '复分解反应', difficulty: '简单' },
    { equation: 'FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl', explanation: '氯化铁与氢氧化钠反应生成氢氧化铁沉淀', type: '复分解反应', difficulty: '中等' },
    { equation: 'AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl', explanation: '氯化铝与氢氧化钠反应生成氢氧化铝沉淀', type: '复分解反应', difficulty: '中等' },
    { equation: 'Pb(NO3)2 + 2KI -> PbI2 + 2KNO3', explanation: '硝酸铅与碘化钾反应生成碘化铅沉淀', type: '复分解反应', difficulty: '中等' },
    { equation: 'Ba(OH)2 + H2SO4 -> BaSO4 + 2H2O', explanation: '氢氧化钡与硫酸反应生成硫酸钡沉淀', type: '复分解反应', difficulty: '中等' },
    { equation: 'Ca(OH)2 + CO2 -> CaCO3 + H2O', explanation: '氢氧化钙与二氧化碳反应生成碳酸钙沉淀', type: '复分解反应', difficulty: '简单' },
    
    // 氧化还原反应（41-50）
    { equation: '2Fe + 3Cl2 -> 2FeCl3', explanation: '铁与氯气反应生成氯化铁', type: '氧化还原反应', difficulty: '中等' },
    { equation: '2Cu + O2 -> 2CuO', explanation: '铜与氧气反应生成氧化铜', type: '氧化还原反应', difficulty: '简单' },
    { equation: '2K + Cl2 -> 2KCl', explanation: '钾与氯气反应生成氯化钾', type: '氧化还原反应', difficulty: '简单' },
    { equation: '2Na + Cl2 -> 2NaCl', explanation: '钠与氯气反应生成氯化钠', type: '氧化还原反应', difficulty: '简单' },
    { equation: '2Al + Fe2O3 -> Al2O3 + 2Fe', explanation: '铝与氧化铁反应生成氧化铝和铁', type: '氧化还原反应', difficulty: '中等' },
    { equation: 'Zn + 2HCl -> ZnCl2 + H2', explanation: '锌与盐酸反应生成氯化锌和氢气', type: '氧化还原反应', difficulty: '简单' },
    { equation: 'Fe + 2HCl -> FeCl2 + H2', explanation: '铁与盐酸反应生成氯化亚铁和氢气', type: '氧化还原反应', difficulty: '简单' },
    { equation: 'Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag', explanation: '铜与硝酸银反应生成硝酸铜和银', type: '氧化还原反应', difficulty: '中等' },
    { equation: '2FeCl3 + Cu -> 2FeCl2 + CuCl2', explanation: '氯化铁与铜反应生成氯化亚铁和氯化铜', type: '氧化还原反应', difficulty: '中等' },
    { equation: '2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 8H2O + 5Cl2', explanation: '高锰酸钾与盐酸反应生成氯化钾、氯化锰、水和氯气', type: '氧化还原反应', difficulty: '困难' },
    
    // 复杂反应（51-60）
    { equation: '2C2H6 + 7O2 -> 4CO2 + 6H2O', explanation: '乙烷燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: 'C3H8 + 5O2 -> 3CO2 + 4H2O', explanation: '丙烷燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C4H10 + 13O2 -> 8CO2 + 10H2O', explanation: '丁烷燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C6H6 + 15O2 -> 12CO2 + 6H2O', explanation: '苯燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C7H16 + 22O2 -> 14CO2 + 16H2O', explanation: '庚烷燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C2H5OH + 6O2 -> 4CO2 + 6H2O', explanation: '乙醇燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2CH3OH + 3O2 -> 2CO2 + 4H2O', explanation: '甲醇燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C3H7OH + 9O2 -> 6CO2 + 8H2O', explanation: '丙醇燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C4H9OH + 12O2 -> 8CO2 + 10H2O', explanation: '丁醇燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' },
    { equation: '2C5H11OH + 15O2 -> 10CO2 + 12H2O', explanation: '戊醇燃烧生成二氧化碳和水', type: '燃烧反应', difficulty: '中等' }
];