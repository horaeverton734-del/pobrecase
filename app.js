/**
 * ==========================================================================
 * POBRECASE PRO 3.5 — MOTOR GEOMÉTRICO COMPLETO COM DOBRADIÇAS
 * Tampa com Pinos • Living Hinge • T-Slots • Polígonos • Rotação 3D
 * Desenvolvido por cook45 & will
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- ESTADO GLOBAL DA APLICAÇÃO ---
  const state = {
    // Modelo da Caixa: 'rect', 'poly', 'hinge'
    boxModel: 'rect',

    // Dimensões Retangulares (mm)
    width: 140,
    height: 70,
    depth: 100,
    dimType: 'outside',

    // Tipo de Tampa / Dobradiça
    hasLid: true,         // true: Com Tampa, false: Sem Tampa (Caixa Aberta)
    lidType: 'pin_hinge', // 'pin_hinge', 'living_hinge', 'removable'
    lidAngle: 0,          // Ângulo de abertura da tampa (0° a 105°)
    hingeLidHeight: 18,   // Altura da tampa (H tampa em mm)
    hingeAxleType: 'wood_cam', // 'wood_cam' (Bucha 100% Madeira MakerCase) ou 'screw_m3' (Parafuso M3)
    hingeClearance: 0.35, // Folga radial de corte para rotação suave da bucha (mm)

    // Dimensões Poligonal
    polySides: 6,
    polyRadius: 60,
    polyHeight: 75,

    // Dimensões Cantos Curvos (Hinge)
    hingeW: 140,
    hingeH: 65,
    hingeD: 90,
    hingeRadius: 20,

    // Material e Corte
    thickness: 3.0,
    jointType: 'finger', // 'finger', 'tslot', 'flat'
    tabSize: 15,
    kerf: 0.15,

    // Configuração T-Slot
    boltSize: 'M3',
    boltLength: 12,

    // Divisórias Internas
    divX: 0,
    divY: 0,

    // Furos Customizados
    cutouts: [],

    // Faces Ativas (Retangular)
    faces: {
      top: true,
      bottom: true,
      front: true,
      back: true,
      left: true,
      right: true
    },

    // Visualização 3D
    exploded: 0,
    materialType: 'wood',
    autoRotate: false,

    // Layout 2D
    showLabels: true,
    zoom2D: 1.0,
    pan2DX: 0,
    pan2DY: 0
  };

  const BOLT_SPECS = {
    M3: { holeDiam: 3.2, nutWidth: 5.5, nutThick: 2.4, tabWidth: 14.0 },
    M4: { holeDiam: 4.2, nutWidth: 7.0, nutThick: 3.2, tabWidth: 18.0 }
  };

  const POLY_NAMES = {
    3: 'Triângulo', 4: 'Quadrado', 5: 'Pentágono', 6: 'Hexágono',
    7: 'Heptágono', 8: 'Octógono', 9: 'Eneágono', 10: 'Decágono'
  };

  // --- ELEMENTOS DO DOM ---
  const DOM = {
    boxTypeRadios: document.querySelectorAll('input[name="boxType"]'),
    cardParamsRect: document.getElementById('card-params-rect'),
    cardParamsPoly: document.getElementById('card-params-poly'),
    cardParamsHinge: document.getElementById('card-params-hinge'),
    cardDividers: document.getElementById('card-dividers'),
    cardCutouts: document.getElementById('card-cutouts'),
    cardLidHinge: document.getElementById('card-lid-hinge'),
    groupJointTypes: document.getElementById('group-joint-types'),
    polyNameBadge: document.getElementById('poly-name-badge'),
    lidHelperText: document.getElementById('lid-helper-text'),

    // Tampa & Dobradiça
    hasLidRadios: document.querySelectorAll('input[name="hasLid"]'),
    groupLidType: document.getElementById('group-lid-type'),
    lidRadios: document.querySelectorAll('input[name="lidType"]'),
    sliderLidAngle: document.getElementById('slider-lid-angle'),
    lidAngleDisplay: document.getElementById('lid-angle-display'),
    rowLidOpen: document.getElementById('row-lid-open'),
    groupPinHingeParams: document.getElementById('group-pin-hinge-params'),
    inpHingeLidH: document.getElementById('inp-hinge-lid-height'),
    rangeHingeLidH: document.getElementById('range-hinge-lid-height'),
    hingeAxleRadios: document.querySelectorAll('input[name="hingeAxleType"]'),
    hingeAxleHelperText: document.getElementById('hinge-axle-helper-text'),
    rowHingeClearance: document.getElementById('row-hinge-clearance'),
    inpHingeClearance: document.getElementById('inp-hinge-clearance'),
    rangeHingeClearance: document.getElementById('range-hinge-clearance'),

    // Inputs Retangulares
    inpWidth: document.getElementById('inp-width'),
    rangeWidth: document.getElementById('range-width'),
    inpHeight: document.getElementById('inp-height'),
    rangeHeight: document.getElementById('range-height'),
    inpDepth: document.getElementById('inp-depth'),
    rangeDepth: document.getElementById('range-depth'),

    // Inputs Poligonal
    inpPolySides: document.getElementById('inp-poly-sides'),
    rangePolySides: document.getElementById('range-poly-sides'),
    inpPolyRadius: document.getElementById('inp-poly-radius'),
    rangePolyRadius: document.getElementById('range-poly-radius'),
    inpPolyHeight: document.getElementById('inp-poly-height'),
    rangePolyHeight: document.getElementById('range-poly-height'),

    // Inputs Cantos Curvos
    inpHingeW: document.getElementById('inp-hinge-w'),
    rangeHingeW: document.getElementById('range-hinge-w'),
    inpHingeH: document.getElementById('inp-hinge-h'),
    rangeHingeH: document.getElementById('range-hinge-h'),
    inpHingeD: document.getElementById('inp-hinge-d'),
    rangeHingeD: document.getElementById('range-hinge-d'),
    inpHingeRadius: document.getElementById('inp-hinge-radius'),
    rangeHingeRadius: document.getElementById('range-hinge-radius'),

    // Material e Encaixes
    inpThickness: document.getElementById('inp-thickness'),
    inpTabSize: document.getElementById('inp-tab-size'),
    rangeTabSize: document.getElementById('range-tab-size'),
    fingerSizeGroup: document.getElementById('finger-size-group'),
    tslotGroup: document.getElementById('tslot-group'),
    selBoltSize: document.getElementById('sel-bolt-size'),
    inpBoltLen: document.getElementById('inp-bolt-len'),
    inpKerf: document.getElementById('inp-kerf'),
    rangeKerf: document.getElementById('range-kerf'),

    // Divisórias
    inpDivX: document.getElementById('inp-div-x'),
    rangeDivX: document.getElementById('range-div-x'),
    inpDivY: document.getElementById('inp-div-y'),
    rangeDivY: document.getElementById('range-div-y'),

    // Furos
    btnAddCutout: document.getElementById('btn-add-cutout'),
    cutoutsContainer: document.getElementById('cutouts-list-container'),
    emptyCutoutsMsg: document.getElementById('empty-cutouts-msg'),

    // Abas e Viewports
    tabBtn3D: document.getElementById('tab-btn-3d'),
    tabBtn2D: document.getElementById('tab-btn-2d'),
    view3DWrapper: document.getElementById('view-3d-wrapper'),
    view2DWrapper: document.getElementById('view-2d-wrapper'),
    canvasContainer: document.getElementById('canvas-container'),

    // 3D HUD
    sliderExploded: document.getElementById('slider-exploded'),
    explodedValDisplay: document.getElementById('exploded-val-display'),
    hudDims: document.getElementById('hud-dims'),
    hudLid: document.getElementById('hud-lid'),
    sheetAreaCalc: document.getElementById('sheet-area-calc'),
    btnAutoRotate: document.getElementById('btn-autorotate'),
    btnResetCam: document.getElementById('btn-reset-cam'),
    matPills: document.querySelectorAll('.mat-pill'),

    // 2D Controls
    svgStage: document.getElementById('svg-stage'),
    svgPreviewMount: document.getElementById('svg-preview-mount'),
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
  // MOTOR GEOMÉTRICO 1: RETANGULAR COM DOBRADIÇA
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

  // Gera dentes de encaixe para Caixa Retangular (Zero saliência externa, cantos 90° faceados)
  function generateEdgeSegments(pStart, pEnd, edgeType, targetTabSize, thickness, kerf, recessStart = false, recessEnd = false) {
    const dx = pEnd.x - pStart.x;
    const dy = pEnd.y - pStart.y;
    const length = Math.hypot(dx, dy);

    const ux = dx / length;
    const uy = dy / length;
    // Vetor normal apontando PARA DENTRO da peça (à esquerda no sentido anti-horário: (ux, uy) -> (-uy, ux))
    const inNx = -uy;
    const inNy = ux;

    if (edgeType === 'flat' || state.jointType === 'flat') {
      return {
        points: [pStart, pEnd],
        offsetStart: 0,
        offsetEnd: 0,
        inNx, inNy
      };
    }

    if (state.jointType === 'tslot' && state.boxModel === 'rect') {
      const spec = BOLT_SPECS[state.boltSize] || BOLT_SPECS.M3;
      const tabW = Math.min(spec.tabWidth, length * 0.4);
      if (edgeType !== 'male') {
        return {
          points: [pStart, pEnd],
          offsetStart: 0,
          offsetEnd: 0,
          inNx, inNy
        };
      }

      const mid = length / 2;
      const halfTab = tabW / 2;
      const p1 = { x: pStart.x + inNx * thickness, y: pStart.y + inNy * thickness };
      const p2 = { x: pStart.x + ux * (mid - halfTab) + inNx * thickness, y: pStart.y + uy * (mid - halfTab) + inNy * thickness };
      const p3 = { x: pStart.x + ux * (mid - halfTab), y: pStart.y + uy * (mid - halfTab) };
      const p4 = { x: pStart.x + ux * (mid + halfTab), y: pStart.y + uy * (mid + halfTab) };
      const p5 = { x: pStart.x + ux * (mid + halfTab) + inNx * thickness, y: pStart.y + uy * (mid + halfTab) + inNy * thickness };
      const p6 = { x: pEnd.x + inNx * thickness, y: pEnd.y + inNy * thickness };
      return {
        points: [p1, p2, p3, p4, p5, p6],
        offsetStart: thickness,
        offsetEnd: thickness,
        inNx, inNy
      };
    }

    let count = Math.max(3, Math.round(length / targetTabSize));
    if (count % 2 === 0) count += 1;

    const segLen = length / count;
    const points = [];
    const kHalf = kerf / 2;

    const isStartTab = (edgeType === 'male');
    const isEndTab   = (edgeType === 'male');
    const offsetStart = isStartTab ? 0 : thickness;
    const offsetEnd   = isEndTab ? 0 : thickness;

    for (let i = 0; i < count; i++) {
      // Macho: dentes nos índices pares (0, 2, 4...) na aresta externa (offset = 0)
      // Fêmea: dentes nos índices ímpares (1, 3, 5...) na aresta externa (offset = 0)
      const isTab = (edgeType === 'male') ? (i % 2 === 0) : (i % 2 === 1);
      const s0 = i * segLen;
      const s1 = (i + 1) * segLen;

      let adj0, adj1;
      if (isTab) {
        adj0 = (i === 0) ? (recessStart ? thickness : s0) : (s0 - kHalf);
        adj1 = (i === count - 1) ? (recessEnd ? (length - thickness) : s1) : (s1 + kHalf);
      } else {
        // Encaixe Fêmea (rebaixado por thickness para dentro da peça)
        adj0 = (i === 0) ? (recessStart ? thickness : 0) : (s0 + kHalf);
        adj1 = (i === count - 1) ? (recessEnd ? (length - thickness) : length) : (s1 - kHalf);
      }

      const offsetInward = isTab ? 0 : thickness;

      points.push({
        x: pStart.x + ux * adj0 + inNx * offsetInward,
        y: pStart.y + uy * adj0 + inNy * offsetInward
      });
      points.push({
        x: pStart.x + ux * adj1 + inNx * offsetInward,
        y: pStart.y + uy * adj1 + inNy * offsetInward
      });
    }

    return {
      points,
      offsetStart,
      offsetEnd,
      inNx, inNy
    };
  }

  function buildFacePolygon(w, h, topEdge, rightEdge, bottomEdge, leftEdge, targetTabSize, thickness, kerf) {
    const c0 = { x: 0, y: 0 };
    const c1 = { x: w, y: 0 };
    const c2 = { x: w, y: h };
    const c3 = { x: 0, y: h };

    const edgeDefs = [
      { pStart: c0, pEnd: c1, type: bottomEdge },
      { pStart: c1, pEnd: c2, type: rightEdge  },
      { pStart: c2, pEnd: c3, type: topEdge    },
      { pStart: c3, pEnd: c0, type: leftEdge   }
    ];

    const edges = edgeDefs.map((e, idx) => {
      const prevType = edgeDefs[(idx + 3) % 4].type;
      const nextType = edgeDefs[(idx + 1) % 4].type;
      const recessStart = (prevType === 'female');
      const recessEnd   = (nextType === 'female');
      return generateEdgeSegments(e.pStart, e.pEnd, e.type, targetTabSize, thickness, kerf, recessStart, recessEnd);
    });

    const allPoints = [];

    for (let k = 0; k < 4; k++) {
      const edge = edges[k];
      for (const pt of edge.points) {
        if (allPoints.length === 0) {
          allPoints.push(pt);
        } else {
          const last = allPoints[allPoints.length - 1];
          if (Math.hypot(pt.x - last.x, pt.y - last.y) > 0.001) {
            allPoints.push(pt);
          }
        }
      }
    }

    if (allPoints.length > 1) {
      const first = allPoints[0];
      const last = allPoints[allPoints.length - 1];
      if (Math.hypot(first.x - last.x, first.y - last.y) < 0.001) {
        allPoints.pop();
      }
    }

    return allPoints;
  }

  function calculateTSlotHoles(w, h, faceId, thickness) {
    const holes = [];
    if (state.jointType !== 'tslot' || state.boxModel !== 'rect') return holes;

    const spec = BOLT_SPECS[state.boltSize] || BOLT_SPECS.M3;
    const boltDist = Math.max(thickness + 4, state.boltLength - 4);

    if (faceId === 'bottom' || faceId === 'top') {
      holes.push({ type: 'circle', x: w / 2, y: -thickness / 2, r: spec.holeDiam / 2 });
      holes.push({ type: 'circle', x: w / 2, y: h + thickness / 2, r: spec.holeDiam / 2 });
      holes.push({ type: 'circle', x: -thickness / 2, y: h / 2, r: spec.holeDiam / 2 });
      holes.push({ type: 'circle', x: w + thickness / 2, y: h / 2, r: spec.holeDiam / 2 });
    } else {
      holes.push({ type: 'tslot_cross', x: w / 2, y: 0, shaftW: spec.holeDiam, shaftL: boltDist, nutW: spec.nutWidth, nutH: spec.nutThick });
      if (state.hasLid) {
        holes.push({ type: 'tslot_cross', x: w / 2, y: h, shaftW: spec.holeDiam, shaftL: -boltDist, nutW: spec.nutWidth, nutH: -spec.nutThick });
      }
    }
    return holes;
  }

  // ==========================================================================
  // GERADORES GEOMÉTRICOS PARA BAÚ COM DOBRADIÇA ARTICULADA (PINOS / MAKERCASE)
  // ==========================================================================

  // Constrói disco circular de retenção do pino
  function buildCirclePolygon(radius, segments = 32) {
    const pts = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push({
        x: radius + radius * Math.cos(angle),
        y: radius + radius * Math.sin(angle)
      });
    }
    return pts;
  }

  // ========================================================================
  // ARQUITETURA OFICIAL MAKERCASE: LASER HINGE BOX (BAÚ COM PINOS)
  // Base sólida 100% reta no topo + Tampa concha externa com braços laterais
  // ========================================================================
  function cleanPolygonPoints(pts) {
    const clean = [];
    pts.forEach(p => {
      if (clean.length === 0) clean.push(p);
      else {
        const last = clean[clean.length - 1];
        if (Math.hypot(p.x - last.x, p.y - last.y) > 0.001) clean.push(p);
      }
    });
    if (clean.length > 1) {
      const first = clean[0];
      const last = clean[clean.length - 1];
      if (Math.hypot(first.x - last.x, first.y - last.y) < 0.001) clean.pop();
    }
    return clean;
  }

  function getMakerCaseHingeParams(W, H, D, T) {
    let lidHeight = state.hingeLidHeight || 18;
    lidHeight = Math.max(8, Math.min(Math.round(H - 15), lidHeight));
    const Hbase = H - lidHeight;

    // Dimensões do Pivô segundo a cinemática MakerCase oficial
    // Disco Ø 10mm (raio 5mm) + parede de sustentação
    const minR = Math.max(8.0, 5.0 + T * 1.0);
    const R_lobe = Math.min(Math.round(minR * 10) / 10, Math.floor(D * 0.25));
    const p = R_lobe;
    const d_drop = Math.min(R_lobe, Math.floor(Hbase * 0.35));

    // A tampa concha externa abraça a caixa com largura exata W + 2*T
    const lidWidth = W + 2 * T;

    // Parede traseira da tampa com folga estética e funcional de 2 mm
    const Hlid_back = Math.max(T + 1, lidHeight - 2);
    const Harm = lidHeight + d_drop + R_lobe;

    const pinPivotY = -H / 2 + Hbase - d_drop;
    const pinPivotZ = -D / 2 + p;

    return { lidHeight, Hbase, p, d_drop, R_lobe, lidWidth, Hlid_back, Harm, pinPivotY, pinPivotZ };
  }

  // Constrói a Tampa Superior (Lid Top) da Tampa Concha MakerCase
  function buildLidTopPolygon(lidWidth, D, W, tabSize, thickness, kerf) {
    const pts = [];
    const kHalf = kerf / 2;

    let countW = Math.max(3, Math.round(W / tabSize));
    if (countW % 2 === 0) countW += 1;
    const segLenW = W / countW;

    const spanD = D - 2 * thickness;
    let countD = Math.max(3, Math.round(spanD / tabSize));
    if (countD % 2 === 0) countD += 1;
    const segLenD = spanD / countD;

    // 1. Aresta Frontal (de X = thickness até X = W + thickness em Y ~ 0)
    // Sentido CCW: da esquerda para a direita (+X)
    for (let i = 0; i < countW; i++) {
      const s0 = thickness + i * segLenW;
      const s1 = thickness + (i + 1) * segLenW;
      const isCava = (i % 2 === 0);
      if (isCava) {
        pts.push({ x: s0, y: thickness });
        pts.push({ x: s1, y: thickness });
      } else {
        const x0 = s0 - kHalf;
        const x1 = s1 + kHalf;
        pts.push({ x: x0, y: thickness });
        pts.push({ x: x0, y: 0 });
        pts.push({ x: x1, y: 0 });
        pts.push({ x: x1, y: thickness });
      }
    }

    // 2. Aresta Direita (de Y = thickness até Y = D - thickness em X ~ W + thickness)
    // Sentido CCW: da frente para trás (+Y)
    for (let j = 0; j < countD; j++) {
      const s0 = thickness + j * segLenD;
      const s1 = thickness + (j + 1) * segLenD;
      const isTab = (j % 2 === 0);
      if (isTab) {
        const y0 = (j === 0) ? s0 : (s0 - kHalf);
        const y1 = (j === countD - 1) ? s1 : (s1 + kHalf);
        pts.push({ x: W + thickness, y: y0 });
        pts.push({ x: lidWidth, y: y0 });
        pts.push({ x: lidWidth, y: y1 });
        pts.push({ x: W + thickness, y: y1 });
      } else {
        pts.push({ x: W + thickness, y: s0 });
        pts.push({ x: W + thickness, y: s1 });
      }
    }

    // 3. Aresta Traseira (de X = W + thickness até X = thickness em Y ~ D)
    // Sentido CCW: da direita para a esquerda (-X)
    for (let i = countW - 1; i >= 0; i--) {
      const s0 = thickness + i * segLenW;
      const s1 = thickness + (i + 1) * segLenW;
      const isCava = (i % 2 === 0);
      if (isCava) {
        pts.push({ x: s1, y: D - thickness });
        pts.push({ x: s0, y: D - thickness });
      } else {
        const x0 = s0 - kHalf;
        const x1 = s1 + kHalf;
        pts.push({ x: x1, y: D - thickness });
        pts.push({ x: x1, y: D });
        pts.push({ x: x0, y: D });
        pts.push({ x: x0, y: D - thickness });
      }
    }

    // 4. Aresta Esquerda (de Y = D - thickness até Y = thickness em X ~ thickness)
    // Sentido CCW: de trás para frente (-Y)
    for (let j = countD - 1; j >= 0; j--) {
      const s0 = thickness + j * segLenD;
      const s1 = thickness + (j + 1) * segLenD;
      const isTab = (j % 2 === 0);
      if (isTab) {
        const y0 = (j === 0) ? s0 : (s0 - kHalf);
        const y1 = (j === countD - 1) ? s1 : (s1 + kHalf);
        pts.push({ x: thickness, y: y1 });
        pts.push({ x: 0, y: y1 });
        pts.push({ x: 0, y: y0 });
        pts.push({ x: thickness, y: y0 });
      } else {
        pts.push({ x: thickness, y: s1 });
        pts.push({ x: thickness, y: s0 });
      }
    }

    return cleanPolygonPoints(pts);
  }

  // Constrói a Frente da Tampa (Lid Front)
  function buildLidFrontPolygon(W, lidHeight, tabSize, thickness, kerf) {
    const pts = [];
    const kHalf = kerf / 2;

    let countW = Math.max(3, Math.round(W / tabSize));
    if (countW % 2 === 0) countW += 1;
    const segLenW = W / countW;

    // 1. Fundo reto (Y = 0, X: 0 -> W)
    pts.push({ x: 0, y: 0 });
    pts.push({ x: W, y: 0 });

    // 2. Lateral direita reta (X = W, Y: 0 -> lidHeight - thickness)
    pts.push({ x: W, y: lidHeight - thickness });

    // 3. Topo com dentes machos que entram nas cavas de lid_top (X: W -> 0)
    for (let i = countW - 1; i >= 0; i--) {
      const s0 = i * segLenW;
      const s1 = (i + 1) * segLenW;
      const isTab = (i % 2 === 0);
      if (isTab) {
        const x0 = (i === 0) ? 0 : (s0 - kHalf);
        const x1 = (i === countW - 1) ? W : (s1 + kHalf);
        pts.push({ x: x1, y: lidHeight - thickness });
        pts.push({ x: x1, y: lidHeight });
        pts.push({ x: x0, y: lidHeight });
        pts.push({ x: x0, y: lidHeight - thickness });
      } else {
        pts.push({ x: s1, y: lidHeight - thickness });
        pts.push({ x: s0, y: lidHeight - thickness });
      }
    }

    // 4. Lateral esquerda reta (X = 0, Y: lidHeight - thickness -> 0)
    pts.push({ x: 0, y: lidHeight - thickness });
    pts.push({ x: 0, y: 0 });

    return cleanPolygonPoints(pts);
  }

  // Constrói o Trás da Tampa (Lid Back)
  function buildLidBackPolygon(W, Hlid_back, tabSize, thickness, kerf) {
    const pts = [];
    const kHalf = kerf / 2;

    let countW = Math.max(3, Math.round(W / tabSize));
    if (countW % 2 === 0) countW += 1;
    const segLenW = W / countW;

    // 1. Fundo reto (Y = 0, X: 0 -> W)
    pts.push({ x: 0, y: 0 });
    pts.push({ x: W, y: 0 });

    // 2. Lateral direita reta (X = W, Y: 0 -> Hlid_back - thickness)
    pts.push({ x: W, y: Hlid_back - thickness });

    // 3. Topo com dentes machos que entram nas cavas traseiras de lid_top (X: W -> 0)
    for (let i = countW - 1; i >= 0; i--) {
      const s0 = i * segLenW;
      const s1 = (i + 1) * segLenW;
      const isTab = (i % 2 === 0);
      if (isTab) {
        const x0 = (i === 0) ? 0 : (s0 - kHalf);
        const x1 = (i === countW - 1) ? W : (s1 + kHalf);
        pts.push({ x: x1, y: Hlid_back - thickness });
        pts.push({ x: x1, y: Hlid_back });
        pts.push({ x: x0, y: Hlid_back });
        pts.push({ x: x0, y: Hlid_back - thickness });
      } else {
        pts.push({ x: s1, y: Hlid_back - thickness });
        pts.push({ x: s0, y: Hlid_back - thickness });
      }
    }

    // 4. Lateral esquerda reta (X = 0, Y: Hlid_back - thickness -> 0)
    pts.push({ x: 0, y: Hlid_back - thickness });
    pts.push({ x: 0, y: 0 });

    return cleanPolygonPoints(pts);
  }

  // Gera o braço lateral direito da tampa concha (estilo MakerCase Laser Hinge)
  function buildMakerCaseArmRightPolygon(D, lidHeight, d_drop, p, R_lobe, Hlid_back, thickness, tabSize, kerf) {
    const Harm = lidHeight + d_drop + R_lobe;
    const skirtBottomY = d_drop + R_lobe;
    const xp = D - p;
    const yp = R_lobe;

    const spanD = D - 2 * thickness;
    let countD = Math.max(3, Math.round(spanD / tabSize));
    if (countD % 2 === 0) countD += 1;
    const segLenD = spanD / countD;
    const kHalf = kerf / 2;

    const pts = [];

    // Sentido CCW (Anti-Horário):
    // 1. Frente inferior da saia
    pts.push({ x: 0, y: skirtBottomY });

    // 2. Reta horizontal inferior da saia até o chanfro da orelha (+X)
    const chamferEndX = (xp - R_lobe) - d_drop;
    pts.push({ x: chamferEndX, y: skirtBottomY });

    // 3. Rampa chanfrada a 45° descendo até o início da orelha circular (+X, -Y)
    pts.push({ x: xp - R_lobe, y: yp });

    // 4. Orelha Circular Convexa em torno do pivô (xp, yp)
    // De ang = -PI até ang = 0 (arco inferior de 180° no sentido anti-horário)
    const arcSegments = 24;
    for (let i = 0; i <= arcSegments; i++) {
      const ang = -Math.PI + (i / arcSegments) * Math.PI;
      pts.push({
        x: xp + R_lobe * Math.cos(ang),
        y: yp + R_lobe * Math.sin(ang)
      });
    }

    // 5. Subida vertical traseira lisa até o topo (+Y)
    pts.push({ x: D, y: Harm });

    // 6. Aresta superior: de trás (X = D) para a frente (X = 0) no sentido CCW (-X)
    // Trecho de X = D até X = D - thickness: liso a Y = Harm (onde a tampa traseira encosta)
    pts.push({ x: D - thickness, y: Harm });

    // Cavas fêmea que recebem os dentes machos de lid_top (j de countD - 1 até 0)
    for (let j = countD - 1; j >= 0; j--) {
      const s0 = thickness + j * segLenD;
      const s1 = thickness + (j + 1) * segLenD;
      const isCava = (j % 2 === 0);
      if (isCava) {
        const x0 = (j === 0) ? s0 : (s0 + kHalf);
        const x1 = (j === countD - 1) ? s1 : (s1 - kHalf);
        pts.push({ x: x1, y: Harm });
        pts.push({ x: x1, y: Harm - thickness });
        pts.push({ x: x0, y: Harm - thickness });
        pts.push({ x: x0, y: Harm });
      } else {
        pts.push({ x: s1, y: Harm });
        pts.push({ x: s0, y: Harm });
      }
    }

    // Trecho de X = thickness até X = 0: liso a Y = Harm (onde a tampa frontal encosta)
    pts.push({ x: thickness, y: Harm });
    pts.push({ x: 0, y: Harm });

    // 7. Aresta frontal lisa descendo até a base da saia (-Y)
    pts.push({ x: 0, y: skirtBottomY });

    return cleanPolygonPoints(pts);
  }

  // Gera o braço lateral esquerdo da tampa concha (espelho perfeito)
  function buildMakerCaseArmLeftPolygon(D, lidHeight, d_drop, p, R_lobe, Hlid_back, thickness, tabSize, kerf) {
    const rightPts = buildMakerCaseArmRightPolygon(D, lidHeight, d_drop, p, R_lobe, Hlid_back, thickness, tabSize, kerf);
    return rightPts.map(pt => ({ x: D - pt.x, y: pt.y })).reverse();
  }

  function getRectFacesData() {
    const { W, H, D, T, K } = getEffectiveDimensions();
    const isPinHinge = (state.hasLid !== false) && (state.lidType === 'pin_hinge');
    const tabSize = state.tabSize;
    const hasLid = state.hasLid !== false;

    // ========================================================================
    // CASO ESPECIAL: BAÚ COM DOBRADIÇA ARTICULADA — ARQUITETURA OFICIAL MAKERCASE
    // Base sólida 100% reta no topo + Tampa concha externa com braços laterais
    // ========================================================================
    if (isPinHinge && hasLid) {
      const params = getMakerCaseHingeParams(W, H, D, T);
      const { lidHeight, Hbase, p, d_drop, R_lobe, lidWidth, Hlid_back, Harm, pinPivotY, pinPivotZ } = params;
      const isWoodCam = (state.hingeAxleType === 'wood_cam');
      const camHoleR = (10.0 + (state.hingeClearance || 0.35)) / 2;

      const faces = {
        // --- BASE INFERIOR SÓLIDA E RETA NO TOPO (5 PEÇAS) ---
        bottom: {
          id: 'bottom', name: 'Fundo da Base', width: W, height: D,
          polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K),
          internalHoles: calculateTSlotHoles(W, D, 'bottom', T),
          normal: [0, -1, 0], pos3D: [0, -H / 2, 0], rot3D: [Math.PI / 2, 0, 0],
          enabled: state.faces.bottom !== false
        },
        front: {
          id: 'front', name: 'Frente da Base', width: W, height: Hbase,
          polygon: buildFacePolygon(W, Hbase, 'flat', 'male', 'female', 'male', tabSize, T, K),
          internalHoles: [],
          normal: [0, 0, 1], pos3D: [0, -H / 2 + Hbase / 2, D / 2], rot3D: [0, 0, 0],
          enabled: state.faces.front !== false
        },
        back: {
          id: 'back', name: 'Trás da Base', width: W, height: Hbase,
          polygon: buildFacePolygon(W, Hbase, 'flat', 'male', 'female', 'male', tabSize, T, K),
          internalHoles: [],
          normal: [0, 0, -1], pos3D: [0, -H / 2 + Hbase / 2, -D / 2], rot3D: [0, Math.PI, 0],
          enabled: state.faces.back !== false
        },
        left: {
          id: 'left', name: 'Lateral Esquerda da Base', width: D, height: Hbase,
          polygon: buildFacePolygon(D, Hbase, 'flat', 'female', 'female', 'female', tabSize, T, K),
          internalHoles: isWoodCam
            ? [{ type: 'rect', x: p - T / 2, y: (Hbase - d_drop) - 2.5, w: T, h: 5.0 }]
            : [{ type: 'circle', x: p, y: Hbase - d_drop, r: 1.6 }],
          normal: [-1, 0, 0], pos3D: [-W / 2, -H / 2 + Hbase / 2, 0], rot3D: [0, -Math.PI / 2, 0],
          enabled: state.faces.left !== false
        },
        right: {
          id: 'right', name: 'Lateral Direita da Base', width: D, height: Hbase,
          polygon: buildFacePolygon(D, Hbase, 'flat', 'female', 'female', 'female', tabSize, T, K),
          internalHoles: isWoodCam
            ? [{ type: 'rect', x: (D - p) - T / 2, y: (Hbase - d_drop) - 2.5, w: T, h: 5.0 }]
            : [{ type: 'circle', x: D - p, y: Hbase - d_drop, r: 1.6 }],
          normal: [1, 0, 0], pos3D: [W / 2, -H / 2 + Hbase / 2, 0], rot3D: [0, Math.PI / 2, 0],
          enabled: state.faces.right !== false
        },

        // --- TAMPA CONCHA EXTERNA QUE ABRAÇA A BASE (5 PEÇAS) ---
        lid_top: {
          id: 'lid_top', name: 'Tampo Superior (Tampa)', width: lidWidth, height: D,
          polygon: buildLidTopPolygon(lidWidth, D, W, tabSize, T, K),
          internalHoles: [],
          normal: [0, 1, 0], pos3D: [0, -H / 2 + Hbase + lidHeight, 0], rot3D: [-Math.PI / 2, 0, 0],
          enabled: state.faces.top !== false, isLid: true
        },
        lid_front: {
          id: 'lid_front', name: 'Frente da Tampa', width: W, height: lidHeight,
          polygon: buildLidFrontPolygon(W, lidHeight, tabSize, T, K),
          internalHoles: [],
          normal: [0, 0, 1], pos3D: [0, -H / 2 + Hbase + lidHeight / 2, D / 2], rot3D: [0, 0, 0],
          enabled: state.faces.top !== false, isLid: true
        },
        lid_back: {
          id: 'lid_back', name: 'Trás da Tampa', width: W, height: Hlid_back,
          polygon: buildLidBackPolygon(W, Hlid_back, tabSize, T, K),
          internalHoles: [],
          normal: [0, 0, -1], pos3D: [0, -H / 2 + Hbase + lidHeight - Hlid_back / 2, -D / 2], rot3D: [0, Math.PI, 0],
          enabled: state.faces.top !== false, isLid: true
        },
        lid_left: {
          id: 'lid_left', name: 'Braço Esquerdo da Tampa', width: D, height: Harm,
          polygon: buildMakerCaseArmLeftPolygon(D, lidHeight, d_drop, p, R_lobe, Hlid_back, T, tabSize, K),
          internalHoles: [{ type: 'circle', x: p, y: R_lobe, r: isWoodCam ? camHoleR : 1.6 }],
          normal: [-1, 0, 0], pos3D: [-W / 2 - T, pinPivotY + Harm / 2 - R_lobe, 0], rot3D: [0, -Math.PI / 2, 0],
          enabled: state.faces.top !== false, isLid: true
        },
        lid_right: {
          id: 'lid_right', name: 'Braço Direito da Tampa', width: D, height: Harm,
          polygon: buildMakerCaseArmRightPolygon(D, lidHeight, d_drop, p, R_lobe, Hlid_back, T, tabSize, K),
          internalHoles: [{ type: 'circle', x: D - p, y: R_lobe, r: isWoodCam ? camHoleR : 1.6 }],
          normal: [1, 0, 0], pos3D: [W / 2 + T, pinPivotY + Harm / 2 - R_lobe, 0], rot3D: [0, Math.PI / 2, 0],
          enabled: state.faces.top !== false, isLid: true
        },

        // --- BUCHAS DE GIRO CILÍNDRICAS (2 PEÇAS) ---
        pin_disc_1: {
          id: 'pin_disc_1', name: isWoodCam ? 'Bucha de Giro 1 (MakerCase)' : 'Arruela Parafuso 1',
          width: 10, height: 10,
          polygon: buildCirclePolygon(5.0),
          internalHoles: isWoodCam
            ? [{ type: 'rect', x: 5.0 - T / 2, y: 5.0 - 2.5, w: T, h: 5.0 }]
            : [{ type: 'circle', x: 5.0, y: 5.0, r: 1.6 }],
          normal: [-1, 0, 0], pos3D: [-W / 2 - T - 0.2, pinPivotY, pinPivotZ], rot3D: [0, -Math.PI / 2, 0],
          enabled: state.faces.top !== false, isLid: false
        },
        pin_disc_2: {
          id: 'pin_disc_2', name: isWoodCam ? 'Bucha de Giro 2 (MakerCase)' : 'Arruela Parafuso 2',
          width: 10, height: 10,
          polygon: buildCirclePolygon(5.0),
          internalHoles: isWoodCam
            ? [{ type: 'rect', x: 5.0 - T / 2, y: 5.0 - 2.5, w: T, h: 5.0 }]
            : [{ type: 'circle', x: 5.0, y: 5.0, r: 1.6 }],
          normal: [1, 0, 0], pos3D: [W / 2 + T + 0.2, pinPivotY, pinPivotZ], rot3D: [0, Math.PI / 2, 0],
          enabled: state.faces.top !== false, isLid: false
        },

        // --- CHAVETAS DE TRAVA (2 PEÇAS NO MODO 100% MADEIRA) ---
        pin_key_1: {
          id: 'pin_key_1', name: 'Chaveta Trava 1 (MakerCase)',
          width: 2 * T, height: 5.0,
          polygon: [{ x: 0, y: 0 }, { x: 2 * T, y: 0 }, { x: 2 * T, y: 5.0 }, { x: 0, y: 5.0 }],
          internalHoles: [],
          normal: [-1, 0, 0], pos3D: [-W / 2 - T / 2, pinPivotY, pinPivotZ], rot3D: [0, -Math.PI / 2, 0],
          enabled: (state.faces.top !== false) && isWoodCam, isLid: false
        },
        pin_key_2: {
          id: 'pin_key_2', name: 'Chaveta Trava 2 (MakerCase)',
          width: 2 * T, height: 5.0,
          polygon: [{ x: 0, y: 0 }, { x: 2 * T, y: 0 }, { x: 2 * T, y: 5.0 }, { x: 0, y: 5.0 }],
          internalHoles: [],
          normal: [1, 0, 0], pos3D: [W / 2 + T / 2, pinPivotY, pinPivotZ], rot3D: [0, Math.PI / 2, 0],
          enabled: (state.faces.top !== false) && isWoodCam, isLid: false
        }
      };

      // Furos customizados do usuário
      state.cutouts.forEach(c => {
        const targetFace = (c.face === 'top') ? 'lid_top' : c.face;
        if (faces[targetFace]) {
          const fc = faces[targetFace];
          const cx = fc.width / 2 + c.posX;
          const cy = fc.height / 2 + c.posY;
          if (c.type === 'circle') fc.internalHoles.push({ type: 'circle', x: cx, y: cy, r: c.sizeX / 2 });
          else fc.internalHoles.push({ type: 'rect', x: cx - c.sizeX / 2, y: cy - c.sizeY / 2, w: c.sizeX, h: c.sizeY });
        }
      });

      return faces;
    }

    // ========================================================================
    // MODELO RETANGULAR PADRÃO (COM OU SEM TAMPA DE ENCAIXE / LIVING HINGE)
    // ========================================================================
    const topEdgeBack = 'male';
    const backEdgeTop = !hasLid ? 'flat' : 'female';
    const frontEdgeTop = !hasLid ? 'flat' : 'female';
    const leftEdgeTop = !hasLid ? 'flat' : 'female';
    const rightEdgeTop = !hasLid ? 'flat' : 'female';

    const faces = {
      bottom: {
        id: 'bottom', name: 'Fundo', width: W, height: D,
        polygon: buildFacePolygon(W, D, 'male', 'male', 'male', 'male', tabSize, T, K),
        internalHoles: calculateTSlotHoles(W, D, 'bottom', T),
        normal: [0, -1, 0], pos3D: [0, -H / 2, 0], rot3D: [Math.PI / 2, 0, 0], enabled: state.faces.bottom
      },
      top: {
        id: 'top', name: 'Tampa', width: W, height: D,
        polygon: buildFacePolygon(W, D, topEdgeBack, 'male', 'male', 'male', tabSize, T, K),
        internalHoles: calculateTSlotHoles(W, D, 'top', T),
        normal: [0, 1, 0], pos3D: [0, H / 2, 0], rot3D: [-Math.PI / 2, 0, 0], enabled: hasLid && state.faces.top
      },
      front: {
        id: 'front', name: 'Frente', width: W, height: H,
        polygon: buildFacePolygon(W, H, frontEdgeTop, 'male', 'female', 'male', tabSize, T, K),
        internalHoles: calculateTSlotHoles(W, H, 'front', T),
        normal: [0, 0, 1], pos3D: [0, 0, D / 2], rot3D: [0, 0, 0], enabled: state.faces.front
      },
      back: {
        id: 'back', name: 'Trás', width: W, height: H,
        polygon: buildFacePolygon(W, H, backEdgeTop, 'male', 'female', 'male', tabSize, T, K),
        internalHoles: calculateTSlotHoles(W, H, 'back', T),
        normal: [0, 0, -1], pos3D: [0, 0, -D / 2], rot3D: [0, Math.PI, 0], enabled: state.faces.back
      },
      left: {
        id: 'left', name: 'Esquerda', width: D, height: H,
        polygon: buildFacePolygon(D, H, leftEdgeTop, 'female', 'female', 'female', tabSize, T, K),
        internalHoles: calculateTSlotHoles(D, H, 'left', T),
        normal: [-1, 0, 0], pos3D: [-W / 2, 0, 0], rot3D: [0, -Math.PI / 2, 0], enabled: state.faces.left
      },
      right: {
        id: 'right', name: 'Direita', width: D, height: H,
        polygon: buildFacePolygon(D, H, rightEdgeTop, 'female', 'female', 'female', tabSize, T, K),
        internalHoles: calculateTSlotHoles(D, H, 'right', T),
        normal: [1, 0, 0], pos3D: [W / 2, 0, 0], rot3D: [0, Math.PI / 2, 0], enabled: state.faces.right
      }
    };

    // Furos customizados do usuário
    state.cutouts.forEach(c => {
      if (faces[c.face]) {
        const fc = faces[c.face];
        const cx = fc.width / 2 + c.posX;
        const cy = fc.height / 2 + c.posY;
        if (c.type === 'circle') fc.internalHoles.push({ type: 'circle', x: cx, y: cy, r: c.sizeX / 2 });
        else fc.internalHoles.push({ type: 'rect', x: cx - c.sizeX / 2, y: cy - c.sizeY / 2, w: c.sizeX, h: c.sizeY });
      }
    });

    return faces;
  }

  // ==========================================================================
  // MOTOR GEOMÉTRICO 2: POLIGONAL (3 A 10 LADOS) & CANTOS CURVOS
  // ==========================================================================

  // Gera o contorno de uma aresta da tampa/fundo poligonal alinhada à face EXTERNA das paredes:
  // Cantos (vértices do polígono) ficam 100% fechados em P_out, e os segmentos ímpares centrais têm cavas fêmea (-T para dentro) que recebem os dentes machos das paredes
  function generatePolyCapEdgePoints(pOutStart, pOutEnd, sideLen, fingerDepth, targetTabSize, thickness, kerf) {
    const dx = pOutEnd.x - pOutStart.x;
    const dy = pOutEnd.y - pOutStart.y;
    const wallWidth = Math.hypot(dx, dy);

    if (state.jointType === 'flat') {
      return [pOutStart, pOutEnd];
    }

    const ux = dx / wallWidth;
    const uy = dy / wallWidth;
    // Vetor apontando PARA DENTRO do polígono (sentido CCW: (-uy, ux))
    const inNx = -uy;
    const inNy = ux;

    let countW = Math.max(3, Math.round(sideLen / targetTabSize));
    if (countW % 2 === 0) countW += 1;
    const segW = sideLen / countW;
    const kHalf = kerf / 2;

    const points = [];
    // Começa exatamente no vértice externo do polígono (quina viva 100% fechada)
    points.push({ x: pOutStart.x, y: pOutStart.y });

    for (let i = 0; i < countW; i++) {
      const s0 = fingerDepth + i * segW;
      const s1 = fingerDepth + (i + 1) * segW;
      const isNotch = (i % 2 === 1); // Cavas fêmea nos segmentos ímpares centrais
      if (isNotch) {
        const a0 = s0 + kHalf;
        const a1 = s1 - kHalf;
        points.push({ x: pOutStart.x + ux * a0, y: pOutStart.y + uy * a0 });
        points.push({ x: pOutStart.x + ux * a0 + inNx * thickness, y: pOutStart.y + uy * a0 + inNy * thickness });
        points.push({ x: pOutStart.x + ux * a1 + inNx * thickness, y: pOutStart.y + uy * a1 + inNy * thickness });
        points.push({ x: pOutStart.x + ux * a1, y: pOutStart.y + uy * a1 });
      }
    }

    // Termina exatamente no próximo vértice externo do polígono
    points.push({ x: pOutEnd.x, y: pOutEnd.y });
    return points;
  }

  // Constrói a parede lateral exata do polígono de N lados:
  // - Topo e Base: corpo apoia sob a tampa/fundo (y = T até y = H - T) e dentes machos centrais (i ímpar) sobem até y = H e descem até y = 0
  // - Laterais Esquerda e Direita: dentes intercalados entre y = T e y = H - T com projeção trigonométrica fingerDepth
  function buildPolyWallPolygon(sideLen, H, fingerDepth, hasLid, targetTabSize, thickness, kerf) {
    if (state.jointType === 'flat') {
      return [
        { x: 0, y: 0 },
        { x: sideLen, y: 0 },
        { x: sideLen, y: H },
        { x: 0, y: H }
      ];
    }

    const kHalf = kerf / 2;
    let countW = Math.max(3, Math.round(sideLen / targetTabSize));
    if (countW % 2 === 0) countW += 1;
    const segW = sideLen / countW;

    const yBotBase = thickness;
    const yTopBase = hasLid ? (H - thickness) : H;
    const vertSpan = yTopBase - yBotBase;

    let countH = Math.max(3, Math.round(vertSpan / targetTabSize));
    if (countH % 2 === 0) countH += 1;
    const segH = vertSpan / countH;

    const xInnerLeft = fingerDepth;
    const xInnerRight = fingerDepth + sideLen;
    const xOuterRight = sideLen + 2 * fingerDepth;
    const xOuterLeft = 0;

    const pts = [];

    // 1. Aresta Inferior (da esquerda para a direita)
    // A base da parede começa em y = T; dentes machos nos segmentos ímpares descem até y = 0 para entrar nas cavas do fundo
    pts.push({ x: xOuterLeft, y: yBotBase });
    for (let i = 0; i < countW; i++) {
      const x0 = xInnerLeft + i * segW;
      const x1 = xInnerLeft + (i + 1) * segW;
      const isMaleTooth = (i % 2 === 1);
      if (isMaleTooth) {
        const ax0 = x0 - kHalf;
        const ax1 = x1 + kHalf;
        pts.push({ x: ax0, y: yBotBase });
        pts.push({ x: ax0, y: 0 });
        pts.push({ x: ax1, y: 0 });
        pts.push({ x: ax1, y: yBotBase });
      }
    }
    pts.push({ x: xOuterRight, y: yBotBase });

    // 2. Aresta Lateral Direita (Y: yBotBase -> yTopBase) — Dentes machos nos pares (j = 0, 2, 4...)
    for (let j = 0; j < countH; j++) {
      const y0 = yBotBase + j * segH;
      const y1 = yBotBase + (j + 1) * segH;
      const isTab = (j % 2 === 0);
      if (isTab) {
        const ay0 = (j === 0) ? yBotBase : y0 - kHalf;
        const ay1 = (j === countH - 1) ? yTopBase : y1 + kHalf;
        pts.push({ x: xOuterRight, y: ay0 });
        pts.push({ x: xOuterRight, y: ay1 });
        if (j < countH - 1) {
          pts.push({ x: xInnerRight, y: ay1 });
        }
      } else {
        const ay0 = y0 + kHalf;
        const ay1 = y1 - kHalf;
        pts.push({ x: xInnerRight, y: ay0 });
        pts.push({ x: xInnerRight, y: ay1 });
        pts.push({ x: xOuterRight, y: ay1 });
      }
    }

    // 3. Aresta Superior (da direita para a esquerda)
    if (!hasLid) {
      pts.push({ x: xOuterRight, y: H });
      pts.push({ x: xOuterLeft, y: H });
    } else {
      pts.push({ x: xOuterRight, y: yTopBase });
      for (let i = countW - 1; i >= 0; i--) {
        const x0 = xInnerLeft + i * segW;
        const x1 = xInnerLeft + (i + 1) * segW;
        const isMaleTooth = (i % 2 === 1);
        if (isMaleTooth) {
          const ax1 = x1 + kHalf;
          const ax0 = x0 - kHalf;
          pts.push({ x: ax1, y: yTopBase });
          pts.push({ x: ax1, y: H });
          pts.push({ x: ax0, y: H });
          pts.push({ x: ax0, y: yTopBase });
        }
      }
      pts.push({ x: xInnerLeft, y: yTopBase });
    }

    // 4. Aresta Lateral Esquerda (Y: yTopBase -> yBotBase) — Dentes machos nos ímpares (j = 1, 3...)
    for (let j = countH - 1; j >= 0; j--) {
      const y0 = yBotBase + j * segH;
      const y1 = yBotBase + (j + 1) * segH;
      const isTab = (j % 2 === 1);
      if (isTab) {
        const ay1 = y1 + kHalf;
        const ay0 = y0 - kHalf;
        pts.push({ x: xInnerLeft, y: ay1 });
        pts.push({ x: xOuterLeft, y: ay1 });
        pts.push({ x: xOuterLeft, y: ay0 });
        pts.push({ x: xInnerLeft, y: ay0 });
      } else {
        pts.push({ x: xInnerLeft, y: y1 });
        pts.push({ x: xInnerLeft, y: y0 });
      }
    }

    return cleanPolygonPoints(pts);
  }

  function getPolyData() {
    const N = state.polySides;
    const R = state.polyRadius;
    const H = state.polyHeight;
    const T = state.thickness;
    const K = state.kerf;
    const tabSize = state.tabSize;
    const sideLen = 2 * R * Math.sin(Math.PI / N);
    const fingerDepth = (state.jointType === 'flat') ? 0 : T * Math.tan(Math.PI / N);
    const wallWidth = sideLen + 2 * fingerDepth;
    const rOut = R + T / Math.cos(Math.PI / N);

    const outerVertices = [];
    for (let i = 0; i < N; i++) {
      const angle = (i * 2 * Math.PI) / N;
      outerVertices.push({ x: rOut + rOut * Math.cos(angle), y: rOut + rOut * Math.sin(angle) });
    }

    const polyContour = [];
    for (let i = 0; i < N; i++) {
      const p1 = outerVertices[i];
      const p2 = outerVertices[(i + 1) % N];
      const edgePts = generatePolyCapEdgePoints(p1, p2, sideLen, fingerDepth, tabSize, T, K);
      edgePts.forEach(pt => polyContour.push(pt));
    }

    const wallPolygon = buildPolyWallPolygon(sideLen, H, fingerDepth, state.hasLid !== false, tabSize, T, K);
    return { N, R, rOut, H, T, sideLen, fingerDepth, wallWidth, outerVertices, polyContour: cleanPolygonPoints(polyContour), wallPolygon };
  }

  function getHingeData() {
    const W = state.hingeW;
    const H = state.hingeH;
    const D = state.hingeD;
    const R = Math.min(state.hingeRadius, Math.min(W, D) * 0.45);
    const T = state.thickness;
    const arcLen = (Math.PI / 2) * R;
    const straightX = Math.max(10, W - 2 * R);
    const straightZ = Math.max(10, D - 2 * R);
    const totalWrapperLen = 2 * straightX + 2 * straightZ + 4 * arcLen;

    const capPts = [];
    const steps = 12;
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

    const hingeZones = [];
    let curOffset = straightX;
    hingeZones.push({ start: curOffset, width: arcLen });
    curOffset += arcLen + straightZ;
    hingeZones.push({ start: curOffset, width: arcLen });
    curOffset += arcLen + straightX;
    hingeZones.push({ start: curOffset, width: arcLen });
    curOffset += arcLen + straightZ;
    hingeZones.push({ start: curOffset, width: arcLen });

    return { W, H, D, R, T, capPts, totalWrapperLen, hingeZones };
  }

  // ==========================================================================
  // MOTOR 3D (Three.js com Rotação da Tampa em Torno da Dobradiça)
  // ==========================================================================
  let scene, camera, renderer, controls, mainMeshGroup;

  function initThreeScene() {
    const container = DOM.canvasContainer;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c14);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 3500);
    camera.position.set(240, 200, 280);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 0.9);
    dirLight1.position.set(200, 300, 200);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.45);
    dirLight2.position.set(-200, -100, -200);
    scene.add(dirLight2);

    const gridHelper = new THREE.GridHelper(500, 50, 0x1f293d, 0x0f172a);
    gridHelper.position.y = -100;
    scene.add(gridHelper);

    mainMeshGroup = new THREE.Group();
    scene.add(mainMeshGroup);

    function animate() {
      requestAnimationFrame(animate);
      if (state.autoRotate) {
        mainMeshGroup.rotation.y += 0.006;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    const container = DOM.canvasContainer;
    if (!container || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function getThreeMaterial() {
    switch (state.materialType) {
      case 'acrylic':
        return new THREE.MeshPhysicalMaterial({
          color: 0x93c5fd, transparent: true, opacity: 0.6,
          roughness: 0.1, transmission: 0.85, thickness: 1.5, side: THREE.DoubleSide
        });
      case 'dark':
        return new THREE.MeshStandardMaterial({
          color: 0x1e293b, metalness: 0.8, roughness: 0.3, side: THREE.DoubleSide
        });
      case 'wood':
      default:
        return new THREE.MeshStandardMaterial({
          color: 0xd4a373, roughness: 0.65, metalness: 0.05, side: THREE.DoubleSide
        });
    }
  }

  function update3DScene() {
    if (!mainMeshGroup) return;

    while (mainMeshGroup.children.length > 0) {
      const child = mainMeshGroup.children[0];
      if (child.geometry) child.geometry.dispose();
      mainMeshGroup.remove(child);
    }

    const meshMaterial = getThreeMaterial();
    const edgeColor = state.materialType === 'acrylic' ? 0x38bdf8 : (state.materialType === 'dark' ? 0x00f0ff : 0x78350f);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: edgeColor, linewidth: 1.5 });
    const exploded = state.exploded;
    const lidRad = (state.lidAngle * Math.PI) / 180; // Ângulo da dobradiça em radianos

    // --- MODO 1: CAIXA RETANGULAR (COM DOBRADIÇA) ---
    if (state.boxModel === 'rect') {
      const facesData = getRectFacesData();
      const { W, H, D, T } = getEffectiveDimensions();
      const isPinHingeActive = (state.lidType === 'pin_hinge') && (state.hasLid !== false) && (lidRad > 0) && (exploded === 0);
      let pinLidGroup = null;
      let pinPivotY = 0;
      let pinPivotZ = 0;

      if (isPinHingeActive) {
        const params = getMakerCaseHingeParams(W, H, D, T);
        pinPivotY = params.pinPivotY;
        pinPivotZ = params.pinPivotZ;
        pinLidGroup = new THREE.Group();
        pinLidGroup.position.set(0, pinPivotY, pinPivotZ);
      }

      Object.keys(facesData).forEach(faceKey => {
        const face = facesData[faceKey];
        if (!face.enabled) return;

        const shape = new THREE.Shape();
        const pts = face.polygon;
        if (pts.length === 0) return;

        const cx = face.width / 2;
        const cy = face.height / 2;

        shape.moveTo(pts[0].x - cx, pts[0].y - cy);
        for (let i = 1; i < pts.length; i++) {
          shape.lineTo(pts[i].x - cx, pts[i].y - cy);
        }
        shape.closePath();

        face.internalHoles.forEach(h => {
          const holePath = new THREE.Path();
          const hx = h.x - cx;
          const hy = h.y - cy;
          if (h.type === 'circle') {
            holePath.absarc(hx, hy, h.r, 0, Math.PI * 2, true);
          } else if (h.type === 'rect') {
            holePath.moveTo(hx, hy);
            holePath.lineTo(hx + h.w, hy);
            holePath.lineTo(hx + h.w, hy + h.h);
            holePath.lineTo(hx, hy + h.h);
            holePath.closePath();
          } else if (h.type === 'tslot_cross') {
            const sw = h.shaftW / 2; const nw = h.nutW / 2; const ny = hy + h.shaftL;
            holePath.moveTo(hx - sw, hy);
            holePath.lineTo(hx + sw, hy);
            holePath.lineTo(hx + sw, ny);
            holePath.lineTo(hx + nw, ny);
            holePath.lineTo(hx + nw, ny + h.nutH);
            holePath.lineTo(hx - nw, ny + h.nutH);
            holePath.lineTo(hx - nw, ny);
            holePath.lineTo(hx - sw, ny);
            holePath.closePath();
          }
          shape.holes.push(holePath);
        });

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
        geometry.translate(0, 0, -T);

        // --- ROTAÇÃO ARTICULADA DA TAMPA: LIVING HINGE ---
        if (faceKey === 'top' && state.lidType === 'living_hinge' && lidRad > 0 && exploded === 0) {
          const pivotY = H / 2;
          const pivotZ = -D / 2;
          const lhPivotGroup = new THREE.Group();
          lhPivotGroup.position.set(0, pivotY, pivotZ);

          const lidMesh = new THREE.Mesh(geometry, meshMaterial);
          lidMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), edgeMaterial));
          lidMesh.rotation.set(-Math.PI / 2, 0, 0);
          lidMesh.position.set(0, 0, D / 2);

          lhPivotGroup.add(lidMesh);
          lhPivotGroup.rotation.x = -lidRad;
          mainMeshGroup.add(lhPivotGroup);
          return;
        }

        // --- ROTAÇÃO ARTICULADA DA TAMPA CONCHA: MAKERCASE PIN HINGE ---
        if (face.isLid && isPinHingeActive && pinLidGroup) {
          const mesh = new THREE.Mesh(geometry, meshMaterial);
          mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), edgeMaterial));
          mesh.rotation.set(face.rot3D[0], face.rot3D[1], face.rot3D[2]);
          mesh.position.set(face.pos3D[0], face.pos3D[1] - pinPivotY, face.pos3D[2] - pinPivotZ);
          pinLidGroup.add(mesh);
          return;
        }

        const mesh = new THREE.Mesh(geometry, meshMaterial);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), edgeMaterial));
        mesh.rotation.set(face.rot3D[0], face.rot3D[1], face.rot3D[2]);

        const nx = face.normal[0];
        const ny = face.normal[1];
        const nz = face.normal[2];
        mesh.position.set(face.pos3D[0] + nx * exploded, face.pos3D[1] + ny * exploded, face.pos3D[2] + nz * exploded);
        mainMeshGroup.add(mesh);
      });

      if (pinLidGroup) {
        pinLidGroup.rotation.x = -lidRad;
        mainMeshGroup.add(pinLidGroup);
      }

      // Divisórias Internas
      if (exploded === 0) {
        const divMat = new THREE.MeshStandardMaterial({
          color: state.materialType === 'wood' ? 0xb5824c : 0x334155, roughness: 0.6, side: THREE.DoubleSide
        });
        if (state.divX > 0) {
          const stepX = (W - 2 * T) / (state.divX + 1);
          for (let i = 1; i <= state.divX; i++) {
            const divMesh = new THREE.Mesh(new THREE.BoxGeometry(T, H - 2 * T, D - 2 * T), divMat);
            divMesh.position.set(-W / 2 + T + i * stepX, 0, 0);
            mainMeshGroup.add(divMesh);
          }
        }
        if (state.divY > 0) {
          const stepY = (D - 2 * T) / (state.divY + 1);
          for (let j = 1; j <= state.divY; j++) {
            const divMesh = new THREE.Mesh(new THREE.BoxGeometry(W - 2 * T, H - 2 * T, T), divMat);
            divMesh.position.set(0, 0, -D / 2 + T + j * stepY);
            mainMeshGroup.add(divMesh);
          }
        }
      }
    }

    // --- MODO 2: CAIXA POLIGONAL ---
    else if (state.boxModel === 'poly') {
      const poly = getPolyData();
      const { N, R, rOut, H, T, wallWidth, polyContour, wallPolygon } = poly;

      const polyCaps = state.hasLid ? ['bottom', 'top'] : ['bottom'];
      polyCaps.forEach(type => {
        const shape = new THREE.Shape();
        shape.moveTo(polyContour[0].x - rOut, polyContour[0].y - rOut);
        for (let i = 1; i < polyContour.length; i++) shape.lineTo(polyContour[i].x - rOut, polyContour[i].y - rOut);
        shape.closePath();

        const geom = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
        geom.translate(0, 0, -T / 2);
        const mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom, 25), edgeMaterial));
        mesh.rotation.x = Math.PI / 2;

        const baseCapY = (type === 'bottom') ? (-H / 2 + T / 2) : (H / 2 - T / 2);
        const yPos = baseCapY + (type === 'bottom' ? -exploded : exploded);
        mesh.position.set(0, yPos, 0);
        mainMeshGroup.add(mesh);
      });

      const wallShape = new THREE.Shape();
      if (wallPolygon && wallPolygon.length > 0) {
        const wCx = wallWidth / 2;
        const wCy = H / 2;
        wallShape.moveTo(wallPolygon[0].x - wCx, wallPolygon[0].y - wCy);
        for (let j = 1; j < wallPolygon.length; j++) {
          wallShape.lineTo(wallPolygon[j].x - wCx, wallPolygon[j].y - wCy);
        }
        wallShape.closePath();
      }
      const wallGeom = new THREE.ExtrudeGeometry(wallShape, { depth: T, bevelEnabled: false });
      wallGeom.translate(0, 0, -T / 2);
      const wallEdgesGeom = new THREE.EdgesGeometry(wallGeom, 25);

      for (let i = 0; i < N; i++) {
        const wallMesh = new THREE.Mesh(wallGeom, meshMaterial);
        wallMesh.add(new THREE.LineSegments(wallEdgesGeom, edgeMaterial));

        const angle = (i * 2 * Math.PI) / N + Math.PI / N;
        const distFromCenter = R * Math.cos(Math.PI / N) + T / 2 + exploded;

        wallMesh.position.set(Math.cos(angle) * distFromCenter, 0, Math.sin(angle) * distFromCenter);
        wallMesh.rotation.y = -angle + Math.PI / 2;
        mainMeshGroup.add(wallMesh);
      }
    }

    // --- MODO 3: CANTOS CURVOS (LIVING HINGE) ---
    else if (state.boxModel === 'hinge') {
      const hData = getHingeData();
      const { W, H, D, T, capPts } = hData;

      const hingeCaps = state.hasLid ? ['bottom', 'top'] : ['bottom'];
      hingeCaps.forEach(type => {
        const shape = new THREE.Shape();
        shape.moveTo(capPts[0].x - W / 2, capPts[0].y - D / 2);
        for (let i = 1; i < capPts.length; i++) shape.lineTo(capPts[i].x - W / 2, capPts[i].y - D / 2);
        shape.closePath();

        const geom = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
        geom.translate(0, 0, -T / 2);
        const mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom, 25), edgeMaterial));
        mesh.rotation.x = Math.PI / 2;

        const yPos = (type === 'bottom' ? -H / 2 : H / 2) + (type === 'bottom' ? -exploded : exploded);
        mesh.position.set(0, yPos, 0);
        mainMeshGroup.add(mesh);
      });

      const bodyShape = new THREE.Shape();
      bodyShape.moveTo(capPts[0].x - W / 2, capPts[0].y - D / 2);
      for (let i = 1; i < capPts.length; i++) bodyShape.lineTo(capPts[i].x - W / 2, capPts[i].y - D / 2);
      bodyShape.closePath();

      const innerHole = new THREE.Path();
      innerHole.moveTo((capPts[0].x - W / 2) * 0.96, (capPts[0].y - D / 2) * 0.96);
      for (let i = 1; i < capPts.length; i++) innerHole.lineTo((capPts[i].x - W / 2) * 0.96, (capPts[i].y - D / 2) * 0.96);
      innerHole.closePath();
      bodyShape.holes.push(innerHole);

      const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, { depth: H - 2 * T, bevelEnabled: false });
      bodyGeom.translate(0, 0, -(H - 2 * T) / 2);
      const bodyMesh = new THREE.Mesh(bodyGeom, meshMaterial);
      bodyMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeom, 25), edgeMaterial));
      bodyMesh.rotation.x = Math.PI / 2;
      mainMeshGroup.add(bodyMesh);
    }
  }

  // ==========================================================================
  // MOTOR 2D (Chapa de Corte SVG / DXF / PDF com Dobradiças)
  // ==========================================================================

  function getCuttingItems() {
    const items = [];

    // --- 1. RETANGULAR COM DOBRADIÇA ---
    if (state.boxModel === 'rect') {
      const facesData = getRectFacesData();
      const { W, H, D, T } = getEffectiveDimensions();
      const isLivingHinge = (state.lidType === 'living_hinge') && state.hasLid;

      // Se for Living Hinge Contínua: funde Tampa + Parede Traseira com malha flexível
      if (isLivingHinge) {
        const hingeWidth = 20; // mm de faixa flexível
        const combinedH = D + hingeWidth + H;
        const hingeHoles = [];

        // Gera cortes do living hinge na faixa entre Tampa e Trás
        const slitSpacing = 2.5;
        const slitCount = Math.floor(hingeWidth / slitSpacing);
        for (let s = 0; s < slitCount; s++) {
          const slitY = D + s * slitSpacing;
          if (s % 2 === 0) hingeHoles.push({ type: 'rect', x: 0, y: slitY, w: W * 0.8, h: 0.2 });
          else hingeHoles.push({ type: 'rect', x: W * 0.2, y: slitY, w: W * 0.8, h: 0.2 });
        }

        const pts = [
          { x: 0, y: 0 }, { x: W, y: 0 },
          { x: W, y: combinedH }, { x: 0, y: combinedH }
        ];

        items.push({
          id: 'tampa-tras-unida',
          name: 'Tampa + Trás (Dobradiça Flexível)',
          width: W, height: combinedH,
          polygon: pts, holes: hingeHoles, isDivider: false
        });

        // Adiciona as outras 4 faces
        ['bottom', 'front', 'left', 'right'].forEach(key => {
          const f = facesData[key];
          if (f.enabled) items.push({ id: f.id, name: f.name, width: f.width, height: f.height, polygon: f.polygon, holes: f.internalHoles || [], isDivider: false });
        });
      } else {
        // Tampa Normal ou Tampa Articulada com Pinos
        Object.values(facesData).filter(f => f.enabled).forEach(face => {
          items.push({
            id: face.id, name: face.name, width: face.width, height: face.height,
            polygon: face.polygon, holes: face.internalHoles || [], isDivider: false
          });
        });
      }

      // Divisórias
      if (state.divX > 0) {
        const divW = D - 2 * T; const divH = H - 2 * T; const stepY = divW / (state.divY + 1);
        for (let i = 1; i <= state.divX; i++) {
          const slots = [];
          for (let j = 1; j <= state.divY; j++) slots.push({ x: j * stepY, y: divH / 2, w: T, h: divH / 2, direction: 'top' });
          items.push({ id: `div-x-${i}`, name: `Divisória X #${i}`, width: divW, height: divH, polygon: buildDividerPolygon(divW, divH, slots), holes: [], isDivider: true });
        }
      }
      if (state.divY > 0) {
        const divW = W - 2 * T; const divH = H - 2 * T; const stepX = divW / (state.divX + 1);
        for (let j = 1; j <= state.divY; j++) {
          const slots = [];
          for (let i = 1; i <= state.divX; i++) slots.push({ x: i * stepX, y: 0, w: T, h: divH / 2, direction: 'bottom' });
          items.push({ id: `div-y-${j}`, name: `Divisória Y #${j}`, width: divW, height: divH, polygon: buildDividerPolygon(divW, divH, slots), holes: [], isDivider: true });
        }
      }
    }

    // --- 2. POLIGONAL ---
    else if (state.boxModel === 'poly') {
      const poly = getPolyData();
      const { N, rOut, H, wallWidth, polyContour, wallPolygon } = poly;
      items.push({ id: 'poly-bottom', name: `Fundo (${N} Lados)`, width: 2 * rOut, height: 2 * rOut, polygon: polyContour, holes: [], isDivider: false });
      if (state.hasLid) {
        items.push({ id: 'poly-top', name: `Tampa (${N} Lados)`, width: 2 * rOut, height: 2 * rOut, polygon: polyContour, holes: [], isDivider: false });
      }
      for (let i = 1; i <= N; i++) {
        items.push({ id: `poly-wall-${i}`, name: `Parede #${i}`, width: wallWidth, height: H, polygon: wallPolygon, holes: [], isDivider: false });
      }
    }

    // --- 3. CANTOS CURVOS ---
    else if (state.boxModel === 'hinge') {
      const hData = getHingeData();
      const { W, H, D, capPts, totalWrapperLen, hingeZones } = hData;
      items.push({ id: 'hinge-bottom', name: 'Fundo Curvo', width: W, height: D, polygon: capPts, holes: [], isDivider: false });
      if (state.hasLid) {
        items.push({ id: 'hinge-top', name: 'Tampa Curva', width: W, height: D, polygon: capPts, holes: [], isDivider: false });
      }

      const halfLen = totalWrapperLen / 2;
      const hingeHoles = [];
      hingeZones.forEach(zone => {
        const slitSpacing = 2.5;
        const slitCount = Math.floor(zone.width / slitSpacing);
        for (let s = 0; s < slitCount; s++) {
          const slitX = zone.start + s * slitSpacing;
          if (slitX < halfLen) {
            if (s % 2 === 0) hingeHoles.push({ type: 'rect', x: slitX, y: 0, w: 0.2, h: H * 0.8 });
            else hingeHoles.push({ type: 'rect', x: slitX, y: H * 0.2, w: 0.2, h: H * 0.8 });
          }
        }
      });
      const wrapperPts = [{ x: 0, y: 0 }, { x: halfLen, y: 0 }, { x: halfLen, y: H }, { x: 0, y: H }];
      items.push({ id: 'hinge-wrap-1', name: 'Fita Flexível A (Living Hinge)', width: halfLen, height: H, polygon: wrapperPts, holes: hingeHoles, isDivider: false });
      items.push({ id: 'hinge-wrap-2', name: 'Fita Flexível B (Living Hinge)', width: halfLen, height: H, polygon: wrapperPts, holes: hingeHoles, isDivider: false });
    }

    return items;
  }

  function buildDividerPolygon(w, h, slots) {
    const pts = [];
    pts.push({ x: 0, y: 0 });
    if (slots.some(s => s.direction === 'bottom')) {
      slots.forEach(s => {
        pts.push({ x: s.x - s.w / 2, y: 0 });
        pts.push({ x: s.x - s.w / 2, y: s.h });
        pts.push({ x: s.x + s.w / 2, y: s.h });
        pts.push({ x: s.x + s.w / 2, y: 0 });
      });
    }
    pts.push({ x: w, y: 0 });
    pts.push({ x: w, y: h });
    if (slots.some(s => s.direction === 'top')) {
      slots.forEach(s => {
        pts.push({ x: s.x + s.w / 2, y: h });
        pts.push({ x: s.x + s.w / 2, y: h - s.h });
        pts.push({ x: s.x - s.w / 2, y: h - s.h });
        pts.push({ x: s.x - s.w / 2, y: h });
      });
    }
    pts.push({ x: 0, y: h });
    return pts;
  }

  function update2DTransform() {
    if (DOM.btnZoomReset) {
      DOM.btnZoomReset.textContent = `${Math.round(state.zoom2D * 100)}%`;
    }
    if (DOM.svgPreviewMount) {
      DOM.svgPreviewMount.style.transform = `translate(${state.pan2DX}px, ${state.pan2DY}px) scale(${state.zoom2D})`;
    }
  }

  function set2DZoom(newZoom) {
    state.zoom2D = Math.max(0.2, Math.min(4.0, parseFloat(newZoom.toFixed(2))));
    if (DOM.svgPreviewMount) {
      DOM.svgPreviewMount.style.transition = 'transform 0.08s ease-out';
    }
    update2DTransform();
  }

  function reset2DView() {
    state.zoom2D = 1.0;
    state.pan2DX = 0;
    state.pan2DY = 0;
    if (DOM.svgPreviewMount) {
      DOM.svgPreviewMount.style.transition = 'transform 0.15s ease-out';
    }
    update2DTransform();
  }

  function generate2DLayout() {
    const items = getCuttingItems();
    const margin = 10;
    const padding = 15;

    if (items.length === 0) {
      DOM.svgPreviewMount.innerHTML = '<p style="color:#64748b;padding:40px;">Nenhuma peça selecionada para corte.</p>';
      DOM.sheetAreaCalc.textContent = 'Nenhuma peça';
      return;
    }

    let currentX = padding;
    let currentY = padding;
    let maxRowHeight = 0;
    let sheetWidth = 0;
    let sheetHeight = 0;

    const placedPieces = [];
    const itemsPerRow = state.boxModel === 'poly' ? 4 : 3;

    items.forEach((item, index) => {
      const pW = item.width + state.thickness * 2;
      const pH = item.height + state.thickness * 2;

      if (index > 0 && index % itemsPerRow === 0) {
        currentX = padding;
        currentY += maxRowHeight + margin;
        maxRowHeight = 0;
      }

      placedPieces.push({ item, x: currentX, y: currentY, w: pW, h: pH });
      maxRowHeight = Math.max(maxRowHeight, pH);
      sheetWidth = Math.max(sheetWidth, currentX + pW + padding);
      sheetHeight = Math.max(sheetHeight, currentY + maxRowHeight + padding);
      currentX += pW + margin;
    });

    DOM.sheetAreaCalc.textContent = `Chapa mínima: ${Math.round(sheetWidth)} x ${Math.round(sheetHeight)} mm (${items.length} peças)`;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sheetWidth} ${sheetHeight}" width="${sheetWidth}mm" height="${sheetHeight}mm">`;
    svgContent += `<rect width="${sheetWidth}" height="${sheetHeight}" fill="#fafafa" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />`;

    placedPieces.forEach(p => {
      const { item, x, y } = p;
      const pts = item.polygon;

      let pathD = `M ${x + pts[0].x} ${y + pts[0].y}`;
      for (let i = 1; i < pts.length; i++) pathD += ` L ${x + pts[i].x} ${y + pts[i].y}`;
      pathD += ' Z';

      svgContent += `<path d="${pathD}" fill="${item.isDivider ? '#f0fdf4' : '#fff7ed'}" stroke="#ef4444" stroke-width="0.35" stroke-linejoin="round" />`;

      item.holes.forEach(h => {
        if (h.type === 'circle') {
          svgContent += `<circle cx="${x + h.x}" cy="${y + h.y}" r="${h.r}" fill="none" stroke="#10b981" stroke-width="0.35" />`;
        } else if (h.type === 'rect') {
          svgContent += `<rect x="${x + h.x}" y="${y + h.y}" width="${h.w}" height="${h.h}" fill="none" stroke="#10b981" stroke-width="0.35" />`;
        } else if (h.type === 'tslot_cross') {
          const sw = h.shaftW / 2; const nw = h.nutW / 2;
          const hx = x + h.x; const hy = y + h.y; const ny = hy + h.shaftL;
          let tD = `M ${hx - sw} ${hy} L ${hx + sw} ${hy} L ${hx + sw} ${ny} L ${hx + nw} ${ny} L ${hx + nw} ${ny + h.nutH} L ${hx - nw} ${ny + h.nutH} L ${hx - nw} ${ny} L ${hx - sw} ${ny} Z`;
          svgContent += `<path d="${tD}" fill="none" stroke="#10b981" stroke-width="0.35" />`;
        }
      });

      if (state.showLabels) {
        const textX = x + item.width / 2;
        const textY = y + item.height / 2;
        svgContent += `
          <text x="${textX}" y="${textY - 3}" fill="#2563eb" font-family="'Plus Jakarta Sans', sans-serif" font-size="4" font-weight="bold" text-anchor="middle">${item.name.toUpperCase()}</text>
          <text x="${textX}" y="${textY + 4}" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="3" text-anchor="middle">${Math.round(item.width)} x ${Math.round(item.height)} mm</text>
        `;
      }
    });

    svgContent += '</svg>';
    DOM.svgPreviewMount.innerHTML = svgContent;
    update2DTransform();
  }

  // ==========================================================================
  // EXPORTADORES (SVG, DXF e PDF)
  // ==========================================================================

  function exportCleanSVG() {
    const items = getCuttingItems();
    if (items.length === 0) return alert('Nenhuma peça para exportar!');

    const margin = 5; const padding = 10;
    let currentX = padding; let currentY = padding;
    let maxRowHeight = 0; let sheetWidth = 0; let sheetHeight = 0;
    const placedPieces = [];
    const itemsPerRow = state.boxModel === 'poly' ? 4 : 3;

    items.forEach((item, index) => {
      const pW = item.width + state.thickness * 2;
      const pH = item.height + state.thickness * 2;
      if (index > 0 && index % itemsPerRow === 0) {
        currentX = padding; currentY += maxRowHeight + margin; maxRowHeight = 0;
      }
      placedPieces.push({ item, x: currentX, y: currentY, w: pW, h: pH });
      maxRowHeight = Math.max(maxRowHeight, pH);
      sheetWidth = Math.max(sheetWidth, currentX + pW + padding);
      sheetHeight = Math.max(sheetHeight, currentY + maxRowHeight + padding);
      currentX += pW + margin;
    });

    let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
    svg += `<!-- Gerado por PobreCase PRO 3.5 com Dobradiças (cook45 & will) -->\n`;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetWidth}mm" height="${sheetHeight}mm" viewBox="0 0 ${sheetWidth} ${sheetHeight}">\n`;

    svg += `  <g id="FUROS_E_DOBRADICAS" stroke="#00FF00" stroke-width="0.01mm" fill="none">\n`;
    placedPieces.forEach(p => {
      p.item.holes.forEach(h => {
        if (h.type === 'circle') svg += `    <circle cx="${p.x + h.x}" cy="${p.y + h.y}" r="${h.r}" />\n`;
        else if (h.type === 'rect') svg += `    <rect x="${p.x + h.x}" y="${p.y + h.y}" width="${h.w}" height="${h.h}" />\n`;
        else if (h.type === 'tslot_cross') {
          const sw = h.shaftW / 2; const nw = h.nutW / 2; const hx = p.x + h.x; const hy = p.y + h.y; const ny = hy + h.shaftL;
          svg += `    <path d="M ${hx - sw} ${hy} L ${hx + sw} ${hy} L ${hx + sw} ${ny} L ${hx + nw} ${ny} L ${hx + nw} ${ny + h.nutH} L ${hx - nw} ${ny + h.nutH} L ${hx - nw} ${ny} L ${hx - sw} ${ny} Z" />\n`;
        }
      });
    });
    svg += `  </g>\n`;

    svg += `  <g id="CORTE_EXTERNO" stroke="#FF0000" stroke-width="0.01mm" fill="none">\n`;
    placedPieces.forEach(p => {
      const pts = p.item.polygon;
      let pathD = `M ${p.x + pts[0].x} ${p.y + pts[0].y}`;
      for (let i = 1; i < pts.length; i++) pathD += ` L ${p.x + pts[i].x} ${p.y + pts[i].y}`;
      pathD += ' Z';
      svg += `    <path d="${pathD}" id="${p.item.id}" />\n`;
    });
    svg += `  </g>\n`;

    if (state.showLabels) {
      svg += `  <g id="GRAVACAO_TEXTOS" fill="#0000FF" font-family="sans-serif" font-size="3.5">\n`;
      placedPieces.forEach(p => {
        svg += `    <text x="${p.x + p.item.width / 2}" y="${p.y + p.item.height / 2}" text-anchor="middle">${p.item.name}</text>\n`;
      });
      svg += `  </g>\n`;
    }

    svg += `</svg>`;
    downloadFile(svg, `pobre-case-${state.boxModel}-dobradica.svg`, 'image/svg+xml');
  }

  function exportCleanDXF() {
    const items = getCuttingItems();
    if (items.length === 0) return alert('Nenhuma peça para exportar!');

    const margin = 5; const padding = 10;
    let currentX = padding; let currentY = padding; let maxRowHeight = 0;
    const placedPieces = [];
    const itemsPerRow = state.boxModel === 'poly' ? 4 : 3;

    items.forEach((item, index) => {
      const pW = item.width + state.thickness * 2;
      const pH = item.height + state.thickness * 2;
      if (index > 0 && index % itemsPerRow === 0) {
        currentX = padding; currentY += maxRowHeight + margin; maxRowHeight = 0;
      }
      placedPieces.push({ item, x: currentX, y: currentY });
      maxRowHeight = Math.max(maxRowHeight, pH);
      currentX += pW + margin;
    });

    let dxf = '0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n0\nENDSEC\n';
    dxf += '0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n2\n';
    dxf += '0\nLAYER\n2\nCORTE\n70\n0\n62\n1\n6\nCONTINUOUS\n';
    dxf += '0\nLAYER\n2\nFUROS\n70\n0\n62\n3\n6\nCONTINUOUS\n';
    dxf += '0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n';

    placedPieces.forEach(p => {
      const pts = p.item.polygon;
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        dxf += '0\nLINE\n8\nCORTE\n';
        dxf += `10\n${(p.x + p1.x).toFixed(4)}\n20\n${(p.y + p1.y).toFixed(4)}\n30\n0.0\n`;
        dxf += `11\n${(p.x + p2.x).toFixed(4)}\n21\n${(p.y + p2.y).toFixed(4)}\n31\n0.0\n`;
      }
      p.item.holes.forEach(h => {
        if (h.type === 'circle') {
          dxf += '0\nCIRCLE\n8\nFUROS\n';
          dxf += `10\n${(p.x + h.x).toFixed(4)}\n20\n${(p.y + h.y).toFixed(4)}\n30\n0.0\n`;
          dxf += `40\n${h.r.toFixed(4)}\n`;
        } else if (h.type === 'rect') {
          const x0 = p.x + h.x; const y0 = p.y + h.y;
          const x1 = x0 + h.w; const y1 = y0 + h.h;
          const rectLines = [
            [x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]
          ];
          rectLines.forEach(l => {
            dxf += '0\nLINE\n8\nFUROS\n';
            dxf += `10\n${l[0].toFixed(4)}\n20\n${l[1].toFixed(4)}\n30\n0.0\n`;
            dxf += `11\n${l[2].toFixed(4)}\n21\n${l[3].toFixed(4)}\n31\n0.0\n`;
          });
        }
      });
    });

    dxf += '0\nENDSEC\n0\nEOF\n';
    downloadFile(dxf, `pobre-case-${state.boxModel}-dobradica.dxf`, 'application/dxf');
  }

  function exportCleanPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) return alert('jsPDF não carregado.');
    const items = getCuttingItems();
    if (items.length === 0) return alert('Nenhuma peça para exportar!');

    const margin = 8; const padding = 15;
    let currentX = padding; let currentY = padding;
    let maxRowHeight = 0; let sheetWidth = 0; let sheetHeight = 0;
    const placedPieces = [];
    const itemsPerRow = state.boxModel === 'poly' ? 4 : 3;

    items.forEach((item, index) => {
      const pW = item.width + state.thickness * 2;
      const pH = item.height + state.thickness * 2;
      if (index > 0 && index % itemsPerRow === 0) {
        currentX = padding; currentY += maxRowHeight + margin; maxRowHeight = 0;
      }
      placedPieces.push({ item, x: currentX, y: currentY, w: pW, h: pH });
      maxRowHeight = Math.max(maxRowHeight, pH);
      sheetWidth = Math.max(sheetWidth, currentX + pW + padding);
      sheetHeight = Math.max(sheetHeight, currentY + maxRowHeight + padding);
      currentX += pW + margin;
    });

    const doc = new window.jspdf.jsPDF({
      orientation: sheetWidth > sheetHeight ? 'l' : 'p', unit: 'mm',
      format: [Math.max(210, sheetWidth + 20), Math.max(297, sheetHeight + 20)]
    });

    placedPieces.forEach(p => {
      const pts = p.item.polygon;
      doc.setDrawColor(255, 0, 0); doc.setLineWidth(0.1);
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i]; const p2 = pts[(i + 1) % pts.length];
        doc.line(p.x + p1.x, p.y + p1.y, p.x + p2.x, p.y + p2.y);
      }
      doc.setDrawColor(0, 180, 0);
      p.item.holes.forEach(h => {
        if (h.type === 'circle') doc.circle(p.x + h.x, p.y + h.y, h.r);
        else if (h.type === 'rect') doc.rect(p.x + h.x, p.y + h.y, h.w, h.h);
      });
      if (state.showLabels) {
        doc.setTextColor(0, 0, 255); doc.setFontSize(8);
        doc.text(p.item.name, p.x + p.item.width / 2, p.y + p.item.height / 2, { align: 'center' });
      }
    });

    doc.save(`pobre-case-${state.boxModel}-dobradica.pdf`);
  }

  function downloadFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ==========================================================================
  // SINCRONIZAÇÃO E EVENT HANDLERS
  // ==========================================================================

  function syncAllViews() {
    const isPinHingeActive = (state.hasLid !== false) && (state.boxModel === 'rect') && (state.lidType === 'pin_hinge');

    if (state.boxModel === 'rect') {
      DOM.hudDims.textContent = `${state.width} x ${state.height} x ${state.depth} mm`;
      let lidName = '📦 Removível';
      if (!state.hasLid) lidName = '📭 Sem Tampa (Aberta)';
      else if (state.lidType === 'pin_hinge') lidName = (state.hingeAxleType === 'wood_cam') ? '🚪 MakerCase 100% Madeira' : '🚪 Dobradiça com Pinos M3';
      else if (state.lidType === 'living_hinge') lidName = '📜 Dobradiça Flexível';
      DOM.hudLid.textContent = lidName;
    } else if (state.boxModel === 'poly') {
      DOM.hudDims.textContent = `${POLY_NAMES[state.polySides]} (R=${state.polyRadius}mm, H=${state.polyHeight}mm)`;
      DOM.hudLid.textContent = state.hasLid ? '⬡ Poligonal 360°' : '⬡ Aberta (Sem Tampa)';
    } else if (state.boxModel === 'hinge') {
      DOM.hudDims.textContent = `${state.hingeW} x ${state.hingeH} x ${state.hingeD} mm`;
      DOM.hudLid.textContent = state.hasLid ? '🔄 Cantos Curvos' : '🔄 Aberta (Sem Tampa)';
    }

    DOM.rowLidOpen.style.display = (state.hasLid && state.boxModel === 'rect' && state.lidType !== 'removable') ? 'flex' : 'none';
    if (DOM.groupLidType) {
      DOM.groupLidType.style.display = state.hasLid ? 'block' : 'none';
    }
    if (DOM.groupPinHingeParams) {
      DOM.groupPinHingeParams.style.display = isPinHingeActive ? 'block' : 'none';
    }
    if (DOM.rowHingeClearance) {
      DOM.rowHingeClearance.style.display = (isPinHingeActive && state.hingeAxleType === 'wood_cam') ? 'block' : 'none';
    }
    if (DOM.inpHingeLidH) {
      const maxLidH = Math.max(10, Math.round(state.height - 15));
      DOM.inpHingeLidH.max = maxLidH;
      DOM.rangeHingeLidH.max = maxLidH;
      if (state.hingeLidHeight > maxLidH) {
        state.hingeLidHeight = maxLidH;
        DOM.inpHingeLidH.value = maxLidH;
        DOM.rangeHingeLidH.value = maxLidH;
      }
    }

    update3DScene();
    generate2DLayout();
    renderCutoutsList();
  }

  function updateActiveModelUI() {
    DOM.cardParamsRect.style.display = state.boxModel === 'rect' ? 'block' : 'none';
    DOM.cardParamsPoly.style.display = state.boxModel === 'poly' ? 'block' : 'none';
    DOM.cardParamsHinge.style.display = state.boxModel === 'hinge' ? 'block' : 'none';
    DOM.cardLidHinge.style.display = state.boxModel === 'rect' ? 'block' : 'none';
    DOM.cardDividers.style.display = state.boxModel === 'rect' ? 'block' : 'none';
    DOM.cardCutouts.style.display = state.boxModel === 'rect' ? 'block' : 'none';
    DOM.groupJointTypes.style.display = state.boxModel === 'rect' ? 'block' : 'none';

    syncAllViews();
  }

  function renderCutoutsList() {
    DOM.cutoutsContainer.querySelectorAll('.cutout-item').forEach(el => el.remove());
    if (state.cutouts.length === 0) {
      DOM.emptyCutoutsMsg.style.display = 'block';
      return;
    }
    DOM.emptyCutoutsMsg.style.display = 'none';

    state.cutouts.forEach(c => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cutout-item';
      itemEl.innerHTML = `
        <div class="cutout-header">
          <span class="cutout-title">${c.type === 'circle' ? '⭕ Círculo' : '⬛ Retângulo'} (${c.face.toUpperCase()})</span>
          <button class="cutout-btn-del" title="Excluir furo">✕</button>
        </div>
        <div class="cutout-fields-grid">
          <div class="cutout-field-wrap">
            <label>Face:</label>
            <select class="cutout-input sel-face">
              <option value="front" ${c.face === 'front' ? 'selected' : ''}>Frente</option>
              <option value="back" ${c.face === 'back' ? 'selected' : ''}>Trás</option>
              <option value="top" ${c.face === 'top' ? 'selected' : ''}>Tampa</option>
              <option value="bottom" ${c.face === 'bottom' ? 'selected' : ''}>Fundo</option>
              <option value="left" ${c.face === 'left' ? 'selected' : ''}>Esquerda</option>
              <option value="right" ${c.face === 'right' ? 'selected' : ''}>Direita</option>
            </select>
          </div>
          <div class="cutout-field-wrap">
            <label>${c.type === 'circle' ? 'Diâmetro (mm):' : 'Largura x Altura:'}</label>
            <input type="number" class="cutout-input inp-size" value="${c.sizeX}" min="2" max="200" step="1">
          </div>
        </div>
      `;
      itemEl.querySelector('.cutout-btn-del').addEventListener('click', () => {
        state.cutouts = state.cutouts.filter(x => x.id !== c.id);
        syncAllViews();
      });
      itemEl.querySelector('.sel-face').addEventListener('change', e => {
        c.face = e.target.value;
        syncAllViews();
      });
      itemEl.querySelector('.inp-size').addEventListener('input', e => {
        c.sizeX = parseFloat(e.target.value) || 10;
        c.sizeY = c.sizeX;
        syncAllViews();
      });
      DOM.cutoutsContainer.appendChild(itemEl);
    });
  }

  function setupEventListeners() {
    // Seletor de Tipo de Caixa (Unificado)
    DOM.boxTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        const model = radio.dataset.model;
        state.boxModel = model;

        if (radio.dataset.haslid === 'no') {
          state.hasLid = false;
          const noLidRadio = document.querySelector('input[name="hasLid"][value="no"]');
          if (noLidRadio) noLidRadio.checked = true;
        } else {
          state.hasLid = true;
          const yesLidRadio = document.querySelector('input[name="hasLid"][value="yes"]');
          if (yesLidRadio) yesLidRadio.checked = true;
        }

        if (radio.dataset.lid) {
          state.lidType = radio.dataset.lid;
          const lidInput = document.querySelector(`input[name="lidType"][value="${state.lidType}"]`);
          if (lidInput) lidInput.checked = true;
          if (state.lidType === 'pin_hinge') {
            DOM.lidHelperText.textContent = 'A tampa tem abas traseiras com furos para pino/parafuso M3, permitindo abrir e fechar livremente.';
          } else if (state.lidType === 'living_hinge') {
            DOM.lidHelperText.textContent = 'A tampa e a parede traseira formam uma peça única com malha de corte flexível integrada.';
          } else {
            DOM.lidHelperText.textContent = 'Tampa solta convencional que encaixa com dentes ou borda lisa.';
          }
        }

        if (model === 'rect') {
          state.width = parseFloat(radio.dataset.w);
          state.height = parseFloat(radio.dataset.h);
          state.depth = parseFloat(radio.dataset.d);
          state.thickness = parseFloat(radio.dataset.t);
          DOM.inpWidth.value = state.width; DOM.rangeWidth.value = state.width;
          DOM.inpHeight.value = state.height; DOM.rangeHeight.value = state.height;
          DOM.inpDepth.value = state.depth; DOM.rangeDepth.value = state.depth;
          DOM.inpThickness.value = state.thickness;
        } else if (model === 'poly') {
          state.polySides = parseInt(radio.dataset.sides);
          state.polyRadius = parseFloat(radio.dataset.radius);
          state.polyHeight = parseFloat(radio.dataset.h);
          state.thickness = parseFloat(radio.dataset.t);
          DOM.inpPolySides.value = state.polySides; DOM.rangePolySides.value = state.polySides;
          DOM.inpPolyRadius.value = state.polyRadius; DOM.rangePolyRadius.value = state.polyRadius;
          DOM.inpPolyHeight.value = state.polyHeight; DOM.rangePolyHeight.value = state.polyHeight;
          DOM.inpThickness.value = state.thickness;
          DOM.polyNameBadge.textContent = POLY_NAMES[state.polySides];
        } else if (model === 'hinge') {
          state.hingeW = parseFloat(radio.dataset.w);
          state.hingeH = parseFloat(radio.dataset.h);
          state.hingeD = parseFloat(radio.dataset.d);
          state.hingeRadius = parseFloat(radio.dataset.radius);
          state.thickness = parseFloat(radio.dataset.t);
          DOM.inpHingeW.value = state.hingeW; DOM.rangeHingeW.value = state.hingeW;
          DOM.inpHingeH.value = state.hingeH; DOM.rangeHingeH.value = state.hingeH;
          DOM.inpHingeD.value = state.hingeD; DOM.rangeHingeD.value = state.hingeD;
          DOM.inpHingeRadius.value = state.hingeRadius; DOM.rangeHingeRadius.value = state.hingeRadius;
          DOM.inpThickness.value = state.thickness;
        }

        updateActiveModelUI();
      });
    });

    // Seletor Com Tampa vs Sem Tampa
    DOM.hasLidRadios.forEach(radio => {
      radio.addEventListener('change', e => {
        state.hasLid = (e.target.value === 'yes');
        syncAllViews();
      });
    });

    // Tipo de Tampa / Dobradiça
    DOM.lidRadios.forEach(radio => {
      radio.addEventListener('change', e => {
        state.lidType = e.target.value;
        if (state.lidType === 'pin_hinge') {
          DOM.lidHelperText.textContent = 'A tampa tem braços externos que abraçam a caixa com rotação no pivô lateral.';
        } else if (state.lidType === 'living_hinge') {
          DOM.lidHelperText.textContent = 'A tampa e a parede traseira formam uma peça única com malha de corte flexível integrada.';
        } else {
          DOM.lidHelperText.textContent = 'Tampa solta convencional que encaixa com dentes ou borda lisa.';
        }
        syncAllViews();
      });
    });

    // Controles da Dobradiça MakerCase
    if (DOM.inpHingeLidH && DOM.rangeHingeLidH) {
      DOM.inpHingeLidH.addEventListener('input', e => {
        state.hingeLidHeight = parseFloat(e.target.value) || 10;
        DOM.rangeHingeLidH.value = state.hingeLidHeight;
        syncAllViews();
      });
      DOM.rangeHingeLidH.addEventListener('input', e => {
        state.hingeLidHeight = parseFloat(e.target.value);
        DOM.inpHingeLidH.value = state.hingeLidHeight;
        syncAllViews();
      });
    }

    if (DOM.hingeAxleRadios) {
      DOM.hingeAxleRadios.forEach(radio => {
        radio.addEventListener('change', e => {
          state.hingeAxleType = e.target.value;
          if (DOM.rowHingeClearance) {
            DOM.rowHingeClearance.style.display = (state.hingeAxleType === 'wood_cam') ? 'block' : 'none';
          }
          if (DOM.hingeAxleHelperText) {
            DOM.hingeAxleHelperText.textContent = (state.hingeAxleType === 'wood_cam')
              ? 'Gera 2 buchas circulares Ø 10mm e 2 chavetas na chapa para montagem 100% corte a laser.'
              : 'Gera furos passantes de 3.2mm para montagem com parafusos M3 e porcas.';
          }
          syncAllViews();
        });
      });
    }

    if (DOM.inpHingeClearance && DOM.rangeHingeClearance) {
      DOM.inpHingeClearance.addEventListener('input', e => {
        state.hingeClearance = parseFloat(e.target.value) || 0.35;
        DOM.rangeHingeClearance.value = state.hingeClearance;
        syncAllViews();
      });
      DOM.rangeHingeClearance.addEventListener('input', e => {
        state.hingeClearance = parseFloat(e.target.value);
        DOM.inpHingeClearance.value = state.hingeClearance;
        syncAllViews();
      });
    }

    // Slider de Abertura da Dobradiça (0° a 105°)
    DOM.sliderLidAngle.addEventListener('input', e => {
      state.lidAngle = parseFloat(e.target.value) || 0;
      DOM.lidAngleDisplay.textContent = `${state.lidAngle}°`;
      update3DScene();
    });

    // Inputs Retangulares
    DOM.inpWidth.addEventListener('input', e => { state.width = parseFloat(e.target.value) || 30; DOM.rangeWidth.value = state.width; syncAllViews(); });
    DOM.rangeWidth.addEventListener('input', e => { state.width = parseFloat(e.target.value); DOM.inpWidth.value = state.width; syncAllViews(); });
    DOM.inpHeight.addEventListener('input', e => { state.height = parseFloat(e.target.value) || 30; DOM.rangeHeight.value = state.height; syncAllViews(); });
    DOM.rangeHeight.addEventListener('input', e => { state.height = parseFloat(e.target.value); DOM.inpHeight.value = state.height; syncAllViews(); });
    DOM.inpDepth.addEventListener('input', e => { state.depth = parseFloat(e.target.value) || 30; DOM.rangeDepth.value = state.depth; syncAllViews(); });
    DOM.rangeDepth.addEventListener('input', e => { state.depth = parseFloat(e.target.value); DOM.inpDepth.value = state.depth; syncAllViews(); });

    // Inputs Poligonal
    DOM.inpPolySides.addEventListener('input', e => {
      state.polySides = Math.max(3, Math.min(10, parseInt(e.target.value) || 6));
      DOM.rangePolySides.value = state.polySides;
      DOM.polyNameBadge.textContent = POLY_NAMES[state.polySides];
      syncAllViews();
    });
    DOM.rangePolySides.addEventListener('input', e => {
      state.polySides = parseInt(e.target.value);
      DOM.inpPolySides.value = state.polySides;
      DOM.polyNameBadge.textContent = POLY_NAMES[state.polySides];
      syncAllViews();
    });
    DOM.inpPolyRadius.addEventListener('input', e => { state.polyRadius = parseFloat(e.target.value) || 30; DOM.rangePolyRadius.value = state.polyRadius; syncAllViews(); });
    DOM.rangePolyRadius.addEventListener('input', e => { state.polyRadius = parseFloat(e.target.value); DOM.inpPolyRadius.value = state.polyRadius; syncAllViews(); });
    DOM.inpPolyHeight.addEventListener('input', e => { state.polyHeight = parseFloat(e.target.value) || 30; DOM.rangePolyHeight.value = state.polyHeight; syncAllViews(); });
    DOM.rangePolyHeight.addEventListener('input', e => { state.polyHeight = parseFloat(e.target.value); DOM.inpPolyHeight.value = state.polyHeight; syncAllViews(); });

    // Inputs Cantos Curvos
    DOM.inpHingeW.addEventListener('input', e => { state.hingeW = parseFloat(e.target.value) || 50; DOM.rangeHingeW.value = state.hingeW; syncAllViews(); });
    DOM.rangeHingeW.addEventListener('input', e => { state.hingeW = parseFloat(e.target.value); DOM.inpHingeW.value = state.hingeW; syncAllViews(); });
    DOM.inpHingeH.addEventListener('input', e => { state.hingeH = parseFloat(e.target.value) || 30; DOM.rangeHingeH.value = state.hingeH; syncAllViews(); });
    DOM.rangeHingeH.addEventListener('input', e => { state.hingeH = parseFloat(e.target.value); DOM.inpHingeH.value = state.hingeH; syncAllViews(); });
    DOM.inpHingeD.addEventListener('input', e => { state.hingeD = parseFloat(e.target.value) || 50; DOM.rangeHingeD.value = state.hingeD; syncAllViews(); });
    DOM.rangeHingeD.addEventListener('input', e => { state.hingeD = parseFloat(e.target.value); DOM.inpHingeD.value = state.hingeD; syncAllViews(); });
    DOM.inpHingeRadius.addEventListener('input', e => { state.hingeRadius = parseFloat(e.target.value) || 10; DOM.rangeHingeRadius.value = state.hingeRadius; syncAllViews(); });
    DOM.rangeHingeRadius.addEventListener('input', e => { state.hingeRadius = parseFloat(e.target.value); DOM.inpHingeRadius.value = state.hingeRadius; syncAllViews(); });


    // Material & Encaixes
    DOM.inpThickness.addEventListener('input', e => { state.thickness = parseFloat(e.target.value) || 1.0; syncAllViews(); });
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.thickness = parseFloat(chip.dataset.thickness);
        DOM.inpThickness.value = state.thickness;
        syncAllViews();
      });
    });

    document.querySelectorAll('input[name="jointType"]').forEach(radio => {
      radio.addEventListener('change', e => {
        state.jointType = e.target.value;
        DOM.fingerSizeGroup.style.display = (state.jointType === 'finger') ? 'block' : 'none';
        DOM.tslotGroup.style.display = (state.jointType === 'tslot') ? 'block' : 'none';
        syncAllViews();
      });
    });

    DOM.selBoltSize.addEventListener('change', e => { state.boltSize = e.target.value; syncAllViews(); });
    DOM.inpBoltLen.addEventListener('input', e => { state.boltLength = parseFloat(e.target.value) || 12; syncAllViews(); });

    // Divisórias
    DOM.inpDivX.addEventListener('input', e => { state.divX = parseInt(e.target.value) || 0; DOM.rangeDivX.value = state.divX; syncAllViews(); });
    DOM.rangeDivX.addEventListener('input', e => { state.divX = parseInt(e.target.value); DOM.inpDivX.value = state.divX; syncAllViews(); });
    DOM.inpDivY.addEventListener('input', e => { state.divY = parseInt(e.target.value) || 0; DOM.rangeDivY.value = state.divY; syncAllViews(); });
    DOM.rangeDivY.addEventListener('input', e => { state.divY = parseInt(e.target.value); DOM.inpDivY.value = state.divY; syncAllViews(); });

    // Furos
    DOM.btnAddCutout.addEventListener('click', () => {
      state.cutouts.push({ id: 'cut_' + Date.now(), face: 'front', type: state.cutouts.length % 2 === 0 ? 'circle' : 'rect', sizeX: 16, sizeY: 16, posX: 0, posY: 0 });
      syncAllViews();
    });

    DOM.inpTabSize.addEventListener('input', e => { state.tabSize = parseFloat(e.target.value) || 5; DOM.rangeTabSize.value = state.tabSize; syncAllViews(); });
    DOM.rangeTabSize.addEventListener('input', e => { state.tabSize = parseFloat(e.target.value); DOM.inpTabSize.value = state.tabSize; syncAllViews(); });
    DOM.inpKerf.addEventListener('input', e => { state.kerf = parseFloat(e.target.value) || 0; DOM.rangeKerf.value = state.kerf; syncAllViews(); });
    DOM.rangeKerf.addEventListener('input', e => { state.kerf = parseFloat(e.target.value); DOM.inpKerf.value = state.kerf; syncAllViews(); });

    // Vista Explodida 3D
    DOM.sliderExploded.addEventListener('input', e => {
      state.exploded = parseFloat(e.target.value);
      DOM.explodedValDisplay.textContent = `${state.exploded} mm`;
      update3DScene();
    });

    // Materiais 3D
    DOM.matPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.matPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.materialType = pill.dataset.mat;
        update3DScene();
      });
    });

    DOM.btnAutoRotate.addEventListener('click', () => {
      state.autoRotate = !state.autoRotate;
      DOM.btnAutoRotate.classList.toggle('active', state.autoRotate);
    });

    DOM.btnResetCam.addEventListener('click', () => {
      camera.position.set(240, 200, 280);
      controls.target.set(0, 0, 0);
      controls.update();
      if (mainMeshGroup) mainMeshGroup.rotation.set(0, 0, 0);
    });

    // Abas
    DOM.tabBtn3D.addEventListener('click', () => {
      DOM.tabBtn3D.classList.add('active'); DOM.tabBtn2D.classList.remove('active');
      DOM.view3DWrapper.classList.add('active'); DOM.view2DWrapper.classList.remove('active');
      onWindowResize();
    });

    DOM.tabBtn2D.addEventListener('click', () => {
      DOM.tabBtn2D.classList.add('active'); DOM.tabBtn3D.classList.remove('active');
      DOM.view2DWrapper.classList.add('active'); DOM.view3DWrapper.classList.remove('active');
      generate2DLayout();
    });

    DOM.chkShowLabels.addEventListener('change', e => { state.showLabels = e.target.checked; generate2DLayout(); });
    DOM.btnZoomIn.addEventListener('click', () => { set2DZoom(state.zoom2D + 0.15); });
    DOM.btnZoomOut.addEventListener('click', () => { set2DZoom(state.zoom2D - 0.15); });
    DOM.btnZoomReset.addEventListener('click', reset2DView);

    // Zoom via Botão de Rolar do Mouse (Scroll Wheel) e Pan na Chapa 2D
    if (DOM.svgStage) {
      DOM.svgStage.addEventListener('wheel', e => {
        e.preventDefault();
        const zoomDelta = e.deltaY < 0 ? 0.12 : -0.12;
        set2DZoom(state.zoom2D + zoomDelta);
      }, { passive: false });

      let isPanning = false;
      let startX = 0;
      let startY = 0;
      let initialPanX = 0;
      let initialPanY = 0;

      DOM.svgStage.addEventListener('mousedown', e => {
        if (e.button !== 0 && e.button !== 1) return;
        isPanning = true;
        DOM.svgStage.classList.add('panning');
        if (DOM.svgPreviewMount) DOM.svgPreviewMount.style.transition = 'none';
        startX = e.clientX;
        startY = e.clientY;
        initialPanX = state.pan2DX;
        initialPanY = state.pan2DY;
      });

      window.addEventListener('mousemove', e => {
        if (!isPanning) return;
        state.pan2DX = initialPanX + (e.clientX - startX);
        state.pan2DY = initialPanY + (e.clientY - startY);
        update2DTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isPanning) {
          isPanning = false;
          if (DOM.svgStage) DOM.svgStage.classList.remove('panning');
          if (DOM.svgPreviewMount) DOM.svgPreviewMount.style.transition = 'transform 0.08s ease-out';
        }
      });
    }

    // Exportação
    DOM.btnExportSvg.addEventListener('click', exportCleanSVG);
    DOM.btnExportDxf.addEventListener('click', exportCleanDXF);
    DOM.btnExportPdf.addEventListener('click', exportCleanPDF);
  }

  // --- INICIALIZAÇÃO ---
  window.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    setupEventListeners();
    updateActiveModelUI();
    console.log('⚡ PobreCase PRO 3.5 com Dobradiças inicializado com sucesso.');
  });

})();
