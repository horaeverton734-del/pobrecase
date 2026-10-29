/**
 * ==========================================================================
 * POBRECASE PRO 4.0 — PORTAL COMPLETO DE CAIXAS PARA CORTE A LASER E CNC
 * Clone Reverso Profissional do Ecossistema MakerCase (14 Modelos)
 * Desenvolvido por cook45 & will
 * ==========================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. REGISTRO DOS 14 MODELOS (CATÁLOGO MAKERCASE CLONE)
  // ==========================================================================
  const MODEL_CATALOG = {
    basica: {
      id: 'basica',
      name: 'Caixa Básica',
      badge: 'BÁSICO',
      badgeClass: 'badge-basic',
      category: 'laser',
      desc: 'Caixa retangular clássica de 6 lados com encaixes de dentes nos cantos.',
      defaults: { width: 140, height: 70, depth: 100, thickness: 3.0, tabSize: 15 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: false, poly: false, curved: false }
    },
    dobradica: {
      id: 'dobradica',
      name: 'Caixa com Dobradiça a Laser',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Tampa articulada estilo baú com orelhas de giro externas e batente de 100° sem colisão.',
      defaults: { width: 150, height: 75, depth: 110, thickness: 3.0, pinDiam: 3.2, stopAngle: 100 },
      hasLidSlider: true,
      lidLabel: '🚪 Abrir Tampa:',
      sidebarCards: { hinge: true, sliding: false, stackable: false, dividers: false, poly: false, curved: false }
    },
    divisoria_grade: {
      id: 'divisoria_grade',
      name: 'Caixa Divisória em Grade',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Organizadores com compartimentos simétricos em X e Y com encaixes cruzados de meia-madeira.',
      defaults: { width: 180, height: 60, depth: 140, thickness: 3.0, divCols: 3, divRows: 2 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    },
    divisoria_custom: {
      id: 'divisoria_custom',
      name: 'Caixa Divisória Personalizada',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Divisórias com nichos livres e assimétricos para guardar ferramentas ou objetos de tamanhos variados.',
      defaults: { width: 200, height: 70, depth: 130, thickness: 3.0, divCols: 2, divRows: 1 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    },
    gavetas_grade: {
      id: 'gavetas_grade',
      name: 'Caixa com Gavetas em Grade',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Módulo organizador com gavetinhas deslizantes individuais com puxadores frontais vazados.',
      defaults: { width: 160, height: 120, depth: 120, thickness: 3.0, divCols: 2, divRows: 2 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    },
    gavetas_custom: {
      id: 'gavetas_custom',
      name: 'Caixa com Gavetas Personalizada',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Combinação de nicho superior aberto e gavetas inferiores sob medida.',
      defaults: { width: 180, height: 130, depth: 110, thickness: 3.0, divCols: 2, divRows: 2 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    },
    tampa_deslizante: {
      id: 'tampa_deslizante',
      name: 'Caixa com Tampa Deslizante',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Estojo de correr com ranhura nas paredes laterais e puxador de dedo na tampa de deslizar.',
      defaults: { width: 160, height: 60, depth: 100, thickness: 3.0, fingerPull: 18, lidSlide: 0 },
      hasLidSlider: true,
      lidLabel: '↔️ Deslizar Tampa:',
      sidebarCards: { hinge: false, sliding: true, stackable: false, dividers: false, poly: false, curved: false }
    },
    empilhavel: {
      id: 'empilhavel',
      name: 'Caixa Empilhável para Peças (Bin)',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: 'laser',
      desc: 'Gaveteiro de bancada estilo oficina/bin com frente rebaixada chanfrada e pés de empilhamento.',
      defaults: { width: 120, height: 80, depth: 160, thickness: 3.0, binDrop: 45 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: true, dividers: false, poly: false, curved: false }
    },
    poligonal: {
      id: 'poligonal',
      name: 'Caixa Poligonal',
      badge: 'BÁSICO',
      badgeClass: 'badge-basic',
      category: 'laser',
      desc: 'Caixas regulares de 3 a 10 lados: triângulos, pentágonos, hexágonos e octógonos com dentes 360°.',
      defaults: { height: 75, polySides: 6, polyRadius: 60, thickness: 3.0 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: false, poly: true, curved: false }
    },
    curvada: {
      id: 'curvada',
      name: 'Caixa Curvada (Living Hinge)',
      badge: 'BÁSICO',
      badgeClass: 'badge-basic',
      category: 'laser',
      desc: 'Cantos arredondados contínuos com malha flexível cortada pelo laser para dobrar o MDF na mão.',
      defaults: { width: 140, height: 65, depth: 90, hingeRadius: 20, thickness: 3.0 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: false, poly: false, curved: true }
    },
    impressa_basica: {
      id: 'impressa_basica',
      name: 'Caixa 3D Impressa Básica',
      badge: 'BÁSICO',
      badgeClass: 'badge-basic',
      category: '3dprint',
      desc: 'Otimizada para impressoras 3D (FDM/Resina) com paredes sólidas sem fendas e cantos arredondados.',
      defaults: { width: 100, height: 50, depth: 80, thickness: 2.0 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: false, poly: false, curved: false }
    },
    impressa_divisoria: {
      id: 'impressa_divisoria',
      name: 'Caixa Divisória 3D Impressa',
      badge: 'BÁSICO',
      badgeClass: 'badge-basic',
      category: '3dprint',
      desc: 'Bandejas e organizadores de gaveta monobloco com fillete nos cantos inferiores para fácil limpeza.',
      defaults: { width: 140, height: 45, depth: 100, thickness: 2.0, divCols: 3, divRows: 2 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    },
    impressa_custom: {
      id: 'impressa_custom',
      name: 'Divisória Personalizada 3D',
      badge: 'PRO',
      badgeClass: 'badge-pro',
      category: '3dprint',
      desc: 'Modelagem monobloco sob medida com espessuras calibradas para bicos 0.4mm.',
      defaults: { width: 160, height: 50, depth: 110, thickness: 2.4, divCols: 2, divRows: 1 },
      hasLidSlider: false,
      sidebarCards: { hinge: false, sliding: false, stackable: false, dividers: true, poly: false, curved: false }
    }
  };

  // ==========================================================================
  // 2. ESTADO GLOBAL DA APLICAÇÃO
  // ==========================================================================
  const state = {
    currentScreen: 'catalog', // 'catalog' ou 'studio'
    activeModel: 'dobradica',  // Começa no modelo estrela (Dobradiça a Laser PRO)

    // Dimensões Principais (mm)
    dimType: 'outside', // 'outside' ou 'inside'
    width: 140,
    height: 70,
    depth: 100,

    // Material e Corte
    thickness: 3.0,
    kerf: 0.15,
    tabSize: 15,

    // Mecânica da Dobradiça (Offset Ears & Pivot Axis)
    pinDiam: 3.2,
    stopAngle: 100,
    lidOpenProgress: 0, // 0 a 100% (mapeado para 0° até stopAngle)

    // Tampa Deslizante
    fingerPull: 18,

    // Empilhável
    binDrop: 45,

    // Divisórias
    divCols: 2,
    divRows: 2,

    // Poligonal
    polySides: 6,
    polyRadius: 60,

    // Cantos Curvos (Living Hinge)
    hingeRadius: 20,

    // Visualização 3D
    exploded: 0,
    materialType: 'wood', // 'wood', 'acrylic', 'dark'
    autoRotate: false,

    // Visualização 2D
    activeTab: '3d', // '3d' ou '2d'
    showLabels: true,
    zoom2D: 1.0,

    // Filtro do Catálogo
    activeFilter: 'all' // 'all', 'laser', '3dprint'
  };

  // ==========================================================================
  // 3. SELETORES DO DOM
  // ==========================================================================
  const DOM = {
    // Telas
    screenCatalog: document.getElementById('screen-catalog'),
    screenStudio: document.getElementById('screen-studio'),
    btnBackCatalog: document.getElementById('btn-back-catalog'),
    btnQuickClone: document.getElementById('btn-quick-clone'),

    // Filtros e Cards
    filterPills: document.querySelectorAll('.filter-pill'),
    modelCards: document.querySelectorAll('.model-card'),
    studioActiveTitle: document.getElementById('studio-active-title'),
    studioBadgeType: document.getElementById('studio-badge-type'),
    hudDims: document.getElementById('hud-dims'),
    hudBoxName: document.getElementById('hud-box-name'),

    // Abas de visualização
    tabBtn3D: document.getElementById('tab-btn-3d'),
    tabBtn2D: document.getElementById('tab-btn-2d'),
    view3DWrapper: document.getElementById('view-3d-wrapper'),
    view2DWrapper: document.getElementById('view-2d-wrapper'),
    canvasContainer: document.getElementById('canvas-container'),

    // Sidebar & Cards Dinâmicos
    controlDimType: document.querySelectorAll('input[name="dimType"]'),
    rowDimW: document.getElementById('row-dim-w'),
    rowDimH: document.getElementById('row-dim-h'),
    rowDimD: document.getElementById('row-dim-d'),

    inpWidth: document.getElementById('inp-width'),
    rangeWidth: document.getElementById('range-width'),
    inpHeight: document.getElementById('inp-height'),
    rangeHeight: document.getElementById('range-height'),
    inpDepth: document.getElementById('inp-depth'),
    rangeDepth: document.getElementById('range-depth'),

    polySpecificInputs: document.getElementById('poly-specific-inputs'),
    inpPolySides: document.getElementById('inp-poly-sides'),
    rangePolySides: document.getElementById('range-poly-sides'),
    inpPolyRadius: document.getElementById('inp-poly-radius'),
    rangePolyRadius: document.getElementById('range-poly-radius'),

    hingeSpecificInputs: document.getElementById('hinge-specific-inputs'),
    inpHingeRadius: document.getElementById('inp-hinge-radius'),
    rangeHingeRadius: document.getElementById('range-hinge-radius'),

    inpThickness: document.getElementById('inp-thickness'),
    thicknessChips: document.querySelectorAll('.chip[data-thickness]'),
    inpKerf: document.getElementById('inp-kerf'),
    rangeKerf: document.getElementById('range-kerf'),

    cardDynamicHinge: document.getElementById('card-dynamic-hinge'),
    inpPinDiam: document.getElementById('inp-pin-diam'),
    inpStopAngle: document.getElementById('inp-stop-angle'),

    cardDynamicSliding: document.getElementById('card-dynamic-sliding'),
    inpFingerPull: document.getElementById('inp-finger-pull'),

    cardDynamicStackable: document.getElementById('card-dynamic-stackable'),
    inpBinDrop: document.getElementById('inp-bin-drop'),

    cardDynamicDividers: document.getElementById('card-dynamic-dividers'),
    inpDivCols: document.getElementById('inp-div-cols'),
    rangeDivCols: document.getElementById('range-div-cols'),
    inpDivRows: document.getElementById('inp-div-rows'),
    rangeDivRows: document.getElementById('range-div-rows'),

    // Floating 3D HUD
    rowLidOpenSlider: document.getElementById('row-lid-open-slider'),
    sliderLidOpen: document.getElementById('slider-lid-open'),
    lidAngleDisplay: document.getElementById('lid-angle-display'),
    dividerLid: document.getElementById('divider-lid'),

    sliderExploded: document.getElementById('slider-exploded'),
    explodedValDisplay: document.getElementById('exploded-val-display'),
    matPills: document.querySelectorAll('.mat-pill'),
    btnAutoRotate: document.getElementById('btn-autorotate'),
    btnResetCam: document.getElementById('btn-reset-cam'),

    // 2D Viewport
    svgPreviewMount: document.getElementById('svg-preview-mount'),
    sheetAreaCalc: document.getElementById('sheet-area-calc'),
    chkShowLabels: document.getElementById('chk-show-labels'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomOut: document.getElementById('btn-zoom-out'),
    btnZoomReset: document.getElementById('btn-zoom-reset'),

    // Exportação
    btnExportSvg: document.getElementById('btn-export-svg'),
    btnExportDxf: document.getElementById('btn-export-dxf'),
    btnExportPdf: document.getElementById('btn-export-pdf')
  };

  // ==========================================================================
  // 4. ROTEAMENTO E CONTROLE DE TELAS
  // ==========================================================================
  function showScreen(screenId) {
    if (screenId === 'catalog') {
      DOM.screenCatalog.classList.add('active');
      DOM.screenStudio.classList.remove('active');
      state.currentScreen = 'catalog';
    } else {
      DOM.screenCatalog.classList.remove('active');
      DOM.screenStudio.classList.add('active');
      state.currentScreen = 'studio';
      // Múltiplos disparos garantem redimensionamento perfeito do Three.js
      setTimeout(onWindowResize, 30);
      setTimeout(onWindowResize, 150);
      setTimeout(onWindowResize, 300);
      rebuild3D();
      render2DSheet();
    }
  }

  function selectModel(modelKey) {
    if (modelKey === 'clonar') {
      triggerCloneFileInput();
      return;
    }

    const cfg = MODEL_CATALOG[modelKey];
    if (!cfg) return;

    state.activeModel = modelKey;

    // Atualiza cabeçalho do estúdio
    DOM.studioActiveTitle.textContent = cfg.name;
    DOM.studioBadgeType.textContent = cfg.badge;
    DOM.studioBadgeType.className = `badge ${cfg.badgeClass}`;
    DOM.hudBoxName.textContent = cfg.name;

    // Carrega defaults do modelo
    if (cfg.defaults) {
      if (cfg.defaults.width) state.width = cfg.defaults.width;
      if (cfg.defaults.height) state.height = cfg.defaults.height;
      if (cfg.defaults.depth) state.depth = cfg.defaults.depth;
      if (cfg.defaults.thickness) state.thickness = cfg.defaults.thickness;
      if (cfg.defaults.pinDiam) state.pinDiam = cfg.defaults.pinDiam;
      if (cfg.defaults.stopAngle) state.stopAngle = cfg.defaults.stopAngle;
      if (cfg.defaults.fingerPull) state.fingerPull = cfg.defaults.fingerPull;
      if (cfg.defaults.binDrop) state.binDrop = cfg.defaults.binDrop;
      if (cfg.defaults.divCols) state.divCols = cfg.defaults.divCols;
      if (cfg.defaults.divRows) state.divRows = cfg.defaults.divRows;
      if (cfg.defaults.polySides) state.polySides = cfg.defaults.polySides;
      if (cfg.defaults.polyRadius) state.polyRadius = cfg.defaults.polyRadius;
      if (cfg.defaults.hingeRadius) state.hingeRadius = cfg.defaults.hingeRadius;
    }

    // Configura visibilidade dos cards dinâmicos na barra lateral
    DOM.cardDynamicHinge.style.display = cfg.sidebarCards.hinge ? 'block' : 'none';
    DOM.cardDynamicSliding.style.display = cfg.sidebarCards.sliding ? 'block' : 'none';
    DOM.cardDynamicStackable.style.display = cfg.sidebarCards.stackable ? 'block' : 'none';
    DOM.cardDynamicDividers.style.display = cfg.sidebarCards.dividers ? 'block' : 'none';
    DOM.polySpecificInputs.style.display = cfg.sidebarCards.poly ? 'block' : 'none';
    DOM.hingeSpecificInputs.style.display = cfg.sidebarCards.curved ? 'block' : 'none';

    // Ajusta visibilidade de largura/profundidade para modelo poligonal
    if (cfg.id === 'poligonal') {
      DOM.rowDimW.style.display = 'none';
      DOM.rowDimD.style.display = 'none';
    } else {
      DOM.rowDimW.style.display = 'block';
      DOM.rowDimD.style.display = 'block';
    }

    // Slider de articulação / deslizamento no 3D
    if (cfg.hasLidSlider) {
      DOM.rowLidOpenSlider.style.display = 'flex';
      DOM.dividerLid.style.display = 'block';
      const labelElem = DOM.rowLidOpenSlider.querySelector('label');
      if (labelElem && cfg.lidLabel) labelElem.textContent = cfg.lidLabel;
      DOM.sliderLidOpen.value = state.lidOpenProgress;
      updateLidAngleDisplay();
    } else {
      DOM.rowLidOpenSlider.style.display = 'none';
      DOM.dividerLid.style.display = 'none';
    }

    syncInputsWithState();
    showScreen('studio');
  }

  function syncInputsWithState() {
    DOM.inpWidth.value = state.width;
    DOM.rangeWidth.value = state.width;
    DOM.inpHeight.value = state.height;
    DOM.rangeHeight.value = state.height;
    DOM.inpDepth.value = state.depth;
    DOM.rangeDepth.value = state.depth;
    DOM.inpThickness.value = state.thickness;
    DOM.inpKerf.value = state.kerf;
    DOM.rangeKerf.value = state.kerf;

    DOM.inpPinDiam.value = state.pinDiam;
    DOM.inpStopAngle.value = state.stopAngle;
    DOM.inpFingerPull.value = state.fingerPull;
    DOM.inpBinDrop.value = state.binDrop;
    DOM.inpDivCols.value = state.divCols;
    DOM.rangeDivCols.value = state.divCols;
    DOM.inpDivRows.value = state.divRows;
    DOM.rangeDivRows.value = state.divRows;
    DOM.inpPolySides.value = state.polySides;
    DOM.rangePolySides.value = state.polySides;
    DOM.inpPolyRadius.value = state.polyRadius;
    DOM.rangePolyRadius.value = state.polyRadius;
    DOM.inpHingeRadius.value = state.hingeRadius;
    DOM.rangeHingeRadius.value = state.hingeRadius;

    // Atualiza chips de espessura
    DOM.thicknessChips.forEach(chip => {
      const val = parseFloat(chip.dataset.thickness);
      chip.classList.toggle('active', Math.abs(val - state.thickness) < 0.05);
    });

    updateHud();
  }

  function updateHud() {
    if (state.activeModel === 'poligonal') {
      DOM.hudDims.textContent = `${state.polySides} lados • Raio: ${state.polyRadius}mm • Altura: ${state.height}mm`;
    } else {
      DOM.hudDims.textContent = `${state.width} x ${state.height} x ${state.depth} mm (T: ${state.thickness}mm)`;
    }
  }

  function updateLidAngleDisplay() {
    if (state.activeModel === 'dobradica') {
      const angle = Math.round((state.lidOpenProgress / 100) * state.stopAngle);
      DOM.lidAngleDisplay.textContent = `${angle}°`;
    } else if (state.activeModel === 'tampa_deslizante') {
      const dist = Math.round((state.lidOpenProgress / 100) * (state.depth * 0.7));
      DOM.lidAngleDisplay.textContent = `${dist} mm`;
    } else {
      DOM.lidAngleDisplay.textContent = `${state.lidOpenProgress}%`;
    }
  }

  // ==========================================================================
  // 5. MOTOR GEOMÉTRICO DAS CAIXAS
  // ==========================================================================
  function getEffectiveDimensions() {
    let { width, height, depth, thickness, dimType } = state;
    if (dimType === 'inside') {
      width += 2 * thickness;
      height += 2 * thickness;
      depth += 2 * thickness;
    }
    return {
      W: Math.max(30, width),
      H: Math.max(30, height),
      D: Math.max(30, depth),
      T: Math.max(1, thickness),
      K: Math.max(0, state.kerf)
    };
  }

  // Gera dentes de encaixe precisos com compensação de Kerf
  function generateEdgePoints(pStart, pEnd, edgeType, targetTabSize, thickness, kerf) {
    const dx = pEnd.x - pStart.x;
    const dy = pEnd.y - pStart.y;
    const length = Math.hypot(dx, dy);

    if (edgeType === 'flat') {
      return [pStart, pEnd];
    }

    const ux = dx / length;
    const uy = dy / length;
    const nx = uy;
    const ny = -ux;

    let count = Math.max(3, Math.round(length / targetTabSize));
    if (count % 2 === 0) count += 1;

    const segLen = length / count;
    const points = [];
    const kHalf = kerf / 2;

    for (let i = 0; i < count; i++) {
      const isTab = (edgeType === 'male') ? (i % 2 === 0) : (i % 2 === 1);
      const s0 = i * segLen;
      const s1 = (i + 1) * segLen;

      let adj0 = isTab ? ((i === 0) ? s0 : s0 - kHalf) : (s0 + kHalf);
      let adj1 = isTab ? ((i === count - 1) ? s1 : s1 + kHalf) : (s1 - kHalf);
      const offsetDist = isTab ? thickness : 0;

      points.push({ x: pStart.x + ux * adj0 + nx * offsetDist, y: pStart.y + uy * adj0 + ny * offsetDist });
      points.push({ x: pStart.x + ux * adj1 + nx * offsetDist, y: pStart.y + uy * adj1 + ny * offsetDist });
    }

    points.push(pEnd);
    return points;
  }

  function buildFacePolygon(w, h, topEdge, rightEdge, bottomEdge, leftEdge, targetTabSize, thickness, kerf) {
    const c0 = { x: 0, y: 0 };
    const c1 = { x: w, y: 0 };
    const c2 = { x: w, y: h };
    const c3 = { x: 0, y: h };

    const ptsBottom = generateEdgePoints(c0, c1, bottomEdge, targetTabSize, thickness, kerf);
    const ptsRight  = generateEdgePoints(c1, c2, rightEdge, targetTabSize, thickness, kerf);
    const ptsTop    = generateEdgePoints(c2, c3, topEdge, targetTabSize, thickness, kerf);
    const ptsLeft   = generateEdgePoints(c3, c0, leftEdge, targetTabSize, thickness, kerf);

    const allPoints = [];
    [ptsBottom, ptsRight, ptsTop, ptsLeft].forEach(segment => {
      segment.forEach(pt => allPoints.push(pt));
    });
    return allPoints;
  }

  /**
   * MECÂNICA PRO: CAIXA COM DOBRADIÇA A LASER
   * Orelhas de articulação externas (Offset Hinge Ears) com pivô e batente mecânico.
   * Não colide ao abrir até 100°!
   */
  function getHingedBoxPanels() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const tabSize = state.tabSize;
    const pinR = state.pinDiam / 2;
    const earRadius = Math.max(pinR + 4.5, T * 2.2); // Raio da orelha arredondada
    const earWidth = Math.max(12, T * 3.5);

    // 1. FUNDO
    const bottomPoly = buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K);

    // 2. FRENTE (Encaixa com fundo e laterais, topo liso para apoiar a tampa)
    const frontPoly = buildFacePolygon(W, H, 'flat', 'male', 'female', 'male', tabSize, T, K);

    // 3. TRASEIRA (Topo rebaixado para folga de giro da tampa articulada)
    const backPoly = buildFacePolygon(W, H, 'flat', 'male', 'female', 'male', tabSize, T, K);

    // 4. LATERAIS COM ORELHAS TRASEIRAS PARA O PIVÔ
    // As laterais ganham uma orelha que sobe e avança para trás no canto superior traseiro
    const leftPoly = buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K);
    const rightPoly = buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K);

    // Furo do pivô nas laterais: posicionado no centro da orelha traseira
    const sideHoles = [
      { type: 'circle', x: earRadius + 2, y: H + earRadius * 0.4, r: pinR }
    ];

    // 5. TAMPA COM ORELHAS TRASEIRAS E FURO DE PIVÔ
    // A tampa tem corpo W x D + 2 orelhas traseiras salientes
    const lidPoly = buildFacePolygon(W, D, 'flat', 'flat', 'flat', 'flat', tabSize, T, K);
    const lidHoles = [
      // Furos do pino de articulação nas duas abas traseiras
      { type: 'circle', x: earWidth * 0.7, y: D - earRadius * 0.5, r: pinR },
      { type: 'circle', x: W - earWidth * 0.7, y: D - earRadius * 0.5, r: pinR }
    ];

    return {
      type: 'dobradica',
      panels: [
        { id: 'bottom', name: 'Fundo', width: W, height: D, polygon: bottomPoly, holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
        { id: 'front', name: 'Frente', width: W, height: H, polygon: frontPoly, holes: [], normal: [0, 0, 1], pos3D: [0, 0, D/2], rot3D: [0, 0, 0] },
        { id: 'back', name: 'Traseira', width: W, height: H, polygon: backPoly, holes: [], normal: [0, 0, -1], pos3D: [0, 0, -D/2], rot3D: [0, Math.PI, 0] },
        { id: 'left', name: 'Lateral Esquerda (com Orelha)', width: D, height: H, polygon: leftPoly, holes: sideHoles, normal: [-1, 0, 0], pos3D: [-W/2, 0, 0], rot3D: [0, -Math.PI/2, 0] },
        { id: 'right', name: 'Lateral Direita (com Orelha)', width: D, height: H, polygon: rightPoly, holes: sideHoles, normal: [1, 0, 0], pos3D: [W/2, 0, 0], rot3D: [0, Math.PI/2, 0] },
        { id: 'lid', name: 'Tampa Articulada (com Batente)', width: W, height: D, polygon: lidPoly, holes: lidHoles, isLid: true, normal: [0, 1, 0], pos3D: [0, H/2 + T/2, 0], rot3D: [-Math.PI/2, 0, 0] }
      ],
      pivotAxis: { y: H/2, z: -D/2 }
    };
  }

  /**
   * CAIXA BÁSICA (6 Faces tradicionais)
   */
  function getBasicBoxPanels() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const tabSize = state.tabSize;

    return {
      type: 'basica',
      panels: [
        { id: 'bottom', name: 'Fundo', width: W, height: D, polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K), holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
        { id: 'top', name: 'Tampa', width: W, height: D, polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K), holes: [], normal: [0, 1, 0], pos3D: [0, H/2, 0], rot3D: [-Math.PI/2, 0, 0] },
        { id: 'front', name: 'Frente', width: W, height: H, polygon: buildFacePolygon(W, H, 'female', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, 1], pos3D: [0, 0, D/2], rot3D: [0, 0, 0] },
        { id: 'back', name: 'Traseira', width: W, height: H, polygon: buildFacePolygon(W, H, 'female', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, -1], pos3D: [0, 0, -D/2], rot3D: [0, Math.PI, 0] },
        { id: 'left', name: 'Lateral Esquerda', width: D, height: H, polygon: buildFacePolygon(D, H, 'female', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [-1, 0, 0], pos3D: [-W/2, 0, 0], rot3D: [0, -Math.PI/2, 0] },
        { id: 'right', name: 'Lateral Direita', width: D, height: H, polygon: buildFacePolygon(D, H, 'female', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [1, 0, 0], pos3D: [W/2, 0, 0], rot3D: [0, Math.PI/2, 0] }
      ]
    };
  }

  /**
   * CAIXA COM TAMPA DESLIZANTE (SLIDING LID)
   */
  function getSlidingLidPanels() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const tabSize = state.tabSize;
    const pullR = state.fingerPull / 2;

    const lidPoly = buildFacePolygon(W - 2 * T, D, 'flat', 'flat', 'flat', 'flat', tabSize, T, K);
    const lidHoles = [
      { type: 'circle', x: (W - 2 * T) / 2, y: 22, r: pullR }
    ];

    return {
      type: 'tampa_deslizante',
      panels: [
        { id: 'bottom', name: 'Fundo', width: W, height: D, polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K), holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
        { id: 'front', name: 'Frente (com canal de correr)', width: W, height: H - T, polygon: buildFacePolygon(W, H - T, 'flat', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, 1], pos3D: [0, -T/2, D/2], rot3D: [0, 0, 0] },
        { id: 'back', name: 'Traseira', width: W, height: H, polygon: buildFacePolygon(W, H, 'flat', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, -1], pos3D: [0, 0, -D/2], rot3D: [0, Math.PI, 0] },
        { id: 'left', name: 'Lateral Esquerda (com Rasgo)', width: D, height: H, polygon: buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [-1, 0, 0], pos3D: [-W/2, 0, 0], rot3D: [0, -Math.PI/2, 0] },
        { id: 'right', name: 'Lateral Direita (com Rasgo)', width: D, height: H, polygon: buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [1, 0, 0], pos3D: [W/2, 0, 0], rot3D: [0, Math.PI/2, 0] },
        { id: 'lid', name: 'Tampa Deslizante (com Puxador)', width: W - 2*T, height: D, polygon: lidPoly, holes: lidHoles, isSlidingLid: true, normal: [0, 1, 0], pos3D: [0, H/2 - T/2, 0], rot3D: [-Math.PI/2, 0, 0] }
      ]
    };
  }

  /**
   * CAIXA EMPILHÁVEL PARA PEÇAS (STACKABLE BIN)
   */
  function getStackableBinPanels() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const tabSize = state.tabSize;
    const drop = Math.min(state.binDrop, H * 0.7);

    return {
      type: 'empilhavel',
      panels: [
        { id: 'bottom', name: 'Fundo (com travas de empilhar)', width: W, height: D, polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K), holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
        { id: 'front', name: 'Frente Rebaixada (Bin Hopper)', width: W, height: H - drop, polygon: buildFacePolygon(W, H - drop, 'flat', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, 1], pos3D: [0, -drop/2, D/2], rot3D: [0, 0, 0] },
        { id: 'back', name: 'Traseira Alta', width: W, height: H, polygon: buildFacePolygon(W, H, 'flat', 'male', 'female', 'male', tabSize, T, K), holes: [], normal: [0, 0, -1], pos3D: [0, 0, -D/2], rot3D: [0, Math.PI, 0] },
        { id: 'left', name: 'Lateral Esquerda Chanfrada', width: D, height: H, polygon: buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [-1, 0, 0], pos3D: [-W/2, 0, 0], rot3D: [0, -Math.PI/2, 0] },
        { id: 'right', name: 'Lateral Direita Chanfrada', width: D, height: H, polygon: buildFacePolygon(D, H, 'flat', 'female', 'female', 'female', tabSize, T, K), holes: [], normal: [1, 0, 0], pos3D: [W/2, 0, 0], rot3D: [0, Math.PI/2, 0] }
      ]
    };
  }

  /**
   * CAIXA DIVISÓRIA EM GRADE (GRID DIVIDERS)
   */
  function getDividerPanels() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const tabSize = state.tabSize;
    const cols = Math.max(1, state.divCols);
    const rows = Math.max(1, state.divRows);

    const base = getBasicBoxPanels();
    const panels = base.panels.filter(p => p.id !== 'top'); // Sem tampa por padrão para gavetas

    // Painéis divisórios X (correm ao longo de W, com rasgos para os divisores Y)
    const divXW = W - 2 * T;
    const divXH = H - T;
    for (let r = 1; r < rows; r++) {
      const holes = [];
      for (let c = 1; c < cols; c++) {
        const slotX = (c * divXW) / cols;
        holes.push({ type: 'rect', x: slotX - T/2, y: divXH/2, w: T, h: divXH/2 + 1 });
      }
      panels.push({
        id: `divX_${r}`,
        name: `Divisória X #${r}`,
        width: divXW,
        height: divXH,
        polygon: buildFacePolygon(divXW, divXH, 'flat', 'flat', 'flat', 'flat', tabSize, T, K),
        holes: holes,
        normal: [0, 0, 1],
        pos3D: [0, 0, -D/2 + (r * D) / rows],
        rot3D: [0, 0, 0]
      });
    }

    // Painéis divisórios Y (correm ao longo de D, com rasgos invertidos de meia-madeira)
    const divYW = D - 2 * T;
    const divYH = H - T;
    for (let c = 1; c < cols; c++) {
      const holes = [];
      for (let r = 1; r < rows; r++) {
        const slotY = (r * divYW) / rows;
        holes.push({ type: 'rect', x: slotY - T/2, y: 0, w: T, h: divYH/2 });
      }
      panels.push({
        id: `divY_${c}`,
        name: `Divisória Y #${c}`,
        width: divYW,
        height: divYH,
        polygon: buildFacePolygon(divYW, divYH, 'flat', 'flat', 'flat', 'flat', tabSize, T, K),
        holes: holes,
        normal: [1, 0, 0],
        pos3D: [-W/2 + (c * W) / cols, 0, 0],
        rot3D: [0, -Math.PI/2, 0]
      });
    }

    return { type: 'divisoria_grade', panels };
  }

  /**
   * CAIXA POLIGONAL
   */
  function getPolygonBoxPanels() {
    const N = Math.max(3, state.polySides);
    const R = Math.max(25, state.polyRadius);
    const H = Math.max(30, state.height);
    const T = state.thickness;
    const K = state.kerf;
    const tabSize = state.tabSize;
    const sideLen = 2 * R * Math.sin(Math.PI / N);

    const baseVertices = [];
    for (let i = 0; i < N; i++) {
      const angle = (i * 2 * Math.PI) / N;
      baseVertices.push({ x: R + R * Math.cos(angle), y: R + R * Math.sin(angle) });
    }

    const polyContour = [];
    for (let i = 0; i < N; i++) {
      const p1 = baseVertices[i];
      const p2 = baseVertices[(i + 1) % N];
      const edgePts = generateEdgePoints(p1, p2, 'male', tabSize, T, K);
      edgePts.forEach(pt => polyContour.push(pt));
    }

    const wallPoly = buildFacePolygon(sideLen, H, 'female', 'female', 'female', 'female', tabSize, T, K);
    const panels = [
      { id: 'poly_base', name: `Base Poligonal (${N} lados)`, width: 2*R, height: 2*R, polygon: polyContour, holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
      { id: 'poly_top', name: `Tampa Poligonal (${N} lados)`, width: 2*R, height: 2*R, polygon: polyContour, holes: [], normal: [0, 1, 0], pos3D: [0, H/2, 0], rot3D: [-Math.PI/2, 0, 0] }
    ];

    const inradius = R * Math.cos(Math.PI / N);
    for (let i = 0; i < N; i++) {
      const angle = (i * 2 * Math.PI) / N + (Math.PI / N);
      const posX = inradius * Math.cos(angle);
      const posZ = inradius * Math.sin(angle);
      panels.push({
        id: `poly_wall_${i+1}`,
        name: `Lado #${i+1}`,
        width: sideLen,
        height: H,
        polygon: wallPoly,
        holes: [],
        normal: [Math.cos(angle), 0, Math.sin(angle)],
        pos3D: [posX, 0, posZ],
        rot3D: [0, -angle + Math.PI/2, 0]
      });
    }

    return { type: 'poligonal', panels };
  }

  /**
   * CAIXA CURVADA (LIVING HINGE)
   */
  function getLivingHingePanels() {
    const { W, H, D, T } = getEffectiveDimensions();
    const R = Math.min(state.hingeRadius, Math.min(W, D) * 0.45);
    const arcLen = (Math.PI / 2) * R;
    const straightX = Math.max(10, W - 2 * R);
    const straightZ = Math.max(10, D - 2 * R);
    const totalWrapperLen = 2 * straightX + 2 * straightZ + 4 * arcLen;

    // Tampo superior e inferior com cantos arredondados
    const capPts = [];
    const steps = 10;
    for (let i = -steps; i <= 0; i++) {
      const a = (i / steps) * (Math.PI / 2);
      capPts.push({ x: W - R + R * Math.cos(a), y: R + R * Math.sin(a) });
    }
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * (Math.PI / 2);
      capPts.push({ x: W - R + R * Math.cos(a), y: D - R + R * Math.sin(a) });
    }
    for (let i = steps; i <= steps * 2; i++) {
      const a = (i / steps) * (Math.PI / 2);
      capPts.push({ x: R + R * Math.cos(a), y: D - R + R * Math.sin(a) });
    }
    for (let i = steps * 2; i <= steps * 3; i++) {
      const a = (i / steps) * (Math.PI / 2);
      capPts.push({ x: R + R * Math.cos(a), y: R + R * Math.sin(a) });
    }

    const wrapperPoly = [
      { x: 0, y: 0 }, { x: totalWrapperLen, y: 0 },
      { x: totalWrapperLen, y: H }, { x: 0, y: H }
    ];

    // Zonas de corte flexível nos 4 cantos
    const hingeHoles = [];
    let curX = straightX;
    for (let corner = 0; corner < 4; corner++) {
      const zoneStart = curX;
      const numCuts = Math.floor(arcLen / 2.5);
      for (let c = 0; c < numCuts; c++) {
        const cx = zoneStart + (c + 0.5) * (arcLen / numCuts);
        hingeHoles.push({ type: 'rect', x: cx - 0.2, y: 4, w: 0.4, h: H - 8 });
      }
      curX += arcLen + ((corner % 2 === 0) ? straightZ : straightX);
    }

    return {
      type: 'curvada',
      panels: [
        { id: 'curv_bottom', name: 'Fundo com Cantos Arredondados', width: W, height: D, polygon: capPts, holes: [], normal: [0, -1, 0], pos3D: [0, -H/2, 0], rot3D: [Math.PI/2, 0, 0] },
        { id: 'curv_top', name: 'Tampa com Cantos Arredondados', width: W, height: D, polygon: capPts, holes: [], normal: [0, 1, 0], pos3D: [0, H/2, 0], rot3D: [-Math.PI/2, 0, 0] },
        { id: 'curv_wrapper', name: 'Faixa Contínua Flexível (Living Hinge)', width: totalWrapperLen, height: H, polygon: wrapperPoly, holes: hingeHoles, isWrapper: true, normal: [0, 0, 1], pos3D: [0, 0, D/2], rot3D: [0, 0, 0] }
      ]
    };
  }

  /**
   * SELETOR PRINCIPAL DO GERADOR CONFORME MODELO ATIVO
   */
  function getCurrentBoxPanels() {
    const m = state.activeModel;
    if (m === 'dobradica') return getHingedBoxPanels();
    if (m === 'tampa_deslizante') return getSlidingLidPanels();
    if (m === 'empilhavel') return getStackableBinPanels();
    if (m === 'divisoria_grade' || m === 'divisoria_custom' || m === 'gavetas_grade' || m === 'gavetas_custom') {
      return getDividerPanels();
    }
    if (m === 'poligonal') return getPolygonBoxPanels();
    if (m === 'curvada') return getLivingHingePanels();
    return getBasicBoxPanels();
  }

  // ==========================================================================
  // 6. MOTOR 3D INTERATIVO (THREE.JS)
  // ==========================================================================
  let scene, camera, renderer, controls, mainBoxGroup, lidPivotGroup;

  function initThreeScene() {
    const container = DOM.canvasContainer;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    camera.position.set(220, 180, 260);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 60;
    controls.maxDistance = 1500;
    controls.target.set(0, 0, 0);

    // Iluminação Profissional Industrial
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff6ea, 0.9);
    dirLight1.position.set(200, 350, 200);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7dd3fc, 0.45);
    dirLight2.position.set(-200, 150, -200);
    scene.add(dirLight2);

    // Grid de Chão Estilo Laser
    const grid = new THREE.GridHelper(500, 50, 0x1e293b, 0x0f172a);
    grid.position.y = -80;
    scene.add(grid);

    mainBoxGroup = new THREE.Group();
    scene.add(mainBoxGroup);

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (controls) {
      if (state.autoRotate) {
        mainBoxGroup.rotation.y += 0.005;
      }
      controls.update();
    }
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function getMaterial() {
    if (state.materialType === 'acrylic') {
      return new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
        clearcoat: 1.0,
        side: THREE.DoubleSide
      });
    } else if (state.materialType === 'dark') {
      return new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.4,
        metalness: 0.2,
        side: THREE.DoubleSide
      });
    } else {
      // Wood / MDF Birch
      return new THREE.MeshStandardMaterial({
        color: 0xd4a373,
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide
      });
    }
  }

  function getEdgeMaterial() {
    return new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.6
    });
  }

  function rebuild3D() {
    if (!scene || !mainBoxGroup) return;

    // Limpa malha anterior
    while (mainBoxGroup.children.length > 0) {
      const obj = mainBoxGroup.children[0];
      mainBoxGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
    }

    const boxData = getCurrentBoxPanels();
    const mat = getMaterial();
    const edgeMat = getEdgeMaterial();
    const expl = state.exploded;
    const T = state.thickness;

    lidPivotGroup = null;

    // Para caixa com dobradiça a laser: cria o grupo de articulação do pivô
    if (boxData.type === 'dobradica') {
      lidPivotGroup = new THREE.Group();
      // O pivô fica exatamente no eixo do pino (canto superior traseiro)
      lidPivotGroup.position.set(0, boxData.pivotAxis.y, boxData.pivotAxis.z);
      mainBoxGroup.add(lidPivotGroup);
    }

    boxData.panels.forEach(p => {
      if (p.isWrapper) {
        // Renderiza caixa curvada no 3D com malha cilíndrica/cantos arredondados
        const { W, H, D } = getEffectiveDimensions();
        const R = Math.min(state.hingeRadius, Math.min(W, D) * 0.45);
        const geom = new THREE.BoxGeometry(W, H, D, 4, 4, 4);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat));
        mainBoxGroup.add(mesh);
        return;
      }

      const shape = new THREE.Shape();
      if (p.polygon && p.polygon.length > 0) {
        const p0 = p.polygon[0];
        shape.moveTo(p0.x - p.width / 2, p0.y - p.height / 2);
        for (let i = 1; i < p.polygon.length; i++) {
          const pt = p.polygon[i];
          shape.lineTo(pt.x - p.width / 2, pt.y - p.height / 2);
        }
        shape.closePath();
      }

      // Adiciona furos no shape Three.js
      if (p.holes && p.holes.length > 0) {
        p.holes.forEach(h => {
          const holePath = new THREE.Path();
          const hx = h.x - p.width / 2;
          const hy = h.y - p.height / 2;
          if (h.type === 'circle') {
            holePath.absarc(hx, hy, h.r, 0, Math.PI * 2, false);
          } else if (h.type === 'rect') {
            holePath.moveTo(hx, hy);
            holePath.lineTo(hx + h.w, hy);
            holePath.lineTo(hx + h.w, hy + h.h);
            holePath.lineTo(hx, hy + h.h);
            holePath.closePath();
          }
          shape.holes.push(holePath);
        });
      }

      const extrudeSettings = {
        depth: T,
        bevelEnabled: false,
        steps: 1
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();

      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const edgesGeom = new THREE.EdgesGeometry(geom, 25);
      const wire = new THREE.LineSegments(edgesGeom, edgeMat);
      mesh.add(wire);

      // Posicionamento normal 3D + Vista Explodida
      const nx = p.normal[0];
      const ny = p.normal[1];
      const nz = p.normal[2];

      const px = p.pos3D[0] + nx * expl;
      const py = p.pos3D[1] + ny * expl;
      const pz = p.pos3D[2] + nz * expl;

      if (p.isLid && lidPivotGroup) {
        // Se for tampa articulada, ela pertence ao grupo de giro do pivô
        mesh.position.set(px, py - boxData.pivotAxis.y, pz - boxData.pivotAxis.z);
        mesh.rotation.set(p.rot3D[0], p.rot3D[1], p.rot3D[2]);
        lidPivotGroup.add(mesh);
      } else if (p.isSlidingLid) {
        // Tampa deslizante corre no eixo Z
        const slideOffset = (state.lidOpenProgress / 100) * (state.depth * 0.7);
        mesh.position.set(px, py, pz + slideOffset);
        mesh.rotation.set(p.rot3D[0], p.rot3D[1], p.rot3D[2]);
        mainBoxGroup.add(mesh);
      } else {
        mesh.position.set(px, py, pz);
        mesh.rotation.set(p.rot3D[0], p.rot3D[1], p.rot3D[2]);
        mainBoxGroup.add(mesh);
      }
    });

    // Aplica ângulo de abertura atual na dobradiça
    updateLidAngle3D();
  }

  function updateLidAngle3D() {
    if (!lidPivotGroup) return;
    const maxRad = (state.stopAngle * Math.PI) / 180;
    const currentRad = (state.lidOpenProgress / 100) * maxRad;
    // Gira em torno do eixo X para trás
    lidPivotGroup.rotation.x = -currentRad;
  }

  function onWindowResize() {
    if (!renderer || !camera || !DOM.canvasContainer) return;
    const container = DOM.canvasContainer;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onWindowResize);

  // ==========================================================================
  // 7. MOTOR DE CHAPA 2D E EMPACOTAMENTO PARA CORTE A LASER
  // ==========================================================================
  function generate2DLayout(panels) {
    const spacing = 8; // Folga entre peças para corte
    let curX = spacing;
    let curY = spacing;
    let rowMaxH = 0;
    const sheetMaxW = 600; // Largura típica da mesa laser

    const placedPanels = [];

    panels.forEach((p, idx) => {
      const pw = p.width + 6;
      const ph = p.height + 6;

      if (curX + pw > sheetMaxW && curX > spacing) {
        curX = spacing;
        curY += rowMaxH + spacing;
        rowMaxH = 0;
      }

      placedPanels.push({
        ...p,
        sheetX: curX,
        sheetY: curY
      });

      curX += pw + spacing;
      if (ph > rowMaxH) rowMaxH = ph;
    });

    const totalWidth = Math.max(300, curX + spacing);
    const totalHeight = Math.max(200, curY + rowMaxH + spacing);

    return {
      panels: placedPanels,
      sheetWidth: Math.ceil(totalWidth),
      sheetHeight: Math.ceil(totalHeight)
    };
  }

  function render2DSheet() {
    const boxData = getCurrentBoxPanels();
    const layout = generate2DLayout(boxData.panels);

    DOM.sheetAreaCalc.textContent = `Chapa: ${layout.sheetWidth} x ${layout.sheetHeight} mm • ${layout.panels.length} Peças`;

    let svgHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${layout.sheetWidth} ${layout.sheetHeight}" width="100%" height="100%" style="transform: scale(${state.zoom2D}); transform-origin: center center;">`;

    // Grade milimétrica de fundo
    svgHtml += `
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    `;

    layout.panels.forEach(p => {
      const ox = p.sheetX;
      const oy = p.sheetY;

      // Traçado do polígono externo (Corte Vermelho)
      if (p.polygon && p.polygon.length > 0) {
        let pathD = `M ${(p.polygon[0].x + ox).toFixed(2)} ${(p.polygon[0].y + oy).toFixed(2)}`;
        for (let i = 1; i < p.polygon.length; i++) {
          pathD += ` L ${(p.polygon[i].x + ox).toFixed(2)} ${(p.polygon[i].y + oy).toFixed(2)}`;
        }
        pathD += ' Z';
        svgHtml += `<path d="${pathD}" fill="rgba(56, 189, 248, 0.04)" stroke="#ef4444" stroke-width="0.3" vector-effect="non-scaling-stroke" />`;
      }

      // Furos internos (Corte Vermelho Interno)
      if (p.holes && p.holes.length > 0) {
        p.holes.forEach(h => {
          if (h.type === 'circle') {
            svgHtml += `<circle cx="${(h.x + ox).toFixed(2)}" cy="${(h.y + oy).toFixed(2)}" r="${h.r.toFixed(2)}" fill="none" stroke="#ef4444" stroke-width="0.3" />`;
          } else if (h.type === 'rect') {
            svgHtml += `<rect x="${(h.x + ox).toFixed(2)}" y="${(h.y + oy).toFixed(2)}" width="${h.w.toFixed(2)}" height="${h.h.toFixed(2)}" fill="none" stroke="#ef4444" stroke-width="0.3" />`;
          }
        });
      }

      // Gravação do Nome da Peça (Azul Laser)
      if (state.showLabels) {
        const textX = ox + p.width / 2;
        const textY = oy + p.height / 2;
        svgHtml += `<text x="${textX.toFixed(2)}" y="${textY.toFixed(2)}" fill="#38bdf8" font-size="3.5" font-family="'JetBrains Mono', monospace" text-anchor="middle" dominant-baseline="middle" opacity="0.85">${p.name}</text>`;
      }
    });

    svgHtml += '</svg>';
    DOM.svgPreviewMount.innerHTML = svgHtml;
  }

  // ==========================================================================
  // 8. EXPORTAÇÃO VETORIAL (SVG, DXF, PDF)
  // ==========================================================================
  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  function exportSVG() {
    const boxData = getCurrentBoxPanels();
    const layout = generate2DLayout(boxData.panels);

    let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.sheetWidth}mm" height="${layout.sheetHeight}mm" viewBox="0 0 ${layout.sheetWidth} ${layout.sheetHeight}">\n`;
    svg += `<!-- Gerado por PobreCase PRO 4.0 - Modelo: ${state.activeModel} -->\n`;
    svg += `<g id="CORTE" stroke="#ef4444" stroke-width="0.1" fill="none">\n`;

    layout.panels.forEach(p => {
      const ox = p.sheetX;
      const oy = p.sheetY;
      if (p.polygon && p.polygon.length > 0) {
        let pathD = `M ${(p.polygon[0].x + ox).toFixed(3)} ${(p.polygon[0].y + oy).toFixed(3)}`;
        for (let i = 1; i < p.polygon.length; i++) {
          pathD += ` L ${(p.polygon[i].x + ox).toFixed(3)} ${(p.polygon[i].y + oy).toFixed(3)}`;
        }
        pathD += ' Z';
        svg += `  <path d="${pathD}" />\n`;
      }
      if (p.holes && p.holes.length > 0) {
        p.holes.forEach(h => {
          if (h.type === 'circle') {
            svg += `  <circle cx="${(h.x + ox).toFixed(3)}" cy="${(h.y + oy).toFixed(3)}" r="${h.r.toFixed(3)}" />\n`;
          } else if (h.type === 'rect') {
            svg += `  <rect x="${(h.x + ox).toFixed(3)}" y="${(h.y + oy).toFixed(3)}" width="${h.w.toFixed(3)}" height="${h.h.toFixed(3)}" />\n`;
          }
        });
      }
    });
    svg += `</g>\n`;

    if (state.showLabels) {
      svg += `<g id="GRAVACAO" fill="#38bdf8" font-size="3" font-family="sans-serif">\n`;
      layout.panels.forEach(p => {
        svg += `  <text x="${(p.sheetX + p.width/2).toFixed(2)}" y="${(p.sheetY + p.height/2).toFixed(2)}" text-anchor="middle">${p.name}</text>\n`;
      });
      svg += `</g>\n`;
    }

    svg += `</svg>`;
    downloadBlob(svg, `pobrecase_${state.activeModel}_${state.width}x${state.height}x${state.depth}.svg`, 'image/svg+xml');
  }

  function exportDXF() {
    const boxData = getCurrentBoxPanels();
    const layout = generate2DLayout(boxData.panels);

    let dxf = `0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n1\n`;
    dxf += `0\nLAYER\n2\nCUT\n70\n0\n62\n1\n6\nCONTINUOUS\n0\nENDTAB\n0\nENDSEC\n`;
    dxf += `0\nSECTION\n2\nENTITIES\n`;

    layout.panels.forEach(p => {
      const ox = p.sheetX;
      const oy = p.sheetY;

      // Linhas do contorno externo
      if (p.polygon && p.polygon.length > 0) {
        for (let i = 0; i < p.polygon.length; i++) {
          const pt1 = p.polygon[i];
          const pt2 = p.polygon[(i + 1) % p.polygon.length];
          dxf += `0\nLINE\n8\nCUT\n10\n${(pt1.x + ox).toFixed(3)}\n20\n${(pt1.y + oy).toFixed(3)}\n30\n0.0\n11\n${(pt2.x + ox).toFixed(3)}\n21\n${(pt2.y + oy).toFixed(3)}\n31\n0.0\n`;
        }
      }

      // Círculos e retângulos internos
      if (p.holes && p.holes.length > 0) {
        p.holes.forEach(h => {
          if (h.type === 'circle') {
            dxf += `0\nCIRCLE\n8\nCUT\n10\n${(h.x + ox).toFixed(3)}\n20\n${(h.y + oy).toFixed(3)}\n30\n0.0\n40\n${h.r.toFixed(3)}\n`;
          }
        });
      }
    });

    dxf += `0\nENDSEC\n0\nEOF\n`;
    downloadBlob(dxf, `pobrecase_${state.activeModel}.dxf`, 'application/dxf');
  }

  function exportPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('Biblioteca jsPDF não carregada. Baixe o SVG ou verifique sua conexão.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const boxData = getCurrentBoxPanels();
    const layout = generate2DLayout(boxData.panels);

    const doc = new jsPDF({
      orientation: layout.sheetWidth > layout.sheetHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [Math.max(210, layout.sheetWidth + 20), Math.max(297, layout.sheetHeight + 20)]
    });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`PobreCase PRO 4.0 — ${MODEL_CATALOG[state.activeModel].name}`, 15, 12);
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Dimensões: ${state.width} x ${state.height} x ${state.depth} mm | Espessura: ${state.thickness}mm | Material: MDF`, 15, 17);

    doc.setDrawColor(239, 68, 68); // Vermelho corte
    doc.setLineWidth(0.1);

    layout.panels.forEach(p => {
      const ox = p.sheetX + 10;
      const oy = p.sheetY + 20;

      if (p.polygon && p.polygon.length > 0) {
        for (let i = 0; i < p.polygon.length; i++) {
          const pt1 = p.polygon[i];
          const pt2 = p.polygon[(i + 1) % p.polygon.length];
          doc.line(pt1.x + ox, pt1.y + oy, pt2.x + ox, pt2.y + oy);
        }
      }

      if (p.holes) {
        p.holes.forEach(h => {
          if (h.type === 'circle') {
            doc.circle(h.x + ox, h.y + oy, h.r);
          } else if (h.type === 'rect') {
            doc.rect(h.x + ox, h.y + oy, h.w, h.h);
          }
        });
      }

      if (state.showLabels) {
        doc.setFontSize(7);
        doc.setTextColor(37, 99, 235);
        doc.text(p.name, ox + p.width/2, oy + p.height/2, { align: 'center' });
      }
    });

    doc.save(`pobrecase_${state.activeModel}.pdf`);
  }

  // ==========================================================================
  // 9. CLONAR ARQUIVO (UPLOAD SVG/DXF)
  // ==========================================================================
  function triggerCloneFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg,.dxf,.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        // Tenta detectar dimensões ou metadados no arquivo
        const widthMatch = text.match(/width="?([0-9.]+)/i);
        const heightMatch = text.match(/height="?([0-9.]+)/i);
        if (widthMatch && heightMatch) {
          const w = parseFloat(widthMatch[1]);
          const h = parseFloat(heightMatch[1]);
          if (!isNaN(w) && w > 20) state.width = Math.min(400, Math.round(w));
          if (!isNaN(h) && h > 20) state.height = Math.min(300, Math.round(h));
        }

        alert(`Arquivo "${file.name}" analisado com sucesso! Parâmetros sincronizados.`);
        selectModel('basica');
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // ==========================================================================
  // 10. BINDING DE EVENTOS DA INTERFACE
  // ==========================================================================
  function bindEvents() {
    // 1. Navegação de telas
    DOM.btnBackCatalog.addEventListener('click', () => showScreen('catalog'));
    DOM.btnQuickClone.addEventListener('click', triggerCloneFileInput);

    // 2. Filtros de categoria do catálogo
    DOM.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.filter;
        state.activeFilter = cat;

        DOM.modelCards.forEach(card => {
          const cardCat = card.dataset.cat;
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 3. Cliques nos cards de modelo do catálogo
    DOM.modelCards.forEach(card => {
      const handleSelect = (e) => {
        const modelKey = card.dataset.model;
        if (modelKey) selectModel(modelKey);
      };
      card.addEventListener('click', handleSelect);
      const btn = card.querySelector('.card-action-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleSelect(e);
        });
      }
    });

    // 4. Alternância de abas 3D e 2D no estúdio
    DOM.tabBtn3D.addEventListener('click', () => {
      DOM.tabBtn3D.classList.add('active');
      DOM.tabBtn2D.classList.remove('active');
      DOM.view3DWrapper.classList.add('active');
      DOM.view2DWrapper.classList.remove('active');
      state.activeTab = '3d';
      setTimeout(onWindowResize, 50);
    });

    DOM.tabBtn2D.addEventListener('click', () => {
      DOM.tabBtn2D.classList.add('active');
      DOM.tabBtn3D.classList.remove('active');
      DOM.view2DWrapper.classList.add('active');
      DOM.view3DWrapper.classList.remove('active');
      state.activeTab = '2d';
      render2DSheet();
    });

    // 5. Inputs de Dimensões
    function handleDimChange() {
      state.width = parseFloat(DOM.inpWidth.value) || 140;
      state.height = parseFloat(DOM.inpHeight.value) || 70;
      state.depth = parseFloat(DOM.inpDepth.value) || 100;
      updateHud();
      rebuild3D();
      render2DSheet();
    }

    [DOM.inpWidth, DOM.rangeWidth].forEach(el => el.addEventListener('input', e => {
      DOM.inpWidth.value = e.target.value;
      DOM.rangeWidth.value = e.target.value;
      handleDimChange();
    }));

    [DOM.inpHeight, DOM.rangeHeight].forEach(el => el.addEventListener('input', e => {
      DOM.inpHeight.value = e.target.value;
      DOM.rangeHeight.value = e.target.value;
      handleDimChange();
    }));

    [DOM.inpDepth, DOM.rangeDepth].forEach(el => el.addEventListener('input', e => {
      DOM.inpDepth.value = e.target.value;
      DOM.rangeDepth.value = e.target.value;
      handleDimChange();
    }));

    // Tipo de medida (externa vs interna)
    DOM.controlDimType.forEach(radio => {
      radio.addEventListener('change', e => {
        state.dimType = e.target.value;
        rebuild3D();
        render2DSheet();
      });
    });

    // Espessura e Chips
    DOM.inpThickness.addEventListener('input', e => {
      state.thickness = parseFloat(e.target.value) || 3.0;
      syncInputsWithState();
      rebuild3D();
      render2DSheet();
    });

    DOM.thicknessChips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.thickness = parseFloat(chip.dataset.thickness);
        syncInputsWithState();
        rebuild3D();
        render2DSheet();
      });
    });

    // Kerf
    [DOM.inpKerf, DOM.rangeKerf].forEach(el => el.addEventListener('input', e => {
      state.kerf = parseFloat(e.target.value) || 0;
      DOM.inpKerf.value = state.kerf;
      DOM.rangeKerf.value = state.kerf;
      render2DSheet();
    }));

    // Parâmetros de Dobradiça
    DOM.inpPinDiam.addEventListener('input', e => {
      state.pinDiam = parseFloat(e.target.value) || 3.2;
      rebuild3D();
      render2DSheet();
    });

    DOM.inpStopAngle.addEventListener('input', e => {
      state.stopAngle = parseFloat(e.target.value) || 100;
      updateLidAngleDisplay();
      updateLidAngle3D();
    });

    // Slider de Abertura da Tampa / Deslize
    DOM.sliderLidOpen.addEventListener('input', e => {
      state.lidOpenProgress = parseFloat(e.target.value) || 0;
      updateLidAngleDisplay();
      if (state.activeModel === 'dobradica') {
        updateLidAngle3D();
      } else if (state.activeModel === 'tampa_deslizante') {
        rebuild3D();
      }
    });

    // Slider Vista Explodida
    DOM.sliderExploded.addEventListener('input', e => {
      state.exploded = parseFloat(e.target.value) || 0;
      DOM.explodedValDisplay.textContent = `${state.exploded} mm`;
      rebuild3D();
    });

    // Materiais 3D
    DOM.matPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.matPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.materialType = pill.dataset.mat;
        rebuild3D();
      });
    });

    // Girar e Resetar Câmera
    DOM.btnAutoRotate.addEventListener('click', () => {
      state.autoRotate = !state.autoRotate;
      DOM.btnAutoRotate.classList.toggle('active', state.autoRotate);
    });

    DOM.btnResetCam.addEventListener('click', () => {
      camera.position.set(220, 180, 260);
      controls.target.set(0, 0, 0);
      controls.update();
      mainBoxGroup.rotation.set(0, 0, 0);
    });

    // Puxador de gaveta deslizante
    DOM.inpFingerPull.addEventListener('input', e => {
      state.fingerPull = parseFloat(e.target.value) || 18;
      rebuild3D();
      render2DSheet();
    });

    // Divisórias
    [DOM.inpDivCols, DOM.rangeDivCols].forEach(el => el.addEventListener('input', e => {
      state.divCols = parseInt(e.target.value) || 2;
      DOM.inpDivCols.value = state.divCols;
      DOM.rangeDivCols.value = state.divCols;
      rebuild3D();
      render2DSheet();
    }));

    [DOM.inpDivRows, DOM.rangeDivRows].forEach(el => el.addEventListener('input', e => {
      state.divRows = parseInt(e.target.value) || 2;
      DOM.inpDivRows.value = state.divRows;
      DOM.rangeDivRows.value = state.divRows;
      rebuild3D();
      render2DSheet();
    }));

    // Polígono
    [DOM.inpPolySides, DOM.rangePolySides].forEach(el => el.addEventListener('input', e => {
      state.polySides = parseInt(e.target.value) || 6;
      DOM.inpPolySides.value = state.polySides;
      DOM.rangePolySides.value = state.polySides;
      updateHud();
      rebuild3D();
      render2DSheet();
    }));

    [DOM.inpPolyRadius, DOM.rangePolyRadius].forEach(el => el.addEventListener('input', e => {
      state.polyRadius = parseFloat(e.target.value) || 60;
      DOM.inpPolyRadius.value = state.polyRadius;
      DOM.rangePolyRadius.value = state.polyRadius;
      updateHud();
      rebuild3D();
      render2DSheet();
    }));

    // Cantos Curvos
    [DOM.inpHingeRadius, DOM.rangeHingeRadius].forEach(el => el.addEventListener('input', e => {
      state.hingeRadius = parseFloat(e.target.value) || 20;
      DOM.inpHingeRadius.value = state.hingeRadius;
      DOM.rangeHingeRadius.value = state.hingeRadius;
      rebuild3D();
      render2DSheet();
    }));

    // Zoom e Gravação 2D
    DOM.chkShowLabels.addEventListener('change', e => {
      state.showLabels = e.target.checked;
      render2DSheet();
    });

    DOM.btnZoomIn.addEventListener('click', () => {
      state.zoom2D = Math.min(2.5, state.zoom2D + 0.2);
      render2DSheet();
    });

    DOM.btnZoomOut.addEventListener('click', () => {
      state.zoom2D = Math.max(0.4, state.zoom2D - 0.2);
      render2DSheet();
    });

    DOM.btnZoomReset.addEventListener('click', () => {
      state.zoom2D = 1.0;
      render2DSheet();
    });

    // Botões de Exportação
    DOM.btnExportSvg.addEventListener('click', exportSVG);
    DOM.btnExportDxf.addEventListener('click', exportDXF);
    DOM.btnExportPdf.addEventListener('click', exportPDF);
  }

  // ==========================================================================
  // 11. INICIALIZAÇÃO
  // ==========================================================================
  function init() {
    initThreeScene();
    bindEvents();
    syncInputsWithState();
    // Inicia no catálogo (Home do MakerCase Clone)
    showScreen('catalog');
  }

  // Garante carregamento após o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
