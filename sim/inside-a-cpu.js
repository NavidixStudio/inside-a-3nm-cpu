/* =====================================================================
   NAVIDIX — INSIDE A 3NM CPU (EXPERIENCE 07)
   Multi-Scale Interactive 3D Hardware & Semiconductor Physics Lab

   5 TRUE PHYSICAL SCALES (15,000,000× ZOOM):
     01  45 mm   Package & Foveros 3D Chiplets (Explodable Brushed IHS,
                 160 SMD MLCC Caps, 144 Copper TSVs, Clickable 3nm Tiles)
     02   2 mm   System Orchestration & 5-Stage Pipeline (DDR5 RAM, PCIe
                 GPU, NVMe SSD, L3 Ring Bus, Steppable Machine Instructions)
     03 100 nm   Boolean Logic in Silicon (Live Interactive 4-Bit Ripple-
                 Carry Adder built from real XOR/AND/OR copper traces)
     04   3 nm   Atomic GAA / RibbonFET Nanosheet Transistor (3 stacked
                 ribbons, vibrating Si crystal lattice, real V_th channel
                 conduction & quantum tunneling leakage electrons)
     05  FLIR    Thermodynamics & Power Physics (Real 48x48 2D Heat PDE
                 solver, Ironbow FLIR map, P = a*C*V^2*f + I_leak(T)*V,
                 automatic 100 C PROCHOT thermal throttling)
   ===================================================================== */
(function (global) {
  'use strict';

  var THREE_SRC = './assets/three.min.js';
  var threePromise = null;

  function loadThree() {
    if (global.THREE) return Promise.resolve(global.THREE);
    if (threePromise) return threePromise;
    threePromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = THREE_SRC;
      s.async = true;
      s.onload = function () {
        global.THREE ? resolve(global.THREE) : reject(new Error('Three.js loaded without global THREE'));
      };
      s.onerror = function () { reject(new Error('Failed to load Three.js')); };
      document.head.appendChild(s);
    });
    return threePromise;
  }

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(global.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (_) { return false; }
  }

  var FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
  function fa(v) {
    return String(v).replace(/\d/g, function (d) { return FA_DIGITS[d]; }).replace(/\./g, '٫');
  }

  /* =====================================================================
     1. PROCEDURAL PHOTOREALISTIC SEMICONDUCTOR TEXTURES (ZERO EXTERNAL ASSETS)
     ===================================================================== */
  function makeIHSTextures(THREE) {
    var sz = 1024;
    var cCol = document.createElement('canvas');
    var cBmp = document.createElement('canvas');
    cCol.width = cBmp.width = sz;
    cCol.height = cBmp.height = sz;
    var g = cCol.getContext('2d');
    var gb = cBmp.getContext('2d');

    /* Brushed dark nickel-titanium metallic base */
    var bg = g.createLinearGradient(0, 0, sz, sz);
    bg.addColorStop(0, '#5A626F');
    bg.addColorStop(0.35, '#727B88');
    bg.addColorStop(0.65, '#4A515D');
    bg.addColorStop(1, '#636C79');
    g.fillStyle = bg;
    g.fillRect(0, 0, sz, sz);

    gb.fillStyle = '#808080';
    gb.fillRect(0, 0, sz, sz);

    /* Fine anisotropic horizontal brushed-metal micro-scratches */
    for (var i = 0; i < 2400; i++) {
      var y = Math.random() * sz;
      var x = Math.random() * sz;
      var w = 40 + Math.random() * 240;
      var a = 0.02 + Math.random() * 0.055;
      var bright = Math.random() > 0.5;
      g.fillStyle = bright ? 'rgba(255,255,255,' + a + ')' : 'rgba(0,0,0,' + a + ')';
      g.fillRect(x, y, w, 1.1);
      gb.fillStyle = bright ? 'rgba(220,220,220,0.18)' : 'rgba(40,40,40,0.18)';
      gb.fillRect(x, y, w, 1.1);
    }

    /* Subtle precision machined perimeter bevel frame */
    g.strokeStyle = 'rgba(20,24,32,0.45)';
    g.lineWidth = 10;
    g.strokeRect(36, 36, sz - 72, sz - 72);
    g.strokeStyle = 'rgba(255,255,255,0.18)';
    g.lineWidth = 2;
    g.strokeRect(44, 44, sz - 88, sz - 88);

    /* Laser-etched industrial semiconductor markings */
    g.fillStyle = 'rgba(18, 22, 29, 0.72)';
    g.font = '600 28px Inter, system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText('NAVIDIX SILICON ARCHITECTURE', sz * 0.5, 290);

    g.fillStyle = 'rgba(12, 16, 22, 0.88)';
    g.font = '800 84px Sora, Inter, system-ui, sans-serif';
    g.fillText('ULTRA 9', sz * 0.5, 415);

    g.fillStyle = 'rgba(18, 22, 29, 0.76)';
    g.font = '600 32px ui-monospace, Menlo, monospace';
    g.fillText('3nm GAA  ·  24-CORE  ·  FOVEROS 3D', sz * 0.5, 495);

    g.strokeStyle = 'rgba(18, 22, 29, 0.42)';
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(220, 545); g.lineTo(sz - 220, 545); g.stroke();

    g.font = '500 25px ui-monospace, Menlo, monospace';
    g.fillStyle = 'rgba(20, 24, 32, 0.65)';
    g.fillText('SRL9X   5.70GHz   36MB L3', sz * 0.5, 608);
    g.fillText('LOT 2647F091   WAFER #08', sz * 0.5, 654);

    /* Engraved tiny 2D DataMatrix calibration square */
    var dx = sz * 0.5 - 38, dy = 708;
    for (var r = 0; r < 10; r++) {
      for (var c = 0; c < 10; c++) {
        if (r === 0 || c === 0 || ((r * 7 + c * 13) % 3 === 0)) {
          g.fillStyle = 'rgba(15,19,26,0.72)';
          g.fillRect(dx + c * 7.6, dy + r * 7.6, 6.2, 6.2);
        }
      }
    }

    /* Pin-1 gold alignment triangle in bottom-left corner */
    g.fillStyle = '#D8A458';
    g.beginPath();
    g.moveTo(82, sz - 82);
    g.lineTo(132, sz - 82);
    g.lineTo(82, sz - 132);
    g.closePath();
    g.fill();

    var colTex = new THREE.CanvasTexture(cCol);
    var bmpTex = new THREE.CanvasTexture(cBmp);
    colTex.anisotropy = 8;
    if (THREE.sRGBEncoding) colTex.encoding = THREE.sRGBEncoding;
    return { map: colTex, bumpMap: bmpTex };
  }

  function makeSubstrateTexture(THREE) {
    var sz = 1024;
    var c = document.createElement('canvas');
    c.width = c.height = sz;
    var g = c.getContext('2d');

    /* Deep dark fiberglass emerald-obsidian substrate */
    g.fillStyle = '#091512';
    g.fillRect(0, 0, sz, sz);

    /* Micro fiberglass weave */
    g.strokeStyle = 'rgba(30, 74, 58, 0.14)';
    g.lineWidth = 1;
    for (var k = 0; k < sz; k += 8) {
      g.beginPath(); g.moveTo(k, 0); g.lineTo(k, sz); g.stroke();
      g.beginPath(); g.moveTo(0, k); g.lineTo(sz, k); g.stroke();
    }

    /* High-speed copper differential routing traces radiating from center interposer */
    var cx = sz * 0.5, cy = sz * 0.5;
    g.strokeStyle = 'rgba(204, 148, 72, 0.34)';
    g.lineWidth = 1.6;
    for (var t = 0; t < 42; t++) {
      var off = (t - 21) * 14;
      /* Horizontal bus */
      g.beginPath();
      g.moveTo(48, cy + off);
      g.lineTo(200, cy + off);
      g.lineTo(250, cy + off * 0.65);
      g.lineTo(sz - 250, cy + off * 0.65);
      g.lineTo(sz - 200, cy + off);
      g.lineTo(sz - 48, cy + off);
      g.stroke();

      /* Vertical bus */
      g.beginPath();
      g.moveTo(cx + off, 48);
      g.lineTo(cx + off, 190);
      g.lineTo(cx + off * 0.65, 240);
      g.lineTo(cx + off * 0.65, sz - 240);
      g.lineTo(cx + off, sz - 190);
      g.lineTo(cx + off, sz - 48);
      g.stroke();
    }

    /* Dark interposer mounting bay in center */
    g.fillStyle = '#070B10';
    g.fillRect(190, 210, sz - 380, sz - 420);
    g.strokeStyle = 'rgba(216, 164, 88, 0.55)';
    g.lineWidth = 3;
    g.strokeRect(190, 210, sz - 380, sz - 420);

    /* Gold perimeter test pads & fiducials */
    g.fillStyle = '#D4A052';
    for (var p = 72; p < sz - 60; p += 26) {
      g.fillRect(p, 26, 10, 10);
      g.fillRect(p, sz - 36, 10, 10);
      g.fillRect(26, p, 10, 10);
      g.fillRect(sz - 36, p, 10, 10);
    }

    /* Corner pin-1 arrow */
    g.fillStyle = '#E6B86A';
    g.beginPath();
    g.moveTo(46, sz - 46); g.lineTo(92, sz - 46); g.lineTo(46, sz - 92); g.closePath();
    g.fill();

    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  /* Photolithography Die-Shot Generator for each 3nm Silicon Chiplet Tile */
  function makeDieShotTextures(THREE, kind) {
    var sz = 512;
    var c = document.createElement('canvas');
    var b = document.createElement('canvas');
    c.width = b.width = sz;
    c.height = b.height = sz;
    var g = c.getContext('2d');
    var gb = b.getContext('2d');

    /* Iridescent obsidian-indigo crystalline silicon wafer substrate */
    var baseGrad = g.createLinearGradient(0, 0, sz, sz);
    if (kind === 'compute') {
      baseGrad.addColorStop(0, '#0C1424');
      baseGrad.addColorStop(0.5, '#131D33');
      baseGrad.addColorStop(1, '#09101C');
    } else if (kind === 'gpu') {
      baseGrad.addColorStop(0, '#0D1722');
      baseGrad.addColorStop(0.5, '#152534');
      baseGrad.addColorStop(1, '#0A121B');
    } else if (kind === 'soc') {
      baseGrad.addColorStop(0, '#141220');
      baseGrad.addColorStop(0.5, '#1E1A30');
      baseGrad.addColorStop(1, '#0D0C17');
    } else {
      baseGrad.addColorStop(0, '#12151C');
      baseGrad.addColorStop(1, '#0A0D12');
    }
    g.fillStyle = baseGrad;
    g.fillRect(0, 0, sz, sz);
    gb.fillStyle = '#404040';
    gb.fillRect(0, 0, sz, sz);

    function drawSRAMBlock(x, y, w, h, tint) {
      g.fillStyle = tint || 'rgba(198, 146, 74, 0.24)';
      g.fillRect(x, y, w, h);
      gb.fillStyle = '#B8B8B8';
      gb.fillRect(x, y, w, h);
      /* Ultra-dense SRAM bitcell striping */
      g.fillStyle = 'rgba(240, 198, 120, 0.28)';
      for (var sx = x + 3; sx < x + w - 3; sx += 5) {
        g.fillRect(sx, y + 3, 2, h - 6);
        gb.fillStyle = '#E5E5E5';
        gb.fillRect(sx, y + 3, 2, h - 6);
      }
      g.strokeStyle = 'rgba(103, 232, 249, 0.32)';
      g.lineWidth = 1;
      g.strokeRect(x, y, w, h);
    }

    function drawLogicSea(x, y, w, h, seed) {
      g.fillStyle = 'rgba(26, 40, 66, 0.72)';
      g.fillRect(x, y, w, h);
      /* Randomized macro standard-cell density texture */
      for (var ly = y + 2; ly < y + h - 3; ly += 4) {
        for (var lx = x + 2; lx < x + w - 5; lx += 7) {
          var v = Math.sin(lx * 0.37 + ly * 0.71 + seed) * 0.5 + 0.5;
          if (v > 0.38) {
            g.fillStyle = v > 0.76 ? 'rgba(216,164,88,0.45)' : 'rgba(103,232,249,0.22)';
            g.fillRect(lx, ly, 4.5, 2.2);
            gb.fillStyle = v > 0.76 ? '#D0D0D0' : '#888888';
            gb.fillRect(lx, ly, 4.5, 2.2);
          }
        }
      }
      g.strokeStyle = 'rgba(216, 164, 88, 0.36)';
      g.lineWidth = 1.2;
      g.strokeRect(x, y, w, h);
    }

    if (kind === 'compute') {
      /* 8 Performance Cores (4 left column + 4 right column) + central L3 Ring Bus + 4 E-Core quads */
      var pad = 16;
      var colW = 168;
      var coreH = 82;
      for (var r = 0; r < 4; r++) {
        var cy = pad + r * (coreH + 10);
        /* Left P-Core */
        drawLogicSea(pad, cy, colW * 0.62, coreH, r + 1);
        drawSRAMBlock(pad + colW * 0.64, cy, colW * 0.36, coreH * 0.48, 'rgba(216,164,88,0.28)');
        drawSRAMBlock(pad + colW * 0.64, cy + coreH * 0.52, colW * 0.36, coreH * 0.48, 'rgba(103,232,249,0.22)');
        /* Right P-Core */
        var rx = sz - pad - colW;
        drawSRAMBlock(rx, cy, colW * 0.36, coreH * 0.48, 'rgba(216,164,88,0.28)');
        drawSRAMBlock(rx, cy + coreH * 0.52, colW * 0.36, coreH * 0.48, 'rgba(103,232,249,0.22)');
        drawLogicSea(rx + colW * 0.38, cy, colW * 0.62, coreH, r + 11);
      }
      /* Central 36MB L3 Shared Cache Spine & Ring Interconnect */
      var midX = pad + colW + 14;
      var midW = sz - (midX * 2);
      for (var s = 0; s < 6; s++) {
        drawSRAMBlock(midX, pad + s * 60, midW, 52, 'rgba(205, 130, 62, 0.32)');
      }
      /* Bottom Strip: 16 E-Cores (4 Quads x 4 Cores) */
      var ey = sz - 116;
      for (var q = 0; q < 4; q++) {
        var qx = pad + q * 122;
        drawLogicSea(qx, ey, 112, 62, q + 30);
        drawSRAMBlock(qx, ey + 66, 112, 32, 'rgba(52, 211, 153, 0.24)');
      }
    } else if (kind === 'gpu') {
      /* 4 Xe Graphics Slices */
      for (var gy = 0; gy < 2; gy++) {
        for (var gx = 0; gx < 2; gx++) {
          var x0 = 18 + gx * 244, y0 = 18 + gy * 244;
          drawLogicSea(x0, y0, 232, 160, gx * 5 + gy);
          drawSRAMBlock(x0, y0 + 168, 232, 64, 'rgba(103, 232, 249, 0.28)');
        }
      }
    } else if (kind === 'soc') {
      /* NPU Systolic Array + DDR5 Controller + Media Engine */
      drawSRAMBlock(18, 18, 224, 224, 'rgba(167, 139, 250, 0.26)');
      drawLogicSea(256, 18, 238, 224, 42);
      drawLogicSea(18, 258, 476, 130, 55);
      /* DDR5 PHY edge strip */
      for (var ph = 0; ph < 8; ph++) {
        drawSRAMBlock(18 + ph * 60, 402, 52, 92, 'rgba(216, 164, 88, 0.32)');
      }
    } else {
      /* I/O Tile: PCIe 5.0 + Thunderbolt SerDes lanes */
      for (var ln = 0; ln < 6; ln++) {
        drawSRAMBlock(18, 18 + ln * 80, 476, 68, 'rgba(148, 163, 184, 0.24)');
      }
    }

    /* Fine M14 copper global power distribution mesh over whole die */
    g.strokeStyle = 'rgba(216, 164, 88, 0.14)';
    g.lineWidth = 1;
    for (var m = 0; m < sz; m += 32) {
      g.beginPath(); g.moveTo(m, 0); g.lineTo(m, sz); g.stroke();
      g.beginPath(); g.moveTo(0, m); g.lineTo(sz, m); g.stroke();
    }
    g.strokeStyle = 'rgba(216, 164, 88, 0.65)';
    g.lineWidth = 4;
    g.strokeRect(2, 2, sz - 4, sz - 4);

    var mapTex = new THREE.CanvasTexture(c);
    var bmpTex = new THREE.CanvasTexture(b);
    mapTex.anisotropy = 8;
    if (THREE.sRGBEncoding) mapTex.encoding = THREE.sRGBEncoding;
    return { map: mapTex, bumpMap: bmpTex };
  }

  function makeMotherboardTexture(THREE) {
    var sz = 1024;
    var c = document.createElement('canvas');
    c.width = c.height = sz;
    var g = c.getContext('2d');
    g.fillStyle = '#070A0F';
    g.fillRect(0, 0, sz, sz);

    /* Subtle dark matte solder-mask micro-grid */
    g.strokeStyle = 'rgba(100, 124, 158, 0.08)';
    g.lineWidth = 1;
    for (var i = 0; i < sz; i += 16) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, sz); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(sz, i); g.stroke();
    }

    /* High-speed serpentine copper traces across motherboard */
    g.strokeStyle = 'rgba(216, 164, 88, 0.19)';
    g.lineWidth = 1.8;
    for (var t = -10; t <= 10; t++) {
      var o = t * 11;
      g.beginPath();
      g.moveTo(sz * 0.5, sz * 0.5 + o);
      g.lineTo(sz * 0.72, sz * 0.5 + o);
      g.lineTo(sz * 0.78, sz * 0.44 + o);
      g.lineTo(sz * 0.90, sz * 0.44 + o);
      g.stroke();

      g.beginPath();
      g.moveTo(sz * 0.5, sz * 0.5 + o);
      g.lineTo(sz * 0.28, sz * 0.5 + o);
      g.lineTo(sz * 0.20, sz * 0.46 + o);
      g.lineTo(sz * 0.10, sz * 0.46 + o);
      g.stroke();
    }
    /* Vertical PCIe / Display differential trace bundles */
    g.strokeStyle = 'rgba(103, 232, 249, 0.18)';
    for (var v = -8; v <= 8; v++) {
      var vx = sz * 0.5 + v * 10;
      g.beginPath(); g.moveTo(vx, sz * 0.5); g.lineTo(vx, sz * 0.88); g.stroke();
      g.beginPath(); g.moveTo(vx, sz * 0.5); g.lineTo(vx, sz * 0.12); g.stroke();
    }

    /* Socket perimeter silkscreen & mounting holes */
    g.strokeStyle = 'rgba(216, 164, 88, 0.42)';
    g.lineWidth = 2.5;
    g.strokeRect(sz * 0.34, sz * 0.32, sz * 0.32, sz * 0.36);

    g.fillStyle = 'rgba(226, 232, 240, 0.28)';
    g.font = '600 18px ui-monospace, Menlo, monospace';
    g.fillText('LGA-1851  ·  DDR5-6400 CH A/B', sz * 0.65, sz * 0.20);
    g.fillText('PCIe 5.0 x16  ·  128 GB/s', sz * 0.36, sz * 0.94);
    g.fillText('NVMe GEN5 M.2', sz * 0.08, sz * 0.22);

    /* Gold screw mounting standoffs */
    var holes = [[44, 44], [sz - 44, 44], [44, sz - 44], [sz - 44, sz - 44]];
    holes.forEach(function (h) {
      g.beginPath(); g.arc(h[0], h[1], 14, 0, Math.PI * 2);
      g.strokeStyle = '#D8A458'; g.lineWidth = 4; g.stroke();
      g.beginPath(); g.arc(h[0], h[1], 6, 0, Math.PI * 2);
      g.fillStyle = '#040507'; g.fill();
    });

    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function makeGateSilkscreenTexture(THREE, title, accentHex) {
    var sz = 256;
    var c = document.createElement('canvas');
    c.width = c.height = sz;
    var g = c.getContext('2d');
    g.fillStyle = '#0B121E';
    g.fillRect(0, 0, sz, sz);
    g.strokeStyle = accentHex;
    g.lineWidth = 6;
    g.strokeRect(8, 8, sz - 16, sz - 16);
    g.strokeStyle = 'rgba(255,255,255,0.12)';
    g.lineWidth = 2;
    for (var i = 28; i < sz - 24; i += 24) {
      g.beginPath(); g.moveTo(i, 12); g.lineTo(i, 28); g.stroke();
      g.beginPath(); g.moveTo(i, sz - 28); g.lineTo(i, sz - 12); g.stroke();
    }
    g.fillStyle = '#F1F5F9';
    g.font = '800 72px ui-monospace, Menlo, monospace';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(title, sz * 0.5, sz * 0.52);
    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function makeWaferGridTexture(THREE) {
    var sz = 512;
    var c = document.createElement('canvas');
    c.width = c.height = sz;
    var g = c.getContext('2d');
    g.fillStyle = '#060A11';
    g.fillRect(0, 0, sz, sz);
    g.strokeStyle = 'rgba(103, 232, 249, 0.08)';
    g.lineWidth = 1;
    for (var i = 0; i < sz; i += 16) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, sz); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(sz, i); g.stroke();
    }
    g.strokeStyle = 'rgba(216, 164, 88, 0.22)';
    g.lineWidth = 2;
    g.strokeRect(4, 4, sz - 8, sz - 8);
    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function makeStudioEnvMap(THREE, renderer) {
    if (!THREE.PMREMGenerator) return null;
    try {
      var pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      var envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0x04060A);

      /* Focused grazing cleanroom light strips — darkroom studio contrast, zero flat white washout */
      var topStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 2.2),
        new THREE.MeshBasicMaterial({ color: 0xB8CEE8, side: THREE.DoubleSide })
      );
      topStrip.position.set(0, 11, -5);
      topStrip.lookAt(0, 0, 0);
      envScene.add(topStrip);

      var warmPanel = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 4.5),
        new THREE.MeshBasicMaterial({ color: 0xD99E58, side: THREE.DoubleSide })
      );
      warmPanel.position.set(13, 4.5, 9);
      warmPanel.lookAt(0, 0, 0);
      envScene.add(warmPanel);

      var coolPanel = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 4),
        new THREE.MeshBasicMaterial({ color: 0x4EC5E8, side: THREE.DoubleSide })
      );
      coolPanel.position.set(-13, 4, -8);
      coolPanel.lookAt(0, 0, 0);
      envScene.add(coolPanel);

      var rt = pmrem.fromScene(envScene, 0.04);
      pmrem.dispose();
      return rt.texture;
    } catch (_) {
      return null;
    }
  }

  /* =====================================================================
     2. REAL-TIME 2D HEAT EQUATION PDE SOLVER & IRONBOW FLIR COLORMAP
     ===================================================================== */
  function ironbowRGB(norm) {
    /* Authentic FLIR Ironbow palette: deep navy -> violet -> crimson -> amber -> white-hot */
    var t = Math.max(0, Math.min(1, norm));
    var stops = [
      [0.00,  11,  16,  42],
      [0.24,  68,  18, 108],
      [0.50, 178,  38,  84],
      [0.74, 245, 106,  42],
      [0.90, 255, 198,  78],
      [1.00, 255, 248, 212]
    ];
    for (var i = 0; i < stops.length - 1; i++) {
      var a = stops[i], b = stops[i + 1];
      if (t >= a[0] && t <= b[0]) {
        var u = (t - a[0]) / (b[0] - a[0]);
        return [
          Math.round(a[1] + (b[1] - a[1]) * u),
          Math.round(a[2] + (b[2] - a[2]) * u),
          Math.round(a[3] + (b[3] - a[3]) * u)
        ];
      }
    }
    return [255, 248, 212];
  }

  function createThermalSolver(THREE) {
    var N = 48;
    var grid = new Float32Array(N * N);
    var next = new Float32Array(N * N);
    var T_AMB = 26.0;
    for (var i = 0; i < N * N; i++) grid[i] = 34.0;

    var canvas = document.createElement('canvas');
    canvas.width = N; canvas.height = N;
    var ctx = canvas.getContext('2d');
    var img = ctx.createImageData(N, N);
    var tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;

    /* Normalized die heat source positions (u, v) on Compute Tile:
       8 P-Cores (4 left, 4 right) + 4 E-Core quads along bottom + L3 spine */
    var pCoreHotspots = [
      [0.20, 0.16], [0.20, 0.34], [0.20, 0.52], [0.20, 0.70],
      [0.80, 0.16], [0.80, 0.34], [0.80, 0.52], [0.80, 0.70]
    ];
    var eCoreHotspots = [
      [0.18, 0.88], [0.40, 0.88], [0.62, 0.88], [0.84, 0.88]
    ];

    function step(freqGHz, voltV, workload, cooler) {
      /* Activity factor alpha depends on workload */
      var alpha = workload === 'idle' ? 0.12 : (workload === 'gaming' ? 0.58 : 1.0);
      /* Dynamic CMOS power: P_dyn = alpha * C_eff * V^2 * f (calibrated to Ultra 9 ~250W peak) */
      var C_EFF = 22.8;
      var pDyn = alpha * C_EFF * voltV * voltV * freqGHz;

      /* Current peak temp drives exponential subthreshold leakage current */
      var curMax = 35;
      for (var k = 0; k < N * N; k++) if (grid[k] > curMax) curMax = grid[k];

      var pLeak = 4.2 * Math.exp(0.032 * Math.max(0, curMax - 30)) * voltV;
      var pTotal = pDyn + pLeak;

      /* Effective cooling conductance h */
      var hCool = cooler === 'aio360' ? 0.088 : (cooler === 'air' ? 0.056 : 0.011);
      var kappa = 0.16;

      /* Per-cell source injection Q */
      var qPerP = (pTotal / 145) * (workload === 'idle' ? 0.45 : 3.9);
      var qPerE = (pTotal / 145) * (workload === 'render' ? 2.8 : (workload === 'gaming' ? 0.75 : 0.25));

      for (var iter = 0; iter < 3; iter++) {
        for (var y = 0; y < N; y++) {
          for (var x = 0; x < N; x++) {
            var idx = y * N + x;
            var tc = grid[idx];
            var tL = grid[y * N + Math.max(0, x - 1)];
            var tR = grid[y * N + Math.min(N - 1, x + 1)];
            var tU = grid[Math.max(0, y - 1) * N + x];
            var tD = grid[Math.min(N - 1, y + 1) * N + x];
            var lap = (tL + tR + tU + tD - 4 * tc);
            next[idx] = tc + kappa * lap - hCool * (tc - T_AMB);
          }
        }
        /* Inject Gaussian heat kernels at physical core locations */
        var activeP = workload === 'idle' ? 1 : 8;
        for (var p = 0; p < activeP; p++) {
          var hx = Math.round(pCoreHotspots[p][0] * (N - 1));
          var hy = Math.round(pCoreHotspots[p][1] * (N - 1));
          for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
              var xx = hx + dx, yy = hy + dy;
              if (xx >= 0 && xx < N && yy >= 0 && yy < N) {
                var w = Math.exp(-(dx * dx + dy * dy) / 3.2);
                next[yy * N + xx] += qPerP * w;
              }
            }
          }
        }
        for (var e = 0; e < eCoreHotspots.length; e++) {
          var ex = Math.round(eCoreHotspots[e][0] * (N - 1));
          var ey = Math.round(eCoreHotspots[e][1] * (N - 1));
          for (var edy = -2; edy <= 2; edy++) {
            for (var edx = -2; edx <= 2; edx++) {
              var exx = ex + edx, eyy = ey + edy;
              if (exx >= 0 && exx < N && eyy >= 0 && eyy < N) {
                var ew = Math.exp(-(edx * edx + edy * edy) / 3.4);
                next[eyy * N + exx] += qPerE * ew;
              }
            }
          }
        }
        for (var c2 = 0; c2 < N * N; c2++) {
          grid[c2] = Math.max(T_AMB, Math.min(118, next[c2]));
        }
      }

      /* Paint Ironbow FLIR CanvasTexture */
      var maxT = T_AMB, avgT = 0;
      for (var m = 0; m < N * N; m++) {
        var val = grid[m];
        if (val > maxT) maxT = val;
        avgT += val;
        var norm = (val - 28) / 76; /* 28C..104C full FLIR sweep */
        var rgb = ironbowRGB(norm);
        img.data[m * 4]     = rgb[0];
        img.data[m * 4 + 1] = rgb[1];
        img.data[m * 4 + 2] = rgb[2];
        img.data[m * 4 + 3] = 235;
      }
      ctx.putImageData(img, 0, 0);
      tex.needsUpdate = true;

      var throttled = maxT >= 99.5;
      var effFreq = throttled ? Math.max(1.8, freqGHz * (1 - Math.min(0.48, (maxT - 99) * 0.045))) : freqGHz;

      return {
        pDyn: pDyn,
        pLeak: pLeak,
        pTotal: pTotal,
        maxT: maxT,
        avgT: avgT / (N * N),
        throttled: throttled,
        effFreq: effFreq
      };
    }

    return { tex: tex, step: step };
  }

  /* =====================================================================
     3. ARCHITECTURAL METADATA, WORKLOADS & 5-STAGE INSTRUCTION PROGRAMS
     ===================================================================== */
  var TILES_INFO = {
    compute: {
      name: 'تایل محاسباتی (Compute Tile)',
      node: '3nm GAA',
      desc: 'مغز اصلی پردازنده: شامل ۸ هسته‌ی پرقدرت (P-Core) برای محاسبات سنگین تک‌رشته‌ای، ۱۶ هسته‌ی کم‌مصرف (E-Core) برای چندوظیفگی، و ۳۶ مگابایت حافظه‌ی کش مشترک L3 با گذرگاه حلقوی.',
      specs: [
        ['تعداد ترانزیستور', '~11.4 Billion'],
        ['ساختار هسته‌ها', '8P + 16E (24C)'],
        ['فرکانس بوست', 'تا 5.70 GHz'],
        ['کش مشترک L3', '36 MB Ring Bus']
      ]
    },
    gpu: {
      name: 'تایل گرافیک مجتمع (Xe GPU Tile)',
      node: '4nm / 3nm',
      desc: 'موتور پردازش موازی تصویر و ویدیو: شامل هسته‌های برداری Xe برای رندر رابط کاربری، دیکد سخت‌افزاری ویدیوی 8K AV1 و شتاب‌دهی محاسبات گرافیکی بدون درگیر کردن هسته‌های اصلی.',
      specs: [
        ['معماری', 'Xe-LPG+ Graphics'],
        ['کدک سخت‌افزاری', 'AV1 / HEVC 8K'],
        ['باند ارتباطی', 'Foveros Base'],
        ['مصرف در بیکاری', '< 1.2 W']
      ]
    },
    soc: {
      name: 'تایل SoC، هوش مصنوعی (NPU) و کنترلر RAM',
      node: '5nm / 3nm',
      desc: 'مدیر ترافیک کل سیستم: شامل کنترلر حافظه‌ی DDR5 دوکاناله، موتور عصبی اختصاصی NPU برای محاسبات ماتریسی کم‌مصرف هوش مصنوعی، و مدیریت توان و کلاک کل تراشه.',
      specs: [
        ['حافظه‌ی پشتیبانی‌شده', 'DDR5-6400+'],
        ['موتور عصبی NPU', 'آرایه‌ی سیستولیک'],
        ['مدیریت توان', 'PMU + DVFS'],
        ['تأخیر دسترسی RAM', '~68 ns']
      ]
    },
    io: {
      name: 'تایل ارتباطات پرسرعت (I/O Tile)',
      node: '6nm',
      desc: 'دروازه‌ی پردازنده به دنیای بیرون: مدیریت ۲۰ خط PCIe 5.0 برای کارت گرافیک مجزا و حافظه‌های NVMe SSD، به‌علاوه‌ی درگاه‌های پرسرعت Thunderbolt و USB4.',
      specs: [
        ['گذرگاه گرافیک', 'PCIe 5.0 x16'],
        ['ذخیره‌سازی مستقیم', 'PCIe 5.0 NVMe'],
        ['پهنای باند', '128 GB/s'],
        ['فناوری اتصال', 'Foveros 3D TSV']
      ]
    },
    ihs: {
      name: 'پخش‌کننده‌ی حرارت (IHS Titanium-Copper Lid)',
      node: '45 × 37.5 mm',
      desc: 'کلاهک فلزی ماشین‌کاری‌شده از مسِ نیکل‌اندود که از سیلیکون شکننده‌ی ۳ نانومتری محافظت می‌کند و گرمای متمرکز هسته‌ها را از طریق لایه‌ی لحیم فلزی (STIM) به سطح وسیع خنک‌کننده منتقل می‌کند.',
      specs: [
        ['جنس بدنه', 'Nickel-Plated Cu'],
        ['واسط حرارتی', 'Solder TIM'],
        ['سوکت پکیج', 'LGA 1851'],
        ['ظرفیت انتقال حرارت', 'تا 250+ W']
      ]
    }
  };

  var SYSTEM_PROGRAMS = {
    game: {
      title: 'رندر فریم بازی 4K',
      ops: [
        { asm: 'LD  R1, [DDR5:0x8F40]', bin: '10001011 00001101 10001111', bus: 'ram',  cache: 'RAM → L3 (68 ns)', desc: 'بارگذاری مختصات سه‌بعدی صحنه از حافظه‌ی DDR5 به کش پردازنده' },
        { asm: 'FMUL V0, V1, V2',      bin: '11000100 11100010 01011001', bus: 'core', cache: 'L1 Hit (1.1 ns)',  desc: 'محاسبه‌ی فیزیک و ماتریس دوربین درون واحد برداری P-Core' },
        { asm: 'FADD V0, V0, V3',      bin: '11000100 11100010 01011000', bus: 'core', cache: 'L1 Hit (1.1 ns)',  desc: 'جمع برداری نورپردازی و سایه‌ها در ۱ سیکل کلاک (0.17 ns)' },
        { asm: 'ST  [PCIe:GPU], V0',   bin: '10001001 00111010 11010010', bus: 'gpu',  cache: 'PCIe 5.0 Tx',      desc: 'ارسال فرمان Draw Call از طریق خطوط PCIe 5.0 به کارت گرافیک' },
        { asm: 'SYNC DISPLAY_VBLANK',  bin: '00001111 10101110 11110000', bus: 'disp', cache: 'HDMI / DP Out',    desc: 'همگام‌سازی فریم نهایی با نمایشگر با نرخ ۲۴۰ هرتز' }
      ]
    },
    ai: {
      title: 'استنتاج هوش مصنوعی (ماتریس)',
      ops: [
        { asm: 'DMA NVMe → DDR5',      bin: '11110010 00010000 01000001', bus: 'ssd',  cache: 'NVMe 14 GB/s',     desc: 'انتقال وزن‌های مدل هوش مصنوعی از SSD به حافظه‌ی اصلی DDR5' },
        { asm: 'LD  W_MAT, [DDR5]',    bin: '10001011 01010101 00111100', bus: 'ram',  cache: 'DDR5 Burst',       desc: 'تغذیه‌ی بلوک وزن‌ها از کنترلر حافظه‌ی SoC به کش L3' },
        { asm: 'VFMADD231PS ZMM0',     bin: '01100010 11110010 10111000', bus: 'core', cache: 'L1 Hit (1.1 ns)',  desc: 'اجرای هم‌زمان ضرب و جمع ماتریسی روی رجیسترهای برداری' },
        { asm: 'SOFTMAX  LOGITS',      bin: '01100010 10110001 01101111', bus: 'core', cache: 'L2 Hit (4.2 ns)',  desc: 'تبدیل خروجی لایه به توزیع احتمال برای انتخاب توکن بعدی' },
        { asm: 'OUT TOKEN → DISPLAY',  bin: '10001001 11000011 00000101', bus: 'disp', cache: 'I/O Bus',          desc: 'چاپ کلمه‌ی تولیدشده روی صفحه‌ی نمایش در چند میلی‌ثانیه' }
      ]
    },
    browser: {
      title: 'باز کردن تب مرورگر و وب',
      ops: [
        { asm: 'IRQ  NIC_PACKET',      bin: '11001101 00100001 00001010', bus: 'disp', cache: 'Interrupt #34',    desc: 'دریافت وقفه‌ی سخت‌افزاری (Interrupt) از کارت شبکه در تایل I/O' },
        { asm: 'LD  DOM, [DDR5]',      bin: '10001011 00100100 10100101', bus: 'ram',  cache: 'L2 Miss → RAM',    desc: 'واکشی ساختار صفحه و اسکریپت‌های جاوااسکریپت از حافظه‌ی RAM' },
        { asm: 'CMP  RAX, RBX',        bin: '01001000 00111001 11011000', bus: 'core', cache: 'Branch Predict',   desc: 'پیش‌بینی شاخه‌ی شرطی با دقت ۹۹٪ در هسته‌ی پرقدرت P-Core' },
        { asm: 'ST  TEX → PCIe:GPU',   bin: '10001001 01000111 11110001', bus: 'gpu',  cache: 'PCIe 5.0',         desc: 'تحویل لایه‌های صفحه به GPU برای ترکیب نهایی پیکسل‌ها' },
        { asm: 'CACHE_FLUSH → NVMe',   bin: '00001111 10101110 00111000', bus: 'ssd',  cache: 'SSD Write',        desc: 'ذخیره‌ی کش مرورگر روی حافظه‌ی NVMe بدون مکث در رابط کاربری' }
      ]
    }
  };

  var CHAPTERS = [
    {
      id: 'package', scale: '45 mm', no: '۰۱', title: 'کالبدشکافی اولترا ۹',
      camera: { target: [0, 8, 0], dist: 315, phi: 1.02, theta: 0.62 },
      story: 'این یک پردازنده‌ی رده‌بالای <b>اولترا ۹ نسل جدید ۳ نانومتری</b> با معماری چیپلت سه‌بعدی (Foveros 3D) است. اسلایدر <b>جداسازی لایه‌ها</b> را بکش تا کلاهک فلزی (IHS) بلند شود و ۴ تایل سیلیکونی مجزا، ۱۶۰ خازن میکروسکوپی و پایه‌های مسی اتصال عمودی را ببینی. <b>روی هر تایل سیلیکونی کلیک کن</b> تا مشخصات مهندسی‌اش باز شود.'
    },
    {
      id: 'system', scale: '2 mm', no: '۰۲', title: 'فرماندهی کل سیستم',
      camera: { target: [0, 0, 0], dist: 365, phi: 0.96, theta: 0.45 },
      story: 'CPU چطور هم‌زمان RAM، کارت گرافیک، SSD و نمایشگر را اداره می‌کند؟ هر ثانیه <b>۵٫۷ میلیارد بار</b> چرخه‌ی <b>Fetch ← Decode ← Execute ← Memory ← Writeback</b> را تکرار می‌کند. یک سناریوی واقعی انتخاب کن یا با دکمه‌ی <b>«تک‌پالس کلاک»</b> زمان را فریز کن و حرکت یک دستور باینری را روی گذرگاه‌های مسی ببین.'
    },
    {
      id: 'logic', scale: '100 nm', no: '۰۳', title: 'منطق صفر و یک (ALU)',
      camera: { target: [0, 6, 8], dist: 305, phi: 0.84, theta: 0.12 },
      story: 'درون هسته‌ی پردازنده هیچ «ریاضیدانی» نیست — فقط سیم‌های مسی با دو سطح ولتاژ: <b>۰ ولت (صفر)</b> و <b>۰٫۸۵ ولت (یک)</b>. اینجا یک <b>جمع‌کننده‌ی واقعی ۴بیتی</b> روی سیلیکون است که با گیت‌های <code>XOR</code>، <code>AND</code> و <code>OR</code> ساخته شده. کلیدهای باینری <b>A</b> و <b>B</b> را بزن و ببین جریان ولتاژ چطور موجی از راست به چپ رد می‌شود و حاصل جمع دقیق را می‌سازد.'
    },
    {
      id: 'transistor', scale: '3 nm', no: '۰۴', title: 'درون ترانزیستور ۳ نانومتری',
      camera: { target: [0, 10, 0], dist: 270, phi: 1.12, theta: 0.56 },
      story: 'به عمیق‌ترین مقیاس رسیدیم: <b>۳ نانومتر — عرض کانال فقط حدود ۱۵ اتم سیلیکون است!</b> در این معماری جدید (<b>GAA / RibbonFET</b>) گیت فلزی از <b>هر ۴ طرف</b> سه نوار نازک سیلیکون را در آغوش می‌گیرد. ولتاژ گیت (<code>V_GS</code>) را زیر <b>۰٫۳۲ ولت</b> بگذار تا ببینی با اینکه کلید خاموش است، هنوز چند الکترون با <b>تونل‌زنی کوانتومی</b> از سد رد می‌شوند — و وقتی روشنش می‌کنی، سیل الکترون‌ها با برخورد به اتم‌های لرزان سیلیکون گرما می‌سازد.'
    },
    {
      id: 'thermal', scale: 'FLIR °C', no: '۰۵', title: 'چرا CPU داغ می‌شود؟',
      camera: { target: [-12, 4, -8], dist: 248, phi: 0.78, theta: 0.36 },
      story: 'گرمای پردازنده از سه‌جا می‌آید: شارژ و دشارژ میلیاردها خازن گیت با قانون <b>P = α·C·V²·f</b>، برخورد الکترون‌ها با کریستال سیلیکون، و <b>نشت کوانتومی</b> که با داغ‌تر شدن خودش بیشتر می‌شود! ولتاژ را بالا ببر تا ببینی توان با <b>مربع ولتاژ (V²)</b> منفجر می‌شود؛ یا خنک‌کننده را خاموش کن تا در <b>۱۰۰ درجه سانتی‌گراد</b> مکانیسم محافظتی <b>Thermal Throttling</b> فعال شود.'
    }
  ];

  /* =====================================================================
     4. MAIN ENGINE MOUNT
     ===================================================================== */
  function mountCPULab(rootSel) {
    var root = document.querySelector(rootSel);
    if (!root) return;

    var fsWrap      = root.querySelector('.cpx-fs');
    var stage       = root.querySelector('.cpx-stage');
    var canvas      = root.querySelector('.cpx-canvas');
    var noteOverlay = root.querySelector('.xstage__note');
    var labelLayer  = root.querySelector('.cpx-labels');
    var hintEl      = root.querySelector('.cpx-hint');
    var flirBarEl   = root.querySelector('[data-cpu-flir-bar]');
    var hudTopEl    = root.querySelector('.cpx-hud-top');
    var metricsEl   = root.querySelector('[data-cpu-metrics]');
    var inspectorEl = root.querySelector('[data-cpu-inspector]');
    var storyEl     = root.querySelector('[data-cpu-story]');

    var stepBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-ch]'));
    var panels = {
      package:    root.querySelector('[data-cpu-panel="package"]'),
      system:     root.querySelector('[data-cpu-panel="system"]'),
      logic:      root.querySelector('[data-cpu-panel="logic"]'),
      transistor: root.querySelector('[data-cpu-panel="transistor"]'),
      thermal:    root.querySelector('[data-cpu-panel="thermal"]')
    };

    var state = {
      chapter: 'package',
      running: true,
      ready: false,
      dead: false,
      autoOrbit: true,
      dockHidden: false,
      selectedTile: null,

      /* Stage 01: Package Explode */
      explode: 0.65,
      xrayIHS: false,

      /* Stage 02: System Orchestration */
      program: 'game',
      opIndex: 0,
      pipeStage: 0,
      clockSpeed: 1.0,
      singleStepping: false,
      cycleCount: 1,
      pipeAccum: 0,

      /* Stage 03: 4-Bit Ripple Carry Adder (A = 5 = 0101, B = 3 = 0011 => 8 = 01000) */
      bitsA: [1, 0, 1, 0], /* LSB first: A0=1, A1=0, A2=1, A3=0 => 5 */
      bitsB: [1, 1, 0, 0], /* LSB first: B0=1, B1=1, B2=0, B3=0 => 3 */
      adderEval: null,
      rippleWave: 1.0,

      /* Stage 04: 3nm GAA Transistor */
      gateV: 0.72,
      vTh: 0.32,

      /* Stage 05: Thermal & Power PDE */
      freqGHz: 5.2,
      voltV: 1.18,
      workload: 'render',
      cooler: 'aio360',
      thermalStats: { pDyn: 148, pLeak: 16, pTotal: 164, maxT: 74, avgT: 58, throttled: false, effFreq: 5.2 }
    };

    try {
      var qCh = new URL(location.href).searchParams.get('c');
      if (qCh && CHAPTERS.some(function (x) { return x.id === qCh; })) state.chapter = qCh;
    } catch (_) {}

    /* Real 4-Bit Full-Adder Boolean Evaluation (Zero Faking!) */
    function evaluateAdder() {
      var stages = [];
      var carry = 0;
      var valA = 0, valB = 0, valS = 0;
      for (var i = 0; i < 4; i++) {
        var a = state.bitsA[i] ? 1 : 0;
        var b = state.bitsB[i] ? 1 : 0;
        valA += a << i;
        valB += b << i;
        var xor1 = a ^ b;
        var sum  = xor1 ^ carry;
        var and1 = a & b;
        var and2 = xor1 & carry;
        var cout = and1 | and2;
        stages.push({ a: a, b: b, cin: carry, xor1: xor1, and1: and1, and2: and2, sum: sum, cout: cout });
        valS += sum << i;
        carry = cout;
      }
      valS += carry << 4;
      state.adderEval = { stages: stages, valA: valA, valB: valB, cout: carry, valS: valS };
      return state.adderEval;
    }
    evaluateAdder();

    /* =====================================================================
       UI BINDINGS (FULLSCREEN PORTAL, INSPECTOR, MODE CONTROLS)
       ===================================================================== */
    var fauxFull = false;
    var fsPlaceholder = document.createComment('cpx-fs-placeholder');
    var canNativeFS = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled) &&
                      !!(fsWrap.requestFullscreen || fsWrap.webkitRequestFullscreen);

    function isFull() {
      return fauxFull || (document.fullscreenElement || document.webkitFullscreenElement) === fsWrap;
    }

    var fsBtns   = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-fs]'));
    var playBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-play]'));
    var orbitBtn = root.querySelector('[data-cpu-orbit]');
    var dockBtn  = root.querySelector('[data-cpu-dock]');

    function portalToBody(on) {
      if (on) {
        if (fsWrap.parentNode && fsWrap.parentNode !== document.body) {
          fsWrap.parentNode.insertBefore(fsPlaceholder, fsWrap);
          fsWrap.setAttribute('data-nvx-nolift', '1');
          document.body.appendChild(fsWrap);
        }
      } else {
        if (fsPlaceholder.parentNode) {
          fsPlaceholder.parentNode.insertBefore(fsWrap, fsPlaceholder);
          fsPlaceholder.parentNode.removeChild(fsPlaceholder);
          fsWrap.removeAttribute('data-nvx-nolift');
        }
      }
    }

    function paintFull() {
      var on = isFull();
      portalToBody(fauxFull);
      fsWrap.classList.toggle('is-full', on);
      fsWrap.classList.toggle('is-faux', fauxFull);
      document.documentElement.classList.toggle('cpx-locked', on);
      fsBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(on));
        var sp = b.querySelector('span');
        if (sp) sp.textContent = on ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه';
      });
      onResize();
      setTimeout(onResize, 60);
    }

    function toggleFullscreen(forceFaux) {
      if (fauxFull) { fauxFull = false; paintFull(); return; }
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        return;
      }
      if (forceFaux || !canNativeFS) { fauxFull = true; paintFull(); return; }
      try {
        var req = (fsWrap.requestFullscreen || fsWrap.webkitRequestFullscreen).call(fsWrap);
        if (req && req.catch) req.catch(function () { fauxFull = true; paintFull(); });
      } catch (_) { fauxFull = true; paintFull(); }
    }

    fsBtns.forEach(function (b) { b.addEventListener('click', function () { toggleFullscreen(false); }); });
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (ev) {
      document.addEventListener(ev, function () { if (!fauxFull) paintFull(); });
    });

    if (dockBtn) {
      dockBtn.addEventListener('click', function () {
        state.dockHidden = !state.dockHidden;
        fsWrap.classList.toggle('is-dock-hidden', state.dockHidden);
        dockBtn.setAttribute('aria-pressed', String(state.dockHidden));
        var sp = dockBtn.querySelector('span');
        if (sp) sp.textContent = state.dockHidden ? 'نمایش پنل' : 'مخفی‌کردن پنل';
      });
    }

    if (orbitBtn) {
      orbitBtn.setAttribute('aria-pressed', String(state.autoOrbit));
      orbitBtn.addEventListener('click', function () {
        state.autoOrbit = !state.autoOrbit;
        orbitBtn.setAttribute('aria-pressed', String(state.autoOrbit));
      });
    }

    function paintPlay() {
      playBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(state.running));
        var sp = b.querySelector('span');
        if (sp) sp.textContent = state.running ? 'توقف' : 'اجرا';
      });
    }
    playBtns.forEach(function (b) {
      b.addEventListener('click', function () { state.running ? pause() : play(); });
    });

    /* Tile Inspector */
    function closeInspector() {
      state.selectedTile = null;
      if (inspectorEl) inspectorEl.hidden = true;
    }
    function openInspector(tileKey) {
      var info = TILES_INFO[tileKey];
      if (!info || !inspectorEl) return;
      state.selectedTile = tileKey;
      inspectorEl.innerHTML =
        '<div class="cpx-insp__head">' +
          '<span class="cpx-insp__name">' + info.name + '</span>' +
          '<span class="cpx-insp__node">' + info.node + '</span>' +
          '<button type="button" class="cpx-insp__close" aria-label="بستن" data-cpu-insp-x>×</button>' +
        '</div>' +
        '<p class="cpx-insp__desc">' + info.desc + '</p>' +
        '<div class="cpx-insp__grid">' +
          info.specs.map(function (kv) {
            return '<div class="cpx-insp__kv"><span>' + kv[0] + '</span><b>' + kv[1] + '</b></div>';
          }).join('') +
        '</div>';
      inspectorEl.hidden = false;
      var x = inspectorEl.querySelector('[data-cpu-insp-x]');
      if (x) x.addEventListener('click', closeInspector);
    }

    /* Sliders & Buttons Binding */
    var slExplode = root.querySelector('[data-cpu-sl="explode"]');
    var slGate    = root.querySelector('[data-cpu-sl="gate"]');
    var slFreq    = root.querySelector('[data-cpu-sl="freq"]');
    var slVolt    = root.querySelector('[data-cpu-sl="volt"]');

    function setVal(k, txt) {
      var el = root.querySelector('[data-cpu-val="' + k + '"]');
      if (el) el.textContent = txt;
    }
    function syncSliders() {
      if (slExplode) { slExplode.value = state.explode; setVal('explode', Math.round(state.explode * 100) + '%'); }
      if (slGate)    { slGate.value = state.gateV; setVal('gate', state.gateV.toFixed(2) + ' V'); }
      if (slFreq)    { slFreq.value = state.freqGHz; setVal('freq', state.freqGHz.toFixed(2) + ' GHz'); }
      if (slVolt)    { slVolt.value = state.voltV; setVal('volt', state.voltV.toFixed(2) + ' V'); }
    }

    if (slExplode) slExplode.addEventListener('input', function () {
      state.explode = parseFloat(slExplode.value);
      setVal('explode', Math.round(state.explode * 100) + '%');
    });
    var xrayBtn = root.querySelector('[data-cpu-xray]');
    if (xrayBtn) xrayBtn.addEventListener('click', function () {
      state.xrayIHS = !state.xrayIHS;
      xrayBtn.setAttribute('aria-pressed', String(state.xrayIHS));
    });

    /* System Orchestration controls */
    var progBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-prog]'));
    progBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        state.program = b.getAttribute('data-cpu-prog');
        state.opIndex = 0; state.pipeStage = 0; state.singleStepping = false;
        progBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        paintSystemPanel();
      });
    });
    var stepClkBtn = root.querySelector('[data-cpu-stepclk]');
    if (stepClkBtn) stepClkBtn.addEventListener('click', function () {
      state.singleStepping = true;
      advancePipelineTick();
    });
    var autoClkBtn = root.querySelector('[data-cpu-autoclk]');
    if (autoClkBtn) autoClkBtn.addEventListener('click', function () {
      state.singleStepping = !state.singleStepping;
      autoClkBtn.setAttribute('aria-pressed', String(!state.singleStepping));
    });

    function advancePipelineTick() {
      var pr = SYSTEM_PROGRAMS[state.program] || SYSTEM_PROGRAMS.game;
      state.cycleCount++;
      state.pipeStage = (state.pipeStage + 1) % 5;
      if (state.pipeStage === 0) state.opIndex = (state.opIndex + 1) % pr.ops.length;
      paintSystemPanel();
    }

    function paintSystemPanel() {
      var pr = SYSTEM_PROGRAMS[state.program] || SYSTEM_PROGRAMS.game;
      var op = pr.ops[state.opIndex] || pr.ops[0];
      var stEls = root.querySelectorAll('[data-cpu-pstage]');
      stEls.forEach(function (el, idx) { el.classList.toggle('is-now', idx === state.pipeStage); });
      var asmEl = root.querySelector('[data-cpu-asm]');
      var binEl = root.querySelector('[data-cpu-bin]');
      var opDescEl = root.querySelector('[data-cpu-opdesc]');
      if (asmEl) asmEl.textContent = op.asm + '   ·   ' + op.cache;
      if (binEl) binEl.textContent = op.bin;
      if (opDescEl) opDescEl.textContent = op.desc;
      if (autoClkBtn) autoClkBtn.setAttribute('aria-pressed', String(!state.singleStepping));
    }

    /* Binary DIP Switches (Chapter 03) */
    var bitBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-bit]'));
    function paintAdderPanel() {
      var ev = evaluateAdder();
      bitBtns.forEach(function (btn) {
        var spec = btn.getAttribute('data-cpu-bit').split(':');
        var v = spec[0] === 'A' ? state.bitsA[parseInt(spec[1], 10)] : state.bitsB[parseInt(spec[1], 10)];
        btn.setAttribute('aria-pressed', String(!!v));
        var sp = btn.querySelector('span');
        if (sp) sp.textContent = v ? '1' : '0';
      });
      var aEl = root.querySelector('[data-cpu-dec-a]');
      var bEl = root.querySelector('[data-cpu-dec-b]');
      var sDec = root.querySelector('[data-cpu-sum-dec]');
      var sBin = root.querySelector('[data-cpu-sum-bits]');
      if (aEl) aEl.textContent = ev.valA + '  (' + state.bitsA.slice().reverse().join('') + ')';
      if (bEl) bEl.textContent = ev.valB + '  (' + state.bitsB.slice().reverse().join('') + ')';
      if (sDec) sDec.textContent = ev.valA + ' + ' + ev.valB + ' = ' + ev.valS;
      if (sBin) sBin.textContent = ev.cout + '' + ev.stages.map(function (s) { return s.sum; }).reverse().join('');
    }
    bitBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var spec = btn.getAttribute('data-cpu-bit').split(':');
        var idx = parseInt(spec[1], 10);
        if (spec[0] === 'A') state.bitsA[idx] = state.bitsA[idx] ? 0 : 1;
        else state.bitsB[idx] = state.bitsB[idx] ? 0 : 1;
        state.rippleWave = 0;
        paintAdderPanel();
      });
    });

    /* Transistor Gate Voltage Controls (Chapter 04) */
    function paintTransistorPanel() {
      var on = state.gateV >= state.vTh;
      var stEl = root.querySelector('[data-cpu-mos-state]');
      var curEl = root.querySelector('[data-cpu-mos-cur]');
      var leakEl = root.querySelector('[data-cpu-mos-leak]');
      var phEl = root.querySelector('[data-cpu-mos-ph]');
      if (stEl) {
        stEl.textContent = on ? 'ON — منطقی 1' : 'OFF — منطقی 0';
        stEl.style.color = on ? '#34D399' : '#94A3B8';
      }
      var iDrain = on ? Math.pow(state.gateV - state.vTh, 1.55) * 420 : 0;
      var iLeak = 2.4 + Math.exp(state.gateV * 5.2) * 0.85;
      if (curEl) curEl.textContent = on ? (iDrain.toFixed(0) + ' µA') : '0 µA';
      if (leakEl) leakEl.textContent = iLeak.toFixed(1) + ' nA (تونل‌زنی کوانتومی)';
      if (phEl) phEl.textContent = on ? 'بالا (تولید حرارت ژول)' : 'حداقل (فقط نشت استاتیک)';
    }
    if (slGate) slGate.addEventListener('input', function () {
      state.gateV = parseFloat(slGate.value);
      setVal('gate', state.gateV.toFixed(2) + ' V');
      paintTransistorPanel();
    });
    Array.prototype.slice.call(root.querySelectorAll('[data-cpu-gate-preset]')).forEach(function (b) {
      b.addEventListener('click', function () {
        state.gateV = parseFloat(b.getAttribute('data-cpu-gate-preset'));
        syncSliders();
        paintTransistorPanel();
      });
    });

    /* Thermal Controls (Chapter 05) */
    if (slFreq) slFreq.addEventListener('input', function () {
      state.freqGHz = parseFloat(slFreq.value);
      setVal('freq', state.freqGHz.toFixed(2) + ' GHz');
    });
    if (slVolt) slVolt.addEventListener('input', function () {
      state.voltV = parseFloat(slVolt.value);
      setVal('volt', state.voltV.toFixed(2) + ' V');
    });
    var wlBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-wl]'));
    wlBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        state.workload = b.getAttribute('data-cpu-wl');
        wlBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
    var coolBtns = Array.prototype.slice.call(root.querySelectorAll('[data-cpu-cool]'));
    coolBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        state.cooler = b.getAttribute('data-cpu-cool');
        coolBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });

    function paintThermalPanel() {
      var st = state.thermalStats;
      var pd = root.querySelector('[data-cpu-pdyn]');
      var pl = root.querySelector('[data-cpu-pleak]');
      var pt = root.querySelector('[data-cpu-ptot]');
      var tj = root.querySelector('[data-cpu-tj]');
      if (pd) pd.textContent = st.pDyn.toFixed(1) + ' W';
      if (pl) pl.textContent = st.pLeak.toFixed(1) + ' W';
      if (pt) {
        pt.textContent = st.pTotal.toFixed(1) + ' W';
        pt.style.color = st.pTotal > 200 ? '#FF5E3A' : '#D8A458';
      }
      if (tj) {
        tj.textContent = st.maxT.toFixed(1) + ' °C' + (st.throttled ? ' · THROTTLE!' : '');
        tj.style.color = st.maxT >= 95 ? '#FF5E3A' : (st.maxT >= 75 ? '#D8A458' : '#34D399');
      }
    }

    var lastHudHtml = '';
    function paintMetricsHUD() {
      if (!metricsEl) return;
      var ch = CHAPTERS.find(function (x) { return x.id === state.chapter; }) || CHAPTERS[0];
      var out = ['<span class="cpx-stat cpx-stat--scale">مقیاس: <strong>' + ch.scale + '</strong></span>'];
      if (state.chapter === 'package') {
        out.push('<span class="cpx-stat">فناوری: <strong>3nm GAA · Foveros 3D</strong></span>');
        out.push('<span class="cpx-stat cpx-stat--cyan">ترانزیستورها: <strong>~18B</strong></span>');
      } else if (state.chapter === 'system') {
        var pr = SYSTEM_PROGRAMS[state.program] || SYSTEM_PROGRAMS.game;
        out.push('<span class="cpx-stat cpx-stat--cyan">کلاک: <strong>5.70 GHz (0.17 ns)</strong></span>');
        out.push('<span class="cpx-stat">سیکل: <strong>#' + state.cycleCount + '</strong></span>');
        out.push('<span class="cpx-stat">سناریو: <strong>' + pr.title + '</strong></span>');
      } else if (state.chapter === 'logic') {
        var ev = state.adderEval;
        out.push('<span class="cpx-stat cpx-stat--cyan">محاسبه: <strong>' + ev.valA + ' + ' + ev.valB + ' = ' + ev.valS + '</strong></span>');
        out.push('<span class="cpx-stat">ولتاژ منطقی: <strong>0V / 0.85V</strong></span>');
      } else if (state.chapter === 'transistor') {
        var on = state.gateV >= state.vTh;
        out.push('<span class="cpx-stat cpx-stat--cyan">گیت: <strong>' + state.gateV.toFixed(2) + ' V</strong></span>');
        out.push('<span class="cpx-stat ' + (on ? '' : 'cpx-stat--hot') + '">کانال ۳nm: <strong>' + (on ? 'ON (1)' : 'OFF (0 · Quantum Leak)') + '</strong></span>');
      } else if (state.chapter === 'thermal') {
        var ts = state.thermalStats;
        out.push('<span class="cpx-stat cpx-stat--hot">دمای هسته: <strong>' + ts.maxT.toFixed(1) + ' °C</strong></span>');
        out.push('<span class="cpx-stat">توان کل: <strong>' + ts.pTotal.toFixed(0) + ' W</strong></span>');
        out.push('<span class="cpx-stat cpx-stat--cyan">فرکانس مؤثر: <strong>' + ts.effFreq.toFixed(2) + ' GHz</strong></span>');
        if (ts.throttled) {
          out.push('<span class="cpx-stat cpx-stat--throttle"><strong>محافظ PROCHOT · کاهش فرکانس</strong></span>');
        }
      }
      var html = out.join('');
      if (html !== lastHudHtml) {
        lastHudHtml = html;
        metricsEl.innerHTML = html;
      }
    }

    function setChapter(id, pushUrl) {
      state.chapter = id;
      var ch = CHAPTERS.find(function (x) { return x.id === id; }) || CHAPTERS[0];
      stepBtns.forEach(function (b) {
        b.setAttribute('aria-current', String(b.getAttribute('data-cpu-ch') === id));
      });
      Object.keys(panels).forEach(function (k) {
        if (panels[k]) panels[k].hidden = (k !== id);
      });
      if (flirBarEl) flirBarEl.hidden = (id !== 'thermal');
      if (storyEl) storyEl.innerHTML = ch.story;
      if (id !== 'package') closeInspector();
      if (orbit && ch.camera) orbit.goTo(ch.camera);

      if (id === 'system') paintSystemPanel();
      if (id === 'logic') paintAdderPanel();
      if (id === 'transistor') paintTransistorPanel();
      if (id === 'thermal') paintThermalPanel();
      paintMetricsHUD();

      if (pushUrl) {
        try {
          var u = new URL(location.href);
          u.searchParams.set('c', id);
          history.replaceState(null, '', u);
        } catch (_) {}
      }
    }

    stepBtns.forEach(function (b) {
      b.addEventListener('click', function () { setChapter(b.getAttribute('data-cpu-ch'), true); });
    });

    Array.prototype.slice.call(root.querySelectorAll('[data-cpu-reset]')).forEach(function (b) {
      b.addEventListener('click', function () {
        state.explode = 0.65; state.xrayIHS = false;
        state.program = 'game'; state.singleStepping = false;
        state.bitsA = [1, 0, 1, 0]; state.bitsB = [1, 1, 0, 0];
        state.gateV = 0.72;
        state.freqGHz = 5.2; state.voltV = 1.18; state.workload = 'render'; state.cooler = 'aio360';
        if (xrayBtn) xrayBtn.setAttribute('aria-pressed', 'false');
        progBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-cpu-prog') === 'game')); });
        wlBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-cpu-wl') === 'render')); });
        coolBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-cpu-cool') === 'aio360')); });
        syncSliders();
        closeInspector();
        setChapter('package', false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'Escape') {
        if (fauxFull) { fauxFull = false; paintFull(); }
        else if (state.selectedTile) closeInspector();
      } else if (e.key === 'f' || e.key === 'F') {
        if (visible) toggleFullscreen(false);
      } else if ((e.key === 's' || e.key === 'S') && state.chapter === 'system') {
        state.singleStepping = true; advancePipelineTick();
      }
    });

    /* =====================================================================
       5. THREE.JS PBR HARDWARE SCENE BUILDERS (ALL 5 PHYSICAL SCALES)
       ===================================================================== */
    var THREE = null, renderer = null, scene = null, camera = null, orbit = null, raycaster = null;
    var raf = 0, lastTs = 0, clock = 0, visible = false, slowFrames = 0;
    var projVec = null;

    var thermalSolver = null;

    /* Arena Groups */
    var floorGrid = null;
    var pkgGroup = null, ihsGroup = null, ihsMat = null, timMesh = null;
    var pkgThermalOverlay = null, pkgClickables = [], heatParticles = null, heatPosArr = null;
    var sysGroup = null, sysPackets = [], sysPipeMeshes = [], sysStatusBars = {};
    var logicGroup = null, logicWires = [], logicSumLEDs = [], logicGateMacros = [];
    var mosGroup = null, mosGateMat = null, mosBarrierMat = null;
    var mosElectrons = null, mosElecData = [], mosLattice = null, mosLatticeBase = [];
    var dummyM = null, tmpColor = null;
    var domCallouts = {};

    function addCallout(key, label, sub, colorCss) {
      var el = document.createElement('span');
      el.className = 'cpx-callout';
      el.style.setProperty('--c', colorCss || '#D8A458');
      el.innerHTML = '<b>' + label + '</b>' + (sub ? '<em>' + sub + '</em>' : '');
      labelLayer.appendChild(el);
      domCallouts[key] = { el: el, pos: new THREE.Vector3(), visible: false, mode: null };
      return domCallouts[key];
    }

    function createOrbitRig() {
      var g = { target: new THREE.Vector3(0, 8, 0), dist: 315, phi: 1.02, theta: 0.62 };
      var c = { target: g.target.clone(), dist: g.dist, phi: g.phi, theta: g.theta };
      var dragging = false, lastX = 0, lastY = 0, moved = 0, pinch = 0;

      function goTo(cfg, instant) {
        if (cfg.target) g.target.fromArray(cfg.target);
        if (cfg.dist != null) g.dist = Math.max(115, Math.min(680, cfg.dist));
        if (cfg.phi != null) g.phi = Math.max(0.18, Math.min(1.52, cfg.phi));
        if (cfg.theta != null) g.theta = cfg.theta;
        if (instant) { c.target.copy(g.target); c.dist = g.dist; c.phi = g.phi; c.theta = g.theta; }
      }

      function dismissHint() { if (hintEl) hintEl.classList.add('is-gone'); }
      setTimeout(dismissHint, 8000);

      canvas.addEventListener('pointerdown', function (e) {
        dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
        canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
        dismissHint();
      });
      canvas.addEventListener('pointermove', function (e) {
        if (dragging) {
          var dx = e.clientX - lastX, dy = e.clientY - lastY;
          moved += Math.hypot(dx, dy);
          if (moved > 5) canvas.classList.add('is-dragging');
          g.theta -= dx * 0.0055;
          g.phi = Math.max(0.18, Math.min(1.52, g.phi - dy * 0.0044));
          lastX = e.clientX; lastY = e.clientY;
          return;
        }
        if (state.chapter === 'package' && raycaster && camera) {
          var r = canvas.getBoundingClientRect();
          var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          var ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
          raycaster.setFromCamera({ x: nx, y: ny }, camera);
          var targets = state.xrayIHS
            ? pkgClickables.filter(function (m) { return m.userData.tileKey !== 'ihs'; })
            : pkgClickables;
          var hits = raycaster.intersectObjects(targets, false);
          canvas.classList.toggle('is-hovering', hits.length > 0);
        } else {
          canvas.classList.remove('is-hovering');
        }
      });
      function stopDrag(e) {
        if (dragging && moved < 7 && e && state.chapter === 'package' && raycaster && camera) {
          var r = canvas.getBoundingClientRect();
          var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          var ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
          raycaster.setFromCamera({ x: nx, y: ny }, camera);
          var targets = state.xrayIHS
            ? pkgClickables.filter(function (m) { return m.userData.tileKey !== 'ihs'; })
            : pkgClickables;
          var hits = raycaster.intersectObjects(targets, false);
          if (hits.length) openInspector(hits[0].object.userData.tileKey);
        }
        dragging = false;
        canvas.classList.remove('is-dragging');
        if (e && e.pointerId != null && canvas.releasePointerCapture) {
          try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      }
      canvas.addEventListener('pointerup', stopDrag);
      canvas.addEventListener('pointercancel', stopDrag);
      canvas.addEventListener('pointerleave', function () { dragging = false; canvas.classList.remove('is-dragging'); });

      canvas.addEventListener('wheel', function (e) {
        e.preventDefault();
        g.dist = Math.max(115, Math.min(680, g.dist * (1 + (e.deltaY > 0 ? 0.11 : -0.11))));
        dismissHint();
      }, { passive: false });

      canvas.addEventListener('touchmove', function (e) {
        if (e.touches.length !== 2) return;
        e.preventDefault();
        var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (pinch) g.dist = Math.max(115, Math.min(680, g.dist * (pinch / d)));
        pinch = d;
      }, { passive: false });
      canvas.addEventListener('touchend', function () { pinch = 0; });

      return {
        goTo: goTo,
        update: function (dt) {
          if (state.autoOrbit && !dragging) {
            g.theta += dt * (state.chapter === 'logic' ? 0.04 : 0.085);
          }
          var aspect = (camera && camera.aspect) || 1.6;
          var boost = aspect < 1.1 ? (1.1 / Math.max(0.62, aspect)) : 1.0;
          var goalDist = Math.min(680, g.dist * boost);
          var k = 1 - Math.pow(0.0014, Math.min(dt || 0.016, 0.05));
          c.dist += (goalDist - c.dist) * k;
          c.phi += (g.phi - c.phi) * k;
          c.theta += (g.theta - c.theta) * k;
          c.target.lerp(g.target, k);

          var sp = Math.sin(c.phi);
          camera.position.set(
            c.target.x + c.dist * sp * Math.sin(c.theta),
            c.target.y + c.dist * Math.cos(c.phi),
            c.target.z + c.dist * sp * Math.cos(c.theta)
          );
          camera.lookAt(c.target);
        }
      };
    }

    function buildScene() {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x040507, 0.00085);
      var envTex = makeStudioEnvMap(THREE, renderer);
      if (envTex) scene.environment = envTex;

      var r = canvas.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(40, Math.max(1, r.width) / Math.max(1, r.height), 1, 3000);
      raycaster = new THREE.Raycaster();
      projVec = new THREE.Vector3();
      dummyM = new THREE.Object3D();
      tmpColor = new THREE.Color();
      thermalSolver = createThermalSolver(THREE);

      /* Precision Semiconductor Cleanroom Studio Lighting (High-Contrast Darkroom) */
      scene.add(new THREE.AmbientLight(0x7B95BA, 0.28));
      var key = new THREE.DirectionalLight(0xFFF3E2, 1.35);
      key.position.set(170, 260, 180);
      scene.add(key);
      var coolRim = new THREE.DirectionalLight(0x66C7FF, 0.92);
      coolRim.position.set(-220, 130, -180);
      scene.add(coolRim);
      var copperBounce = new THREE.PointLight(0xD98245, 0.95, 680);
      copperBounce.position.set(140, 48, -150);
      scene.add(copperBounce);

      /* Architectural Precision Cleanroom Reference Grid */
      floorGrid = new THREE.GridHelper(640, 32, 0x2A3548, 0x131924);
      floorGrid.position.y = -24;
      scene.add(floorGrid);

      buildPackageAndThermalArena();
      buildSystemOrchestrationArena();
      buildBooleanAdderArena();
      buildGaaTransistorArena();
    }

    /* ---- STAGE 01 & 05: PHOTOREALISTIC 3NM ULTRA 9 PACKAGE + FLIR THERMAL ---- */
    function buildPackageAndThermalArena() {
      pkgGroup = new THREE.Group();
      scene.add(pkgGroup);

      var subTex = makeSubstrateTexture(THREE);
      var subMesh = new THREE.Mesh(
        new THREE.BoxGeometry(196, 6.5, 166),
        new THREE.MeshStandardMaterial({ map: subTex, roughness: 0.42, metalness: 0.25 })
      );
      subMesh.position.y = -12;
      pkgGroup.add(subMesh);

      /* Gold LGA bottom contact flange rim */
      var lgaRim = new THREE.Mesh(
        new THREE.BoxGeometry(197.2, 1.2, 167.2),
        new THREE.MeshStandardMaterial({ color: 0xC99549, metalness: 0.92, roughness: 0.25 })
      );
      lgaRim.position.y = -15.4;
      pkgGroup.add(lgaRim);

      /* 160 Real Perimeter SMD MLCC Decoupling Capacitors (InstancedMesh) */
      var capGeo = new THREE.BoxGeometry(4.4, 2.2, 2.2);
      var capMat = new THREE.MeshStandardMaterial({ color: 0xB89364, metalness: 0.62, roughness: 0.34 });
      var capInst = new THREE.InstancedMesh(capGeo, capMat, 160);
      var dummy = new THREE.Object3D();
      var ci = 0;
      for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 40; col++) {
          var x = -84 + col * 4.3;
          var zTop = -73 + row * 4.8;
          var zBot =  73 - row * 4.8;
          dummy.position.set(x, -7.8, zTop); dummy.rotation.y = Math.PI / 2; dummy.updateMatrix();
          capInst.setMatrixAt(ci++, dummy.matrix);
          dummy.position.set(x, -7.8, zBot); dummy.rotation.y = Math.PI / 2; dummy.updateMatrix();
          capInst.setMatrixAt(ci++, dummy.matrix);
        }
      }
      capInst.instanceMatrix.needsUpdate = true;
      pkgGroup.add(capInst);

      /* 144 Copper Foveros 3D Micro-Bump TSV Interconnect Pillars */
      var tsvGeo = new THREE.CylinderGeometry(0.95, 0.95, 4.4, 8);
      var tsvMat = new THREE.MeshStandardMaterial({ color: 0xD98448, metalness: 0.92, roughness: 0.22 });
      var tsvInst = new THREE.InstancedMesh(tsvGeo, tsvMat, 144);
      var ti = 0;
      for (var tz = 0; tz < 12; tz++) {
        for (var tx = 0; tx < 12; tx++) {
          dummy.position.set(-54 + tx * 9.8, -6.4, -44 + tz * 8.0);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          tsvInst.setMatrixAt(ti++, dummy.matrix);
        }
      }
      tsvInst.instanceMatrix.needsUpdate = true;
      pkgGroup.add(tsvInst);

      /* Foveros 3D Silicon Base Interposer Tile */
      var baseTile = new THREE.Mesh(
        new THREE.BoxGeometry(126, 2.8, 102),
        new THREE.MeshPhysicalMaterial({
          color: 0x161F2E, metalness: 0.65, roughness: 0.22, clearcoat: 0.85, clearcoatRoughness: 0.14
        })
      );
      baseTile.position.y = -2.8;
      pkgGroup.add(baseTile);

      /* 4 Photolithographic 3nm Chiplet Dies (Mirror-Clearcoat Silicon!) */
      var tileDefs = [
        { key: 'compute', label: 'Compute Tile', sub: '3nm · 8P+16E', x: -18, z: -12, w: 68, d: 62, col: '#D8A458' },
        { key: 'gpu',     label: 'Xe GPU Tile',  sub: 'Graphics',     x:  38, z: -16, w: 36, d: 52, col: '#67E8F9' },
        { key: 'soc',     label: 'SoC & NPU',    sub: 'DDR5 + AI',    x: -18, z:  34, w: 68, d: 24, col: '#A78BFA' },
        { key: 'io',      label: 'I/O Tile',     sub: 'PCIe 5.0',     x:  38, z:  28, w: 36, d: 34, col: '#94A3B8' }
      ];

      tileDefs.forEach(function (td) {
        var dt = makeDieShotTextures(THREE, td.key);
        var mat = new THREE.MeshPhysicalMaterial({
          map: dt.map,
          bumpMap: dt.bumpMap,
          bumpScale: 0.45,
          metalness: 0.56,
          roughness: 0.22,
          clearcoat: 0.94,
          clearcoatRoughness: 0.10
        });
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(td.w, 4.2, td.d), mat);
        mesh.position.set(td.x, 1.0, td.z);
        mesh.userData.tileKey = td.key;
        pkgGroup.add(mesh);
        pkgClickables.push(mesh);

        var co = addCallout('tile_' + td.key, td.label, td.sub, td.col);
        co.pos.set(td.x, 7.5, td.z);
        co.mode = 'package';
      });

      /* Live FLIR Thermal PDE Overlay Plane directly over Compute Tile */
      pkgThermalOverlay = new THREE.Mesh(
        new THREE.PlaneGeometry(68.2, 62.2),
        new THREE.MeshBasicMaterial({
          map: thermalSolver.tex,
          transparent: true,
          opacity: 0.92,
          blending: THREE.NormalBlending,
          depthWrite: false
        })
      );
      pkgThermalOverlay.rotation.x = -Math.PI / 2;
      pkgThermalOverlay.position.set(-18, 3.35, -12);
      pkgThermalOverlay.visible = false;
      pkgGroup.add(pkgThermalOverlay);

      /* Subtle Rising Thermal Heat-Flux Particles (Visible in Chapter 05) */
      var hGeo = new THREE.BufferGeometry();
      heatPosArr = new Float32Array(220 * 3);
      for (var hp = 0; hp < 220; hp++) {
        heatPosArr[hp * 3]     = -18 + (Math.random() - 0.5) * 62;
        heatPosArr[hp * 3 + 1] = 4 + Math.random() * 78;
        heatPosArr[hp * 3 + 2] = -12 + (Math.random() - 0.5) * 56;
      }
      hGeo.setAttribute('position', new THREE.BufferAttribute(heatPosArr, 3));
      heatParticles = new THREE.Points(hGeo, new THREE.PointsMaterial({
        color: 0xFF6B3D, size: 2.3, transparent: true, opacity: 0.55,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      heatParticles.visible = false;
      pkgGroup.add(heatParticles);

      /* Solder TIM Thermal Interface Foil (subtle ultra-thin metallic bond layer) */
      timMesh = new THREE.Mesh(
        new THREE.BoxGeometry(108, 0.5, 88),
        new THREE.MeshStandardMaterial({ color: 0x8EA0B8, metalness: 0.88, roughness: 0.24, envMapIntensity: 0.55, transparent: true, opacity: 0.24 })
      );
      timMesh.position.y = 4.2;
      pkgGroup.add(timMesh);

      /* Machined Brushed-Titanium IHS Heat Spreader Lid (Stepped 3D Architecture!) */
      ihsGroup = new THREE.Group();
      var ihsTex = makeIHSTextures(THREE);
      ihsMat = new THREE.MeshStandardMaterial({
        map: ihsTex.map,
        bumpMap: ihsTex.bumpMap,
        bumpScale: 0.35,
        metalness: 0.86,
        roughness: 0.28,
        transparent: true,
        opacity: 1.0
      });
      var ihsSideMat = new THREE.MeshStandardMaterial({
        color: 0x6A7280, metalness: 0.88, roughness: 0.26, transparent: true, opacity: 1.0
      });
      /* Lower mounting skirt flange */
      var ihsFlange = new THREE.Mesh(new THREE.BoxGeometry(156, 3.2, 134), ihsSideMat);
      ihsFlange.position.y = 1.6;
      /* Stepped upper plateau carrying laser-etched ULTRA 9 markings */
      var ihsTop = new THREE.Mesh(
        new THREE.BoxGeometry(132, 6.2, 112),
        [ihsSideMat, ihsSideMat, ihsMat, ihsSideMat, ihsSideMat, ihsSideMat]
      );
      ihsTop.position.y = 6.2;
      ihsTop.userData.tileKey = 'ihs';
      ihsGroup.add(ihsFlange, ihsTop);
      ihsGroup.userData.sideMat = ihsSideMat;
      pkgClickables.push(ihsTop);
      pkgGroup.add(ihsGroup);

      var coIhs = addCallout('tile_ihs', 'کلاهک حرارتی IHS', 'Nickel-Cu', '#94A3B8');
      coIhs.pos.set(0, 62, 0);
      coIhs.mode = 'package';
    }

    /* ---- STAGE 02: SYSTEM ORCHESTRATION & 5-STAGE PIPELINE ---- */
    function buildSystemOrchestrationArena() {
      sysGroup = new THREE.Group();
      sysGroup.visible = false;
      scene.add(sysGroup);

      /* Matte obsidian architectural motherboard baseplane with etched copper traces */
      var moboTex = makeMotherboardTexture(THREE);
      var mobo = new THREE.Mesh(
        new THREE.BoxGeometry(360, 4, 240),
        new THREE.MeshStandardMaterial({ map: moboTex, roughness: 0.68, metalness: 0.18, envMapIntensity: 0.28 })
      );
      mobo.position.y = -14;
      sysGroup.add(mobo);

      /* Central Delidded Ultra 9 CPU Socket + 5 Illuminated Pipeline Blocks inside P-Core */
      var dt = makeDieShotTextures(THREE, 'compute');
      var cpuCoreBlock = new THREE.Mesh(
        new THREE.BoxGeometry(108, 7, 84),
        new THREE.MeshPhysicalMaterial({ map: dt.map, metalness: 0.55, roughness: 0.22, clearcoat: 0.9 })
      );
      cpuCoreBlock.position.set(0, -8, 0);
      sysGroup.add(cpuCoreBlock);

      var pipeNames = ['FETCH', 'DECODE', 'ALU', 'MEM', 'WB'];
      for (var ps = 0; ps < 5; ps++) {
        var pm = new THREE.Mesh(
          new THREE.BoxGeometry(16, 4.5, 22),
          new THREE.MeshStandardMaterial({
            color: 0x1E293B, emissive: 0xD8A458, emissiveIntensity: 0.12, metalness: 0.65, roughness: 0.25
          })
        );
        pm.position.set(-36 + ps * 18, -2.5, 0);
        sysGroup.add(pm);
        sysPipeMeshes.push(pm);
      }

      /* 4 Hardware Subsystems Orchestrated by the CPU */
      /* 1. Dual-Channel DDR5 RAM Sticks (Right) */
      for (var d = 0; d < 2; d++) {
        var dimm = new THREE.Mesh(
          new THREE.BoxGeometry(7, 34, 96),
          new THREE.MeshStandardMaterial({ color: 0x0E131D, metalness: 0.62, roughness: 0.34, envMapIntensity: 0.45 })
        );
        dimm.position.set(126 + d * 15, 5, -14);
        sysGroup.add(dimm);
        var goldCap = new THREE.Mesh(
          new THREE.BoxGeometry(7.2, 2.2, 96),
          new THREE.MeshStandardMaterial({ color: 0xD8A458, emissive: 0xD8A458, emissiveIntensity: 0.32, metalness: 0.85, roughness: 0.2 })
        );
        goldCap.position.set(126 + d * 15, 22.8, -14);
        sysGroup.add(goldCap);
      }

      /* 2. PCIe 5.0 Discrete GPU Accelerator (Front/Bottom) */
      var gpuBody = new THREE.Mesh(
        new THREE.BoxGeometry(148, 16, 40),
        new THREE.MeshStandardMaterial({ color: 0x0D121C, metalness: 0.62, roughness: 0.38, envMapIntensity: 0.42 })
      );
      gpuBody.position.set(-12, -4, 84);
      sysGroup.add(gpuBody);
      /* GPU cooling fins */
      for (var f = 0; f < 16; f++) {
        var fin = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 16.6, 36),
          new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.82, roughness: 0.30, envMapIntensity: 0.55 })
        );
        fin.position.set(-76 + f * 8.6, -4, 84);
        sysGroup.add(fin);
      }

      /* 3. NVMe PCIe 5.0 SSD Module (Left) */
      var ssd = new THREE.Mesh(
        new THREE.BoxGeometry(34, 4.5, 86),
        new THREE.MeshStandardMaterial({ color: 0x0A101A, metalness: 0.55, roughness: 0.40, envMapIntensity: 0.38 })
      );
      ssd.position.set(-128, -9.5, -12);
      sysGroup.add(ssd);
      var ssdCtrl = new THREE.Mesh(
        new THREE.BoxGeometry(18, 5.2, 18),
        new THREE.MeshStandardMaterial({ color: 0x64748B, metalness: 0.86, roughness: 0.24, envMapIntensity: 0.65 })
      );
      ssdCtrl.position.set(-128, -9, -32);
      sysGroup.add(ssdCtrl);

      /* 4. Display / I/O Bridge Controller (Back/Top) */
      var dispMod = new THREE.Mesh(
        new THREE.BoxGeometry(108, 14, 22),
        new THREE.MeshStandardMaterial({ color: 0x0D131E, metalness: 0.64, roughness: 0.36, envMapIntensity: 0.42 })
      );
      dispMod.position.set(0, -5, -88);
      sysGroup.add(dispMod);

      /* Subsystem live activity indicator strips */
      function addSubBar(key, x, y, z, w, d, colHex) {
        var mat = new THREE.MeshStandardMaterial({ color: colHex, emissive: colHex, emissiveIntensity: 0.16, metalness: 0.5, roughness: 0.25 });
        var bar = new THREE.Mesh(new THREE.BoxGeometry(w, 2.2, d), mat);
        bar.position.set(x, y, z);
        sysGroup.add(bar);
        sysStatusBars[key] = mat;
      }
      addSubBar('ram',  133.5, 24.4, -14, 24, 92, 0xD8A458);
      addSubBar('gpu',  -12,    4.8,  84, 144, 4, 0x67E8F9);
      addSubBar('ssd',  -128,  -6.6, -12, 30, 82, 0x34D399);
      addSubBar('disp',  0,     2.8, -88, 102, 4, 0xFF6A5A);

      /* Multi-Lane Raised 3D Copper Bus Highways */
      var busSpecs = [
        { id: 'ram',  from: [54, -10.5, -10], to: [122, -10.5, -10], color: 0xD8A458 },
        { id: 'gpu',  from: [0, -10.5, 42],   to: [0, -10.5, 64],    color: 0x67E8F9 },
        { id: 'ssd',  from: [-54, -10.5, -12],to: [-110, -10.5, -12],color: 0x34D399 },
        { id: 'disp', from: [0, -10.5, -42],  to: [0, -10.5, -76],   color: 0xFF6A5A }
      ];
      busSpecs.forEach(function (bs) {
        var a = new THREE.Vector3().fromArray(bs.from);
        var b = new THREE.Vector3().fromArray(bs.to);
        var dir = new THREE.Vector3().subVectors(b, a);
        var len = dir.length();
        var mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        for (var lane = -2; lane <= 2; lane++) {
          var rail = new THREE.Mesh(
            new THREE.BoxGeometry(Math.abs(dir.x) > Math.abs(dir.z) ? len : 1.4, 1.2, Math.abs(dir.z) >= Math.abs(dir.x) ? len : 1.4),
            new THREE.MeshStandardMaterial({ color: 0x9A6935, metalness: 0.88, roughness: 0.25 })
          );
          rail.position.copy(mid);
          if (Math.abs(dir.x) > Math.abs(dir.z)) rail.position.z += lane * 4.2;
          else rail.position.x += lane * 4.2;
          sysGroup.add(rail);
        }
        /* High-speed data packets traveling along each copper highway */
        for (var p = 0; p < 5; p++) {
          var pkt = new THREE.Mesh(
            new THREE.BoxGeometry(5.5, 2.4, 5.5),
            new THREE.MeshBasicMaterial({ color: bs.color })
          );
          sysGroup.add(pkt);
          sysPackets.push({ busId: bs.id, mesh: pkt, a: a, b: b, phase: p / 5, laneOff: ((p % 5) - 2) * 4.2 });
        }
      });

      /* System Callouts */
      var cCpu = addCallout('sys_cpu', 'پردازنده‌ی Ultra 9', '5-Stage Pipeline', '#D8A458');
      cCpu.pos.set(0, 12, 0); cCpu.mode = 'system';
      var cRam = addCallout('sys_ram', 'حافظه‌ی DDR5 RAM', '68 ns · Dual-Ch', '#D8A458');
      cRam.pos.set(134, 30, -14); cRam.mode = 'system';
      var cGpu = addCallout('sys_gpu', 'کارت گرافیک PCIe 5.0', '128 GB/s', '#67E8F9');
      cGpu.pos.set(-12, 12, 84); cGpu.mode = 'system';
      var cSsd = addCallout('sys_ssd', 'حافظه‌ی NVMe SSD', '14 GB/s', '#34D399');
      cSsd.pos.set(-128, 8, -12); cSsd.mode = 'system';
      var cDisp = addCallout('sys_disp', 'خروجی نمایشگر و I/O', 'DisplayPort / IRQ', '#FF6A5A');
      cDisp.pos.set(0, 10, -88); cDisp.mode = 'system';
    }

    /* ---- STAGE 03: REAL 4-BIT RIPPLE-CARRY FULL ADDER IN SILICON METAL LAYER ---- */
    function buildBooleanAdderArena() {
      logicGroup = new THREE.Group();
      logicGroup.visible = false;
      scene.add(logicGroup);

      /* Dark precision silicon wafer slab with etched micron grid */
      var waferGridTex = makeWaferGridTexture(THREE);
      var slab = new THREE.Mesh(
        new THREE.BoxGeometry(310, 5, 196),
        new THREE.MeshStandardMaterial({ map: waferGridTex, metalness: 0.22, roughness: 0.66, envMapIntensity: 0.25 })
      );
      slab.position.y = -10;
      logicGroup.add(slab);

      var texXOR = makeGateSilkscreenTexture(THREE, 'XOR', '#D8A458');
      var texAND = makeGateSilkscreenTexture(THREE, 'AND', '#67E8F9');
      var texOR  = makeGateSilkscreenTexture(THREE, 'OR',  '#34D399');

      function addWire3D(points, getActiveFn, bitOrder) {
        var mat = new THREE.MeshStandardMaterial({
          color: 0x4E3824, emissive: 0xD8A458, emissiveIntensity: 0.05, metalness: 0.85, roughness: 0.25
        });
        var segs = [];
        for (var i = 0; i < points.length - 1; i++) {
          var p0 = points[i], p1 = points[i + 1];
          var d = new THREE.Vector3().subVectors(p1, p0);
          var len = d.length();
          if (len < 0.1) continue;
          var seg = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, len + 2.0), mat);
          seg.position.addVectors(p0, p1).multiplyScalar(0.5);
          seg.lookAt(p1);
          logicGroup.add(seg);
          segs.push(seg);
        }
        var pulse = new THREE.Mesh(
          new THREE.BoxGeometry(4.2, 3.2, 4.2),
          new THREE.MeshBasicMaterial({ color: 0xFFF2C2 })
        );
        pulse.visible = false;
        logicGroup.add(pulse);
        logicWires.push({ mat: mat, fn: getActiveFn, bitOrder: bitOrder, points: points, pulse: pulse });
      }

      /* 4 Full-Adder Blocks (Bit 0 on right +X to Bit 3 on left -X, standard binary order!) */
      for (var bit = 0; bit < 4; bit++) {
        var cx = 96 - bit * 64;

        /* Gate Housing Platform (XOR + AND + OR micro-die block) */
        var gateBase = new THREE.Mesh(
          new THREE.BoxGeometry(46, 5.5, 58),
          new THREE.MeshStandardMaterial({ color: 0x0C121D, metalness: 0.45, roughness: 0.42, envMapIntensity: 0.35 })
        );
        gateBase.position.set(cx, -4.8, 0);
        logicGroup.add(gateBase);

        /* Distinct raised Silicon Gate Macros inside each Full Adder (laser-etched + live-lit!) */
        var xorMat = new THREE.MeshStandardMaterial({ map: texXOR, emissive: 0xD8A458, emissiveIntensity: 0.08, metalness: 0.35, roughness: 0.42, envMapIntensity: 0.35 });
        var andMat = new THREE.MeshStandardMaterial({ map: texAND, emissive: 0x67E8F9, emissiveIntensity: 0.08, metalness: 0.35, roughness: 0.42, envMapIntensity: 0.35 });
        var orMat  = new THREE.MeshStandardMaterial({ map: texOR,  emissive: 0x34D399, emissiveIntensity: 0.08, metalness: 0.35, roughness: 0.42, envMapIntensity: 0.35 });
        var xorM = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 16), xorMat);
        xorM.position.set(cx - 10, -1, -12);
        var andM = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 16), andMat);
        andM.position.set(cx + 10, -1, -12);
        var orM  = new THREE.Mesh(new THREE.BoxGeometry(36, 4, 16), orMat);
        orM.position.set(cx, -1, 14);
        logicGroup.add(xorM, andM, orM);
        logicGateMacros.push({ bit: bit, xorMat: xorMat, andMat: andMat, orMat: orMat });

        (function (bIdx, xPos) {
          /* Input A copper rail from Back (-Z) */
          addWire3D([
            new THREE.Vector3(xPos - 10, -6.2, -78),
            new THREE.Vector3(xPos - 10, -6.2, -26)
          ], function () { return state.adderEval.stages[bIdx].a; }, bIdx);

          /* Input B copper rail from Back (-Z) */
          addWire3D([
            new THREE.Vector3(xPos + 10, -6.2, -78),
            new THREE.Vector3(xPos + 10, -6.2, -26)
          ], function () { return state.adderEval.stages[bIdx].b; }, bIdx);

          /* Ripple Carry rail flowing leftwards to next bit (or Cout) */
          addWire3D([
            new THREE.Vector3(xPos - 23, -5.8, 12),
            new THREE.Vector3(xPos - 41, -5.8, 12)
          ], function () { return state.adderEval.stages[bIdx].cout; }, bIdx + 0.5);

          /* Output Sum rail going Front (+Z) to Sum LED Indicator */
          addWire3D([
            new THREE.Vector3(xPos, -6.2, 28),
            new THREE.Vector3(xPos, -6.2, 74)
          ], function () { return state.adderEval.stages[bIdx].sum; }, bIdx + 0.7);
        })(bit, cx);

        /* Output Sum LED Node */
        var ledMat = new THREE.MeshStandardMaterial({
          color: 0x1E293B, emissive: 0x34D399, emissiveIntensity: 0.08, metalness: 0.4, roughness: 0.25
        });
        var led = new THREE.Mesh(new THREE.BoxGeometry(16, 6, 12), ledMat);
        led.position.set(cx, -4.2, 80);
        logicGroup.add(led);
        logicSumLEDs.push({ mat: ledMat, bit: bit });

        var cBit = addCallout('bit_' + bit, 'Full Adder · Bit ' + bit, 'XOR/AND/OR', '#D8A458');
        cBit.pos.set(cx, 7, 0); cBit.mode = 'logic';
      }

      /* 5th Output LED: Final Carry Out (Bit 4 = 16) */
      var coutMat = new THREE.MeshStandardMaterial({
        color: 0x1E293B, emissive: 0x67E8F9, emissiveIntensity: 0.08, metalness: 0.4, roughness: 0.25
      });
      var coutLed = new THREE.Mesh(new THREE.BoxGeometry(16, 6, 12), coutMat);
      coutLed.position.set(-140, -4.2, 12);
      logicGroup.add(coutLed);
      logicSumLEDs.push({ mat: coutMat, bit: 4 });

      var cIn = addCallout('logic_in', 'ورودی‌های باینری A و B', '0V / 0.85V', '#67E8F9');
      cIn.pos.set(0, 6, -80); cIn.mode = 'logic';
      var cOut = addCallout('logic_out', 'خروجی جمع (۵ بیت)', 'Ripple Sum', '#34D399');
      cOut.pos.set(0, 6, 84); cOut.mode = 'logic';
    }

    /* ---- STAGE 04: 3NM GAA / RIBBONFET NANOSHEET TRANSISTOR (ATOMIC SCALE) ---- */
    function buildGaaTransistorArena() {
      mosGroup = new THREE.Group();
      mosGroup.visible = false;
      scene.add(mosGroup);

      /* Silicon Bulk Substrate Wafer Base (Deep Obsidian) */
      var bulk = new THREE.Mesh(
        new THREE.BoxGeometry(260, 14, 150),
        new THREE.MeshStandardMaterial({ map: makeWaferGridTexture(THREE), metalness: 0.18, roughness: 0.72, envMapIntensity: 0.22 })
      );
      bulk.position.y = -24;
      mosGroup.add(bulk);

      /* Source (Left -X) and Drain (Right +X) Epitaxial SiGe Blocks + Top Copper Contacts */
      var sdMat = new THREE.MeshPhysicalMaterial({
        color: 0x0E1728, metalness: 0.45, roughness: 0.34, clearcoat: 0.55, envMapIntensity: 0.45
      });
      var sdEdgeMat = new THREE.LineBasicMaterial({ color: 0x38527A, transparent: true, opacity: 0.55 });
      var sdGeo = new THREE.BoxGeometry(58, 56, 64);
      var srcBlock = new THREE.Mesh(sdGeo, sdMat);
      srcBlock.position.set(-84, 10, 0);
      srcBlock.add(new THREE.LineSegments(new THREE.EdgesGeometry(sdGeo), sdEdgeMat));
      var drnBlock = new THREE.Mesh(sdGeo, sdMat);
      drnBlock.position.set(84, 10, 0);
      drnBlock.add(new THREE.LineSegments(new THREE.EdgesGeometry(sdGeo), sdEdgeMat));
      mosGroup.add(srcBlock, drnBlock);

      /* Copper M0 Vertical Vias on top of Source & Drain */
      var cuMat = new THREE.MeshStandardMaterial({ color: 0xC8733A, metalness: 0.88, roughness: 0.26, envMapIntensity: 0.75 });
      var srcVia = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), cuMat);
      srcVia.position.set(-84, 50, 0);
      var drnVia = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), cuMat);
      drnVia.position.set(84, 50, 0);
      mosGroup.add(srcVia, drnVia);

      /* 3 Stacked Horizontal Ultra-Thin 3nm Silicon Nanosheet Ribbons */
      var ribbonYs = [-6, 12, 30];
      var ribGeo = new THREE.BoxGeometry(118, 8.5, 42);
      var ribMat = new THREE.MeshPhysicalMaterial({
        color: 0x102238, metalness: 0.35, roughness: 0.28, envMapIntensity: 0.38, transparent: true, opacity: 0.44, clearcoat: 0.65
      });
      var ribEdgeMat = new THREE.LineBasicMaterial({ color: 0x34D399, transparent: true, opacity: 0.62 });
      ribbonYs.forEach(function (ry) {
        var rib = new THREE.Mesh(ribGeo, ribMat);
        rib.position.set(0, ry, 0);
        rib.add(new THREE.LineSegments(new THREE.EdgesGeometry(ribGeo), ribEdgeMat));
        mosGroup.add(rib);
      });

      /* Gate-All-Around (GAA) Wrap-Around Metal Gate + High-k HfO2 Collar (Cutaway Front so ribbons stay visible!) */
      mosGateMat = new THREE.MeshStandardMaterial({
        color: 0x1D2D44, emissive: 0x4EDBF5, emissiveIntensity: 0.22,
        metalness: 0.72, roughness: 0.28, envMapIntensity: 0.52, transparent: true, opacity: 0.62
      });
      /* Top cap, bottom spacer, back wall & side fins wrapping all 3 sheets */
      var gTop = new THREE.Mesh(new THREE.BoxGeometry(44, 10, 62), mosGateMat); gTop.position.set(0, 44, 0);
      var gBot = new THREE.Mesh(new THREE.BoxGeometry(44, 8, 62), mosGateMat);  gBot.position.set(0, -15, 0);
      var gBack = new THREE.Mesh(new THREE.BoxGeometry(44, 62, 10), mosGateMat); gBack.position.set(0, 14, -26);
      var gMid1 = new THREE.Mesh(new THREE.BoxGeometry(44, 6.5, 52), mosGateMat); gMid1.position.set(0, 3, -3);
      var gMid2 = new THREE.Mesh(new THREE.BoxGeometry(44, 6.5, 52), mosGateMat); gMid2.position.set(0, 21, -3);
      var gVia  = new THREE.Mesh(new THREE.BoxGeometry(20, 22, 20), new THREE.MeshStandardMaterial({ color: 0xD8A458, metalness: 0.88, roughness: 0.24, envMapIntensity: 0.75 }));
      gVia.position.set(0, 60, 0);
      mosGroup.add(gTop, gBot, gBack, gMid1, gMid2, gVia);

      /* Depletion Energy Barrier Curtain (Glows vividly crimson when OFF = 0) */
      mosBarrierMat = new THREE.MeshBasicMaterial({
        color: 0xFF2842, transparent: true, opacity: 0.36, side: THREE.DoubleSide, depthWrite: false
      });
      var barrier = new THREE.Mesh(new THREE.PlaneGeometry(50, 56), mosBarrierMat);
      barrier.rotation.y = Math.PI / 2;
      barrier.position.set(0, 12, 0);
      mosGroup.add(barrier);

      /* Vibrating Silicon Crystal Lattice Atoms inside the 3 stacked nanosheets (InstancedMesh) */
      var atomCount = 3 * 5 * 3; /* 45 visible Si lattice sites */
      mosLattice = new THREE.InstancedMesh(
        new THREE.OctahedronGeometry(1.6, 0),
        new THREE.MeshStandardMaterial({ color: 0x64748B, emissive: 0xD97745, emissiveIntensity: 0.15, metalness: 0.5, roughness: 0.35 }),
        atomCount
      );
      var idx = 0;
      for (var r2 = 0; r2 < 3; r2++) {
        for (var ax = 0; ax < 5; ax++) {
          for (var az = 0; az < 3; az++) {
            mosLatticeBase.push({
              x: -36 + ax * 18,
              y: ribbonYs[r2],
              z: -14 + az * 14,
              ph: Math.random() * Math.PI * 2
            });
            idx++;
          }
        }
      }
      mosGroup.add(mosLattice);

      /* 260 Real-Time Conduction & Quantum-Tunneling Electrons (InstancedMesh) */
      var eCount = 260;
      mosElectrons = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1.35, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
        eCount
      );
      for (var e = 0; e < eCount; e++) {
        var sheet = e % 3;
        var ed0 = {
          x: -102 + Math.random() * 204,
          y: ribbonYs[sheet] + (Math.random() - 0.5) * 5.2,
          z: (Math.random() - 0.5) * 34,
          sheet: sheet,
          speed: 0.7 + Math.random() * 0.65,
          tunneler: (e % 22 === 0), /* ~4.5% exhibit quantum tunneling when gate is OFF */
          scatterFlash: 0
        };
        mosElecData.push(ed0);
        dummyM.position.set(ed0.x, ed0.y, ed0.z);
        dummyM.scale.setScalar(1.0);
        dummyM.rotation.set(0, 0, 0);
        dummyM.updateMatrix();
        mosElectrons.setMatrixAt(e, dummyM.matrix);
        tmpColor.setHex(0x67E8F9);
        mosElectrons.setColorAt(e, tmpColor);
      }
      mosElectrons.instanceMatrix.needsUpdate = true;
      if (mosElectrons.instanceColor) mosElectrons.instanceColor.needsUpdate = true;
      mosGroup.add(mosElectrons);

      /* Callouts */
      var cSrc = addCallout('mos_src', 'منبع (Source)', 'n+ Silicon', '#94A3B8');
      cSrc.pos.set(-84, 68, 0); cSrc.mode = 'transistor';
      var cGate = addCallout('mos_gate', 'گیت ۴طرفه (GAA Gate)', '3nm · HfO₂', '#67E8F9');
      cGate.pos.set(0, 76, 0); cGate.mode = 'transistor';
      var cDrn = addCallout('mos_drn', 'خروجی (Drain)', 'n+ Silicon', '#D8A458');
      cDrn.pos.set(84, 68, 0); cDrn.mode = 'transistor';
      var cRib = addCallout('mos_rib', '۳ نوار نانوسیلیکون', 'عرض ۱۵ اتم', '#34D399');
      cRib.pos.set(0, -24, 34); cRib.mode = 'transistor';
    }

    /* =====================================================================
       6. PER-FRAME PHYSICS & RENDER UPDATE LOOP
       ===================================================================== */
    function updateScene(dt, t) {
      var ch = state.chapter;
      var showPkg = (ch === 'package' || ch === 'thermal');

      pkgGroup.visible   = showPkg;
      sysGroup.visible   = (ch === 'system');
      logicGroup.visible = (ch === 'logic');
      mosGroup.visible   = (ch === 'transistor');

      /* ---- Update Package & FLIR Thermal ---- */
      if (showPkg) {
        var isTh = (ch === 'thermal');
        var ex = isTh ? 0.92 : state.explode;
        ihsGroup.position.y += ((4.5 + ex * 66) - ihsGroup.position.y) * Math.min(1, dt * 8 + 0.08);
        timMesh.position.y  += ((4.2 + ex * 28) - timMesh.position.y) * Math.min(1, dt * 8 + 0.08);

        var targetOp = isTh ? 0.0 : (state.xrayIHS ? 0.22 : 1.0);
        ihsMat.opacity += (targetOp - ihsMat.opacity) * Math.min(1, dt * 8 + 0.08);
        ihsGroup.userData.sideMat.opacity = ihsMat.opacity;
        ihsGroup.visible = ihsMat.opacity > 0.04;
        timMesh.visible = !isTh && ex > 0.06;

        pkgThermalOverlay.visible = isTh;
        heatParticles.visible = isTh;

        if (isTh) {
          state.thermalStats = thermalSolver.step(state.freqGHz, state.voltV, state.workload, state.cooler);
          paintThermalPanel();
          paintMetricsHUD();

          /* Animate convective rising thermal plumes proportional to die temperature */
          var riseSpd = 12 + Math.max(0, state.thermalStats.maxT - 35) * 0.95;
          for (var hp = 0; hp < 220; hp++) {
            heatPosArr[hp * 3 + 1] += dt * riseSpd * (0.65 + (hp % 5) * 0.12);
            if (heatPosArr[hp * 3 + 1] > 84) {
              heatPosArr[hp * 3 + 1] = 4;
              heatPosArr[hp * 3] = -18 + (Math.random() - 0.5) * 62;
              heatPosArr[hp * 3 + 2] = -12 + (Math.random() - 0.5) * 56;
            }
          }
          heatParticles.geometry.attributes.position.needsUpdate = true;
          heatParticles.material.opacity = Math.min(0.85, 0.18 + (state.thermalStats.maxT - 30) / 85);
        }

        if (domCallouts.tile_ihs) {
          domCallouts.tile_ihs.pos.set(0, ihsGroup.position.y + 18, 0);
        }
      }

      /* ---- Update System Orchestration (Stage 02) ---- */
      if (ch === 'system') {
        if (!state.singleStepping) {
          state.pipeAccum += dt;
          if (state.pipeAccum > 0.65) {
            state.pipeAccum = 0;
            advancePipelineTick();
          }
        }
        var pr = SYSTEM_PROGRAMS[state.program] || SYSTEM_PROGRAMS.game;
        var curOp = pr.ops[state.opIndex] || pr.ops[0];

        /* Light up active 5-Stage Pipeline block inside P-Core */
        for (var ps = 0; ps < 5; ps++) {
          var active = (ps === state.pipeStage);
          sysPipeMeshes[ps].material.emissiveIntensity = active ? 1.15 : 0.08;
          sysPipeMeshes[ps].scale.y = active ? 1.55 : 1.0;
        }
        /* Highlight targeted motherboard subsystem strip */
        Object.keys(sysStatusBars).forEach(function (bk) {
          var isTarget = (bk === curOp.bus) || (curOp.bus === 'core' && bk === 'ram');
          sysStatusBars[bk].emissiveIntensity = isTarget ? (0.85 + Math.sin(t * 7) * 0.25) : 0.10;
        });

        /* Drive high-speed data packets across active hardware bus */
        for (var pk = 0; pk < sysPackets.length; pk++) {
          var sp = sysPackets[pk];
          var isHotBus = (sp.busId === curOp.bus) || (curOp.bus === 'core' && sp.busId === 'ram');
          sp.phase = (sp.phase + dt * (isHotBus ? 1.15 : 0.22)) % 1;
          sp.mesh.position.lerpVectors(sp.a, sp.b, sp.phase);
          if (Math.abs(sp.b.x - sp.a.x) > Math.abs(sp.b.z - sp.a.z)) sp.mesh.position.z += sp.laneOff;
          else sp.mesh.position.x += sp.laneOff;
          sp.mesh.position.y = -8.6;
          sp.mesh.scale.setScalar(isHotBus ? 1.18 : 0.45);
          sp.mesh.visible = isHotBus || (pk % 2 === 0);
        }
        paintMetricsHUD();
      }

      /* ---- Update 4-Bit Ripple-Carry Silicon Adder (Stage 03) ---- */
      if (ch === 'logic') {
        state.rippleWave = Math.min(5.0, state.rippleWave + dt * 5.2);
        for (var wi = 0; wi < logicWires.length; wi++) {
          var w = logicWires[wi];
          var high = !!w.fn() && (state.rippleWave >= w.bitOrder);
          w.mat.color.setHex(high ? 0xFFCA66 : 0x2B2117);
          w.mat.emissive.setHex(0xE88C28);
          w.mat.emissiveIntensity = high ? 1.12 : 0.0;
          if (high && w.points.length >= 2) {
            var u = (t * 1.45 + wi * 0.21) % 1;
            w.pulse.position.lerpVectors(w.points[0], w.points[1], u);
            w.pulse.position.y += 1.6;
            w.pulse.visible = true;
          } else {
            w.pulse.visible = false;
          }
        }
        var ev = state.adderEval;
        for (var gm = 0; gm < logicGateMacros.length; gm++) {
          var m = logicGateMacros[gm];
          var stg = ev.stages[m.bit];
          var reached = state.rippleWave >= m.bit;
          m.xorMat.emissiveIntensity = (reached && stg.xor1) ? 0.95 : 0.06;
          m.andMat.emissiveIntensity = (reached && (stg.and1 || stg.and2)) ? 0.95 : 0.06;
          m.orMat.emissiveIntensity  = (reached && stg.cout) ? 0.95 : 0.06;
        }
        for (var li = 0; li < logicSumLEDs.length; li++) {
          var ld = logicSumLEDs[li];
          var lit = ld.bit === 4 ? !!ev.cout : !!ev.stages[ld.bit].sum;
          ld.mat.color.setHex(lit ? (ld.bit === 4 ? 0x67E8F9 : 0x34D399) : 0x161F2D);
          ld.mat.emissiveIntensity = lit ? 1.1 : 0.06;
        }
        paintMetricsHUD();
      }

      /* ---- Update 3nm GAA Nanosheet Transistor (Stage 04) ---- */
      if (ch === 'transistor') {
        var isOn = state.gateV >= state.vTh;
        var drive = isOn ? Math.max(0.25, (state.gateV - state.vTh) / (1.0 - state.vTh)) : 0;

        /* Gate glow & depletion barrier visibility */
        mosGateMat.emissiveIntensity = 0.06 + state.gateV * 0.72;
        mosBarrierMat.opacity = isOn ? 0.0 : (0.34 + (state.vTh - state.gateV) * 0.75);

        /* Thermal phonon vibration of Silicon Crystal Lattice Atoms */
        var vibAmp = isOn ? (0.45 + drive * 1.35) : 0.22;
        mosLattice.material.emissiveIntensity = isOn ? (0.25 + drive * 0.7) : 0.06;
        for (var a = 0; a < mosLatticeBase.length; a++) {
          var lb = mosLatticeBase[a];
          dummyM.position.set(
            lb.x + Math.sin(t * 14 + lb.ph) * vibAmp,
            lb.y + Math.cos(t * 17 + lb.ph * 1.3) * vibAmp,
            lb.z + Math.sin(t * 12 + lb.ph * 0.7) * vibAmp
          );
          dummyM.scale.setScalar(1.0);
          dummyM.rotation.set(t + a, t * 0.7, 0);
          dummyM.updateMatrix();
          mosLattice.setMatrixAt(a, dummyM.matrix);
        }
        mosLattice.instanceMatrix.needsUpdate = true;

        /* 260 Conduction & Quantum-Tunneling Electrons */
        for (var e = 0; e < mosElecData.length; e++) {
          var ed = mosElecData[e];
          if (isOn) {
            var v = (65 + drive * 155) * ed.speed;
            ed.x += dt * v;
            /* Occasional lattice scattering (Joule Heating flash!) */
            if (Math.abs(ed.x) < 42 && Math.random() < dt * (1.2 + drive * 2.5)) {
              ed.scatterFlash = 1.0;
            }
            if (ed.x > 102) ed.x = -102;
          } else {
            if (ed.tunneler) {
              /* Quantum Tunneling Leakage directly through the 3nm gate barrier! */
              ed.x += dt * 42 * ed.speed;
              if (ed.x > 102) ed.x = -102;
            } else {
              /* Trapped on Source side bouncing gently off the barrier */
              ed.x += Math.sin(t * 3 + e) * dt * 16;
              if (ed.x > -24) ed.x = -102 + Math.random() * 58;
              if (ed.x < -104) ed.x = -96;
            }
          }
          ed.scatterFlash = Math.max(0, ed.scatterFlash - dt * 3.5);

          dummyM.position.set(ed.x, ed.y + Math.sin(t * 5 + e) * 0.6, ed.z);
          var esz = ed.scatterFlash > 0.1 ? (1.6 + ed.scatterFlash * 0.9) : (isOn ? 1.05 : (ed.tunneler ? 1.25 : 0.75));
          dummyM.scale.setScalar(esz);
          dummyM.rotation.set(0, 0, 0);
          dummyM.updateMatrix();
          mosElectrons.setMatrixAt(e, dummyM.matrix);

          if (ed.scatterFlash > 0.15) tmpColor.setHex(0xFF6B2B);      /* Phonon heat flash */
          else if (!isOn && ed.tunneler) tmpColor.setHex(0xFF2842);   /* Quantum leakage */
          else if (isOn) tmpColor.setHex(0x4FF0FF);                   /* High-speed conduction */
          else tmpColor.setHex(0x5A6E8C);                             /* Idle Source electrons */
          mosElectrons.setColorAt(e, tmpColor);
        }
        mosElectrons.instanceMatrix.needsUpdate = true;
        if (mosElectrons.instanceColor) mosElectrons.instanceColor.needsUpdate = true;
        paintMetricsHUD();
      }
    }

    /* Project 3D Engineering Callouts cleanly with collision avoidance */
    function paintCallouts() {
      var r = canvas.getBoundingClientRect();
      var w = r.width, h = r.height;
      if (w < 10 || h < 10) return;

      var activeList = [];
      Object.keys(domCallouts).forEach(function (k) {
        var c = domCallouts[k];
        var match = (c.mode === state.chapter) || (state.chapter === 'thermal' && k === 'tile_compute');
        if (!match) { c.el.style.opacity = '0'; return; }
        if (k === 'tile_ihs' && (state.explode < 0.15 || state.chapter === 'thermal')) {
          c.el.style.opacity = '0'; return;
        }
        projVec.copy(c.pos).project(camera);
        if (projVec.z > 1) { c.el.style.opacity = '0'; return; }
        activeList.push({
          el: c.el,
          x: (projVec.x * 0.5 + 0.5) * w,
          y: (-projVec.y * 0.5 + 0.5) * h,
          z: projVec.z
        });
      });

      var topSafe = (hudTopEl ? (hudTopEl.offsetHeight + 18) : 56);
      activeList.sort(function (a, b) { return a.z - b.z; });
      var taken = [];
      for (var i = 0; i < activeList.length; i++) {
        var it = activeList[i];
        var lw = it.el.offsetWidth || 110, lh = it.el.offsetHeight || 24;
        var lx = Math.max(lw / 2 + 10, Math.min(w - lw / 2 - 10, it.x));
        var by = Math.max(lh / 2 + topSafe, Math.min(h - lh / 2 - 14, it.y));
        var bestY = null;
        for (var s = 0; s < 5 && bestY === null; s++) {
          var cy = by + (s === 0 ? 0 : (s % 2 ? -1 : 1) * Math.ceil(s / 2) * (lh + 5));
          if (cy < lh / 2 + topSafe || cy > h - lh / 2 - 10) continue;
          var clash = false;
          for (var t = 0; t < taken.length; t++) {
            var q = taken[t];
            if (Math.abs(lx - q.x) < (lw + q.w) * 0.5 + 5 && Math.abs(cy - q.y) < (lh + q.h) * 0.5 + 4) {
              clash = true; break;
            }
          }
          if (!clash) bestY = cy;
        }
        if (bestY === null) { it.el.style.opacity = '0'; continue; }
        taken.push({ x: lx, y: bestY, w: lw, h: lh });
        it.el.style.opacity = '1';
        it.el.style.transform = 'translate(-50%,-50%) translate(' + lx.toFixed(1) + 'px,' + bestY.toFixed(1) + 'px)';
      }
    }

    function draw(dt) {
      if (!renderer || !scene || !camera) return;
      clock += dt;
      orbit.update(dt);
      updateScene(dt, clock);
      renderer.render(scene, camera);
      paintCallouts();
    }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
      lastTs = ts;
      if (dt >= 0.049) { if (++slowFrames > 90) { pause(); return; } }
      else if (slowFrames) slowFrames--;
      draw(dt);
    }

    function play() {
      if (!state.ready || state.running || state.dead) return;
      state.running = true; lastTs = 0; slowFrames = 0;
      raf = requestAnimationFrame(frame);
      paintPlay();
    }
    function pause() {
      if (!state.running) return;
      state.running = false;
      cancelAnimationFrame(raf); raf = 0;
      paintPlay();
    }

    var resizeQ = 0;
    function onResize() {
      if (resizeQ) return;
      resizeQ = requestAnimationFrame(function () {
        resizeQ = 0;
        if (!renderer || !camera) return;
        var r = canvas.getBoundingClientRect();
        var rw = Math.max(1, Math.round(r.width));
        var rh = Math.max(1, Math.round(r.height));
        renderer.setSize(rw, rh, false);
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        if (!state.running) draw(0);
      });
    }

    function boot() {
      if (state.ready || state.dead) return;
      if (!hasWebGL()) {
        state.dead = true;
        if (noteOverlay) {
          noteOverlay.hidden = false;
          noteOverlay.innerHTML = '<b>این آزمایشگاه سه‌بعدی به WebGL نیاز دارد</b>مرورگر شما WebGL را فعال نکرده؛ شرح کامل مهندسی، معادلات و پرسش‌های پرتکرار پایین همین صفحه موجود است.';
        }
        return;
      }
      loadThree().then(function (T) {
        THREE = T;
        var r = canvas.getBoundingClientRect();
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
        renderer.setSize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)), false);
        if ('outputEncoding' in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
        if ('ACESFilmicToneMapping' in THREE) {
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 0.96;
        }

        buildScene();
        orbit = createOrbitRig();
        state.ready = true;
        if (noteOverlay) noteOverlay.hidden = true;
        syncSliders();
        setChapter(state.chapter, false);
        draw(0);
        if (visible) { state.running = false; play(); }
        else { state.running = false; paintPlay(); }
      }).catch(function (err) {
        state.dead = true;
        console.warn('[navidix/inside-a-cpu]', err);
      });
    }

    if ('IntersectionObserver' in global) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          visible = en.isIntersecting;
          if (visible) { state.ready ? play() : boot(); }
          else pause();
        });
      }, { rootMargin: '220px 0px' }).observe(stage);
    } else {
      visible = true; boot();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause();
      else if (visible && state.ready) play();
    });

    if ('ResizeObserver' in global) new ResizeObserver(onResize).observe(canvas);
    else global.addEventListener('resize', onResize);

    syncSliders();
    paintSystemPanel();
    paintAdderPanel();
    paintTransistorPanel();
    setChapter(state.chapter, false);

    var api = {
      setChapter: setChapter,
      openInspector: openInspector,
      closeInspector: closeInspector,
      toggleFullscreen: toggleFullscreen,
      advancePipelineTick: advancePipelineTick
    };
    global.NVXCPULab.api = api;
    return api;
  }

  global.NVXCPULab = { mount: mountCPULab, api: null };
})(window);
