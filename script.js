/**
 * COIL RING ACCELERATOR — PRESENTACIÓN INTERACTIVA CIENTÍFICA
 * Grado 11° // Física Escolar
 * 100% Vanilla JavaScript // Cero dependencias externas
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SISTEMA CENTRAL DE NAVEGACIÓN Y PRESENTACIÓN
  // =========================================================================
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  const hudCurrentSlide = document.getElementById('hud-current-slide');
  const hudProgressBar = document.getElementById('hud-progress-bar');
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  const navDotsContainer = document.getElementById('nav-dots-container');
  const drawerList = document.getElementById('drawer-list');
  const menuDrawer = document.getElementById('menu-drawer');
  const btnMenuDrawer = document.getElementById('btn-menu-drawer');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const fsIndicator = document.getElementById('fs-indicator');
  const btnStartPresentation = document.getElementById('btn-start-presentation');

  // Nombres de cada diapositiva para el menú de índice
  const slideTitles = [
    "01. Portada del Proyecto",
    "02. ¿Qué Problema Queremos Estudiar?",
    "03. ¿Qué es un Coil Ring Accelerator?",
    "04. Principio Físico del Electromagnetismo",
    "05. ¿Cómo Funciona el Acelerador? (Simulación)",
    "06. Componentes del Proyecto",
    "07. Sistema de Medición Temporal",
    "08. ¿Cómo Calculamos la Velocidad?",
    "09. Arduino y los Sensores",
    "10. Software de Medición y Telemetría",
    "11. Datos Experimentales y Gráfica",
    "12. Experimento en Tiempo Real (Consola)",
    "13. Teoría vs. Experimento",
    "14. Posibles Análisis Físicos",
    "15. Conclusiones y ¿Qué Aprendimos?",
    "16. Demostración Final y Preguntas"
  ];

  // Construir puntos de paginación (dots) e índice
  slides.forEach((_, idx) => {
    const slideNum = idx + 1;

    // Dot
    const dot = document.createElement('div');
    dot.className = `nav-dot ${slideNum === 1 ? 'active' : ''}`;
    dot.title = `Ir a diapositiva ${slideNum}`;
    dot.addEventListener('click', () => goToSlide(slideNum));
    navDotsContainer.appendChild(dot);

    // Item del drawer
    const item = document.createElement('div');
    item.className = `drawer-item ${slideNum === 1 ? 'active' : ''}`;
    item.innerHTML = `
      <span class="drawer-item-num">${String(slideNum).padStart(2, '0')}</span>
      <span>${slideTitles[idx] || `Diapositiva ${slideNum}`}</span>
    `;
    item.addEventListener('click', () => {
      goToSlide(slideNum);
      closeDrawer();
    });
    drawerList.appendChild(item);
  });

  const dots = document.querySelectorAll('.nav-dot');
  const drawerItems = document.querySelectorAll('.drawer-item');

  function updateHUD() {
    hudCurrentSlide.textContent = String(currentSlide).padStart(2, '0');
    const progressPercent = (currentSlide / totalSlides) * 100;
    hudProgressBar.style.width = `${progressPercent}%`;

    // Actualizar botones de navegación
    btnPrev.disabled = (currentSlide === 1);
    btnNext.disabled = (currentSlide === totalSlides);

    // Actualizar dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentSlide);
    });

    // Actualizar items del drawer
    drawerItems.forEach((item, idx) => {
      item.classList.toggle('active', idx + 1 === currentSlide);
    });
  }

  function goToSlide(targetNum) {
    if (targetNum < 1 || targetNum > totalSlides) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = targetNum;
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    if (activeSlide) {
      activeSlide.classList.add('active');
      activeSlide.scrollTop = 0;
    }
    updateHUD();

    // Disparar renderizado en diapositivas con gráficas o lienzos específicos
    if (currentSlide === 11) {
      renderExperimentalChart();
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  }

  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  if (btnStartPresentation) {
    btnStartPresentation.addEventListener('click', () => goToSlide(2));
  }

  // Atajos de Teclado
  window.addEventListener('keydown', (e) => {
    // Si el foco está en un textarea o input numérico, no cambiar diapositivas con flechas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleDrawer();
    } else if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  });

  // Drawer de índice
  function openDrawer() { menuDrawer.classList.add('open'); }
  function closeDrawer() { menuDrawer.classList.remove('open'); }
  function toggleDrawer() { menuDrawer.classList.toggle('open'); }

  btnMenuDrawer.addEventListener('click', toggleDrawer);
  btnCloseDrawer.addEventListener('click', closeDrawer);

  // Modo Presentación (Pantalla Completa)
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Error al activar pantalla completa:', err);
      });
      document.body.classList.add('presentation-mode');
    } else {
      document.exitFullscreen().catch(() => {});
      document.body.classList.remove('presentation-mode');
    }
  }

  btnFullscreen.addEventListener('click', toggleFullscreen);
  if (fsIndicator) {
    fsIndicator.addEventListener('click', toggleFullscreen);
  }

  document.addEventListener('fullscreenchange', () => {
    const isFS = !!document.fullscreenElement;
    document.body.classList.toggle('presentation-mode', isFS);
    const label = document.getElementById('btn-fs-label');
    if (label) label.textContent = isFS ? 'Salir' : 'Presentación';
  });

  // Botones de la última diapositiva
  const btnFinalSim = document.getElementById('btn-final-sim');
  const btnFinalData = document.getElementById('btn-final-data');
  const btnFinalRestart = document.getElementById('btn-final-restart');

  if (btnFinalSim) btnFinalSim.addEventListener('click', () => goToSlide(12));
  if (btnFinalData) btnFinalData.addEventListener('click', () => goToSlide(11));
  if (btnFinalRestart) btnFinalRestart.addEventListener('click', () => goToSlide(1));

  // =========================================================================
  // 2. FONDO DINÁMICO DE PARTÍCULAS CUÁNTICAS Y CAMPO MAGNÉTICO
  // =========================================================================
  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  let bgParticles = [];
  const particleCount = 45;

  function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeBgCanvas);
  resizeBgCanvas();

  for (let i = 0; i < particleCount; i++) {
    bgParticles.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function drawBgCanvas() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    // Dibujar partículas y líneas de conexión electromagnéticas
    for (let i = 0; i < particleCount; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = bgCanvas.width;
      if (p.x > bgCanvas.width) p.x = 0;
      if (p.y < 0) p.y = bgCanvas.height;
      if (p.y > bgCanvas.height) p.y = 0;

      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      bgCtx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      bgCtx.fill();

      // Conexiones
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = bgParticles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          bgCtx.beginPath();
          bgCtx.moveTo(p.x, p.y);
          bgCtx.lineTo(p2.x, p2.y);
          bgCtx.strokeStyle = `rgba(0, 102, 255, ${0.18 * (1 - dist / 120)})`;
          bgCtx.lineWidth = 0.8;
          bgCtx.stroke();
        }
      }
    }
    requestAnimationFrame(drawBgCanvas);
  }
  drawBgCanvas();

  // =========================================================================
  // 3. SLIDE 1: CANVAS ANIMADO DE LA PORTADA
  // =========================================================================
  const coverCanvas = document.getElementById('cover-canvas');
  if (coverCanvas) {
    const ctx = coverCanvas.getContext('2d');
    let sphereX = 60;
    let sphereSpeed = 1.2;

    function renderCover() {
      ctx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
      const w = coverCanvas.width;
      const h = coverCanvas.height;
      const centerY = h / 2;

      // Pista guía metálica
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(30, centerY - 14);
      ctx.lineTo(w - 30, centerY - 14);
      ctx.moveTo(30, centerY + 14);
      ctx.lineTo(w - 30, centerY + 14);
      ctx.stroke();

      // Bobinas concéntricas
      const coils = [180, 360, 540];
      coils.forEach((cx, idx) => {
        const isNear = Math.abs(sphereX - cx) < 60;
        ctx.strokeStyle = isNear ? '#00f0ff' : 'rgba(0, 102, 255, 0.5)';
        ctx.lineWidth = isNear ? 6 : 4;
        ctx.shadowColor = isNear ? '#00f0ff' : 'transparent';
        ctx.shadowBlur = isNear ? 20 : 0;

        // Anillo de la bobina
        ctx.beginPath();
        ctx.ellipse(cx, centerY, 18, 38, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Líneas de campo magnético si la esfera está cerca
        if (isNear) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.ellipse(cx, centerY, 32, 58, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx, centerY, 46, 75, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
      ctx.shadowBlur = 0;

      // Sensores al final
      const sensorA = 700;
      const sensorB = 780;

      [sensorA, sensorB].forEach((sx, idx) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(sx - 4, centerY - 32, 8, 12);
        ctx.fillRect(sx - 4, centerY + 20, 8, 12);

        // Haz óptico láser
        ctx.strokeStyle = (Math.abs(sphereX - sx) < 14) ? '#00ff88' : 'rgba(0, 255, 136, 0.4)';
        ctx.lineWidth = (Math.abs(sphereX - sx) < 14) ? 3 : 1;
        ctx.beginPath();
        ctx.moveTo(sx, centerY - 20);
        ctx.lineTo(sx, centerY + 20);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '10px monospace';
        ctx.fillText(idx === 0 ? 'S_A' : 'S_B', sx - 8, centerY - 38);
      });

      // Esfera metálica en avance continuo
      sphereX += sphereSpeed;
      if (sphereX > w - 40) sphereX = 50;

      // Estela de la esfera
      const grad = ctx.createRadialGradient(sphereX, centerY, 2, sphereX, centerY, 14);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.4, '#a8e6cf');
      grad.addColorStop(1, '#0066ff');

      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sphereX, centerY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderCover);
    }
    renderCover();
  }

  // =========================================================================
  // 4. SLIDE 2: ANIMACIÓN PREGUNTA PROBLEMA (LENTO -> ACELERADO)
  // =========================================================================
  const canvasS2 = document.getElementById('canvas-slide-2');
  if (canvasS2) {
    const ctx = canvasS2.getContext('2d');
    let s2X = 50;
    let s2Vel = 0.8;

    function renderS2() {
      ctx.clearRect(0, 0, canvasS2.width, canvasS2.height);
      const w = canvasS2.width;
      const centerY = canvasS2.height / 2;

      // Guía
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, centerY);
      ctx.lineTo(w - 40, centerY);
      ctx.stroke();

      // Bobina impulsora en el centro
      const coilX = w / 2;
      const isEnergized = (s2X > coilX - 100 && s2X < coilX + 20);

      ctx.strokeStyle = isEnergized ? '#00f0ff' : 'rgba(0, 102, 255, 0.4)';
      ctx.lineWidth = isEnergized ? 5 : 3;
      ctx.shadowColor = isEnergized ? '#00f0ff' : 'transparent';
      ctx.shadowBlur = isEnergized ? 25 : 0;
      ctx.beginPath();
      ctx.ellipse(coilX, centerY, 18, 36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Dinámica de aceleración
      if (s2X < coilX) {
        s2Vel = 0.8; // Inicialmente lenta
        if (s2X > coilX - 120) {
          s2Vel += 0.12; // Acelera por fuerza magnética
        }
      } else {
        s2Vel = 4.2; // Rápida después del pulso
      }

      s2X += s2Vel;
      if (s2X > w - 40) s2X = 50;

      // Rótulos de estado
      ctx.fillStyle = s2X < coilX ? 'rgba(255, 255, 255, 0.7)' : 'var(--cyan-primary)';
      ctx.font = '11px monospace';
      ctx.fillText(s2X < coilX ? 'Velocidad inicial baja (v₀)' : '¡Aceleración electromagnética (v₁)!', s2X - 40, centerY - 24);

      // Esfera
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(s2X, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderS2);
    }
    renderS2();
  }

  // =========================================================================
  // 5. SLIDE 3: DIAGRAMA INTERACTIVO DE ANATOMÍA DE LA BOBINA
  // =========================================================================
  const canvasS3 = document.getElementById('canvas-slide-3');
  const targetTabs = document.querySelectorAll('.target-tab');
  const coilDetailTag = document.getElementById('coil-detail-tag');
  const coilDetailTitle = document.getElementById('coil-detail-title');
  const coilDetailDesc = document.getElementById('coil-detail-desc');
  const coilDetailRole = document.getElementById('coil-detail-role');

  const coilInfoData = {
    bobina: {
      tag: "COMPONENTE: BOBINA",
      title: "Bobina Cilíndrica (Solenoide)",
      desc: "Espiras de alambre de cobre esmaltado enrolladas firmemente alrededor del tubo guía. Al energizarse con corriente eléctrica, el principio de Ampère produce un campo magnético axial concentrado en el interior.",
      role: "Fuente motriz principal que crea el gradiente de fuerza para impulsar la esfera."
    },
    campo: {
      tag: "FENÓMENO: CAMPO MAGNÉTICO",
      title: "Campo Magnético Concentrado (B)",
      desc: "Las líneas de flujo magnético emergen por un extremo y entran por el otro formando un circuito cerrado. El núcleo hueco concentra una gran densidad de flujo.",
      role: "Ejerce una intensa fuerza de atracción sobre la esfera mientras esta se aproxime al centro de la bobina."
    },
    esfera: {
      tag: "OBJETO: ESFERA METÁLICA",
      title: "Esfera Ferromagnética",
      desc: "Esfera de acero u otro material ferromagnético de masa conocida. Al ingresar al campo magnético, se magnetiza temporalmente y es atraída con gran fuerza hacia el punto de mayor densidad de campo.",
      role: "Elemento de prueba cuyo movimiento, tiempo de tránsito y velocidad son medidos por el sistema Arduino."
    },
    control: {
      tag: "SISTEMA: CONTROL Y CONMUTACIÓN",
      title: "Sistema de Control y Conmutación",
      desc: "Módulo electrónico que desconecta la corriente en el milisegundo exacto en que la esfera alcanza el centro de la bobina, evitando el indeseado efecto de frenado electromagnético.",
      role: "Garantiza que la aceleración impartida sea unidireccional y eficiente."
    }
  };

  let activeTarget = 'bobina';

  targetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      targetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTarget = tab.dataset.target;
      const data = coilInfoData[activeTarget];
      if (data) {
        coilDetailTag.textContent = data.tag;
        coilDetailTitle.textContent = data.title;
        coilDetailDesc.textContent = data.desc;
        coilDetailRole.innerHTML = `<strong>Rol en el proyecto:</strong> ${data.role}`;
      }
    });
  });

  if (canvasS3) {
    const ctx = canvasS3.getContext('2d');
    let angle = 0;

    function renderS3() {
      ctx.clearRect(0, 0, canvasS3.width, canvasS3.height);
      const cx = canvasS3.width / 2;
      const cy = canvasS3.height / 2;
      angle += 0.02;

      // Pista guía
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(40, cy);
      ctx.lineTo(canvasS3.width - 40, cy);
      ctx.stroke();

      // Espiras de la bobina
      const coilLeft = cx - 60;
      const coilWidth = 120;
      for (let x = coilLeft; x <= coilLeft + coilWidth; x += 15) {
        ctx.strokeStyle = (activeTarget === 'bobina') ? '#00f0ff' : 'rgba(0, 102, 255, 0.6)';
        ctx.lineWidth = (activeTarget === 'bobina') ? 5 : 3;
        ctx.beginPath();
        ctx.ellipse(x, cy, 8, 35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Líneas de campo magnético si campo está activo o bobina
      if (activeTarget === 'campo' || activeTarget === 'bobina') {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.ellipse(cx, cy, 90, 50, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx, cy, 120, 68, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Esfera ferromagnética
      const sphereX = (activeTarget === 'esfera') ? cx + Math.sin(angle) * 35 : cx - 80;
      ctx.fillStyle = (activeTarget === 'esfera') ? '#ffffff' : '#8899b0';
      ctx.shadowColor = (activeTarget === 'esfera') ? '#00f0ff' : 'transparent';
      ctx.shadowBlur = (activeTarget === 'esfera') ? 15 : 0;
      ctx.beginPath();
      ctx.arc(sphereX, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderS3);
    }
    renderS3();
  }

  // =========================================================================
  // 6. SLIDE 4: VISUALIZADOR DE LÍNEAS DE CAMPO MAGNÉTICO
  // =========================================================================
  const canvasS4 = document.getElementById('canvas-slide-4');
  if (canvasS4) {
    const ctx = canvasS4.getContext('2d');
    let t = 0;

    function renderS4() {
      ctx.clearRect(0, 0, canvasS4.width, canvasS4.height);
      const cx = canvasS4.width / 2;
      const cy = canvasS4.height / 2;
      t += 0.03;

      // Bobina central en corte
      ctx.fillStyle = 'rgba(0, 102, 255, 0.4)';
      ctx.fillRect(cx - 50, cy - 25, 100, 50);

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 50, cy - 25, 100, 50);

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('SOLENOIDE', cx - 30, cy + 4);

      // Líneas de flujo toroidal dinámicas
      for (let r = 35; r <= 85; r += 16) {
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.6 - (r / 150)})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -t * 15;

        // Bucle superior
        ctx.beginPath();
        ctx.ellipse(cx, cy - 25, r * 1.4, r * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Bucle inferior
        ctx.beginPath();
        ctx.ellipse(cx, cy + 25, r * 1.4, r * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      requestAnimationFrame(renderS4);
    }
    renderS4();
  }

  // =========================================================================
  // 7. SLIDE 5: SIMULADOR MULTIETAPA DEL ACELERADOR
  // =========================================================================
  const canvasS5 = document.getElementById('canvas-slide-5');
  const btnSim5Start = document.getElementById('btn-sim5-start');
  const btnSim5Pause = document.getElementById('btn-sim5-pause');
  const btnSim5Reset = document.getElementById('btn-sim5-reset');
  const btnSim5Speed = document.getElementById('btn-sim5-speed');
  const sim5Telemetry = document.getElementById('sim5-telemetry');

  if (canvasS5) {
    const ctx = canvasS5.getContext('2d');
    let s5Running = false;
    let s5SpeedMult = 1.0;
    let s5SphereX = 40;
    let s5Vel = 1.0;
    let s5Stage = 1;

    const s5Coils = [250, 550, 850];

    function resetS5() {
      s5SphereX = 40;
      s5Vel = 1.0;
      s5Stage = 1;
      s5Running = false;
      sim5Telemetry.textContent = "ESTADO: LISTO // ETAPA 0";
    }

    btnSim5Start.addEventListener('click', () => { s5Running = true; });
    btnSim5Pause.addEventListener('click', () => { s5Running = false; });
    btnSim5Reset.addEventListener('click', resetS5);

    btnSim5Speed.addEventListener('click', () => {
      if (s5SpeedMult === 1.0) s5SpeedMult = 1.8;
      else if (s5SpeedMult === 1.8) s5SpeedMult = 0.5;
      else s5SpeedMult = 1.0;
      btnSim5Speed.textContent = `VELOCIDAD: ${s5SpeedMult}X`;
    });

    function renderS5() {
      ctx.clearRect(0, 0, canvasS5.width, canvasS5.height);
      const w = canvasS5.width;
      const centerY = canvasS5.height / 2;

      // Pista
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, centerY - 14);
      ctx.lineTo(w - 20, centerY - 14);
      ctx.moveTo(20, centerY + 14);
      ctx.lineTo(w - 20, centerY + 14);
      ctx.stroke();

      // Bobinas en serie
      s5Coils.forEach((cx, idx) => {
        const dist = cx - s5SphereX;
        const isActive = (dist > -10 && dist < 120 && s5Running);

        ctx.strokeStyle = isActive ? '#00f0ff' : 'rgba(0, 102, 255, 0.4)';
        ctx.lineWidth = isActive ? 6 : 3;
        ctx.shadowColor = isActive ? '#00f0ff' : 'transparent';
        ctx.shadowBlur = isActive ? 22 : 0;

        ctx.beginPath();
        ctx.ellipse(cx, centerY, 16, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isActive ? '#00f0ff' : 'rgba(255, 255, 255, 0.5)';
        ctx.font = '11px monospace';
        ctx.fillText(`BOBINA ${idx + 1}`, cx - 26, centerY - 50);

        if (isActive) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.ellipse(cx, centerY, 34, 60, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
      ctx.shadowBlur = 0;

      // Movimiento y física simulada
      if (s5Running) {
        // Aceleración cerca de bobinas
        s5Coils.forEach((cx, idx) => {
          const dist = cx - s5SphereX;
          if (dist > 0 && dist < 120) {
            s5Vel += 0.08 * s5SpeedMult;
            s5Stage = idx + 1;
            sim5Telemetry.textContent = `PULSO EN BOBINA ${idx + 1} // ACELERANDO (v = ${(s5Vel * 0.25).toFixed(2)} m/s)`;
          } else if (dist <= 0 && dist > -30) {
            sim5Telemetry.textContent = `CORTE BOBINA ${idx + 1} // INERCIA LIBRE`;
          }
        });

        s5SphereX += s5Vel * s5SpeedMult;

        if (s5SphereX > w - 40) {
          s5Running = false;
          sim5Telemetry.textContent = `FINAL DE PISTA // VELOCIDAD FINAL: ${(s5Vel * 0.25).toFixed(2)} m/s`;
        }
      }

      // Esfera
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s5SphereX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderS5);
    }
    renderS5();
  }

  // =========================================================================
  // 8. SLIDE 6: COMPONENTES Y MODAL DETALLADO
  // =========================================================================
  const compCards = document.querySelectorAll('.comp-card');
  const compModal = document.getElementById('comp-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalFunction = document.getElementById('modal-function');
  const modalImportance = document.getElementById('modal-importance');

  const componentsData = {
    bobinas: {
      name: "Bobinas Electromagnéticas",
      badge: "ELECTROMAGNETISMO",
      func: "Espiras de alambre de cobre barnizado enrolladas cilíndricamente. Al circular corriente por ellas generan un fuerte campo magnético axial.",
      imp: "Es el componente motor que genera la fuerza de Lorentz / gradiente magnético de atracción para poner en movimiento la esfera."
    },
    esfera: {
      name: "Esfera Ferromagnética",
      badge: "CINEMÁTICA",
      func: "Objeto esférico de prueba fabricado en material ferromagnético susceptible a las líneas de fuerza del campo magnético.",
      imp: "Representa la masa acelerada y el objeto central cuyas marcas de tiempo y velocidad son objeto de medición."
    },
    arduino: {
      name: "Microcontrolador Arduino",
      badge: "ELECTRÓNICA & CÓDIGO",
      func: "Placa programable que ejecuta un algoritmo cronométrico en microsegundos y gestiona la comunicación serial hacia el computador.",
      imp: "Garantiza mediciones de tiempo de alta precisión (resolución de 4 μs) sin los sesgos humanos de un cronómetro manual."
    },
    sensorA: {
      name: "Sensor Óptico A (Comienzo t₀)",
      badge: "SENSOR ÓPTICO",
      func: "Emisor y receptor infrarrojo o fotodiodo. Detecta el instante exacto en que la esfera interrumpe el haz luminoso frontal.",
      imp: "Marca el punto cero temporal (t₀) para iniciar el cronómetro de tránsito de la esfera."
    },
    sensorB: {
      name: "Sensor Óptico B (Final t₁)",
      badge: "SENSOR ÓPTICO",
      func: "Segundo sensor óptico ubicado a una distancia fija calibrada respecto a A. Captura el momento exacto en que la esfera completa el tramo.",
      imp: "Marca el tiempo final (t₁) para calcular el intervalo exacto de viaje (Δt = t₁ − t₀)."
    },
    cableado: {
      name: "Cableado y Conmutación",
      badge: "CIRCUITOS",
      func: "Conductores eléctricos y transistores/relés de conmutación rápida encargados de transportar la alta corriente necesaria para las bobinas.",
      imp: "Permite una conmutación limpia y rápida sin caídas de tensión excesivas que atenúen el campo magnético."
    },
    fuente: {
      name: "Fuente de Poder / Alimentación",
      badge: "ENERGÍA",
      func: "Suministro eléctrico regulado para entregar el voltaje y amperaje instantáneo requerido por las bobinas y el Arduino.",
      imp: "La aceleración alcanzada depende de la energía disponible en el pulso eléctrico de disparo."
    },
    pista: {
      name: "Estructura y Riel Guía",
      badge: "MECÁNICA",
      func: "Canal o tubo no magnético (acrílico, plástico o aluminio no ferromagnético) que guía la esfera en una trayectoria lineal.",
      imp: "Asegura que el movimiento sea estrictamente unidireccional y que la esfera cruce los haces ópticos de forma centrada."
    },
    pc: {
      name: "Computador / Interfaz Gráfica",
      badge: "TELEMETRÍA",
      func: "Equipo receptor del flujo de datos serial emitido por el Arduino para su procesamiento, almacenamiento y graficación.",
      imp: "Permite a los estudiantes y evaluadores ver los datos de velocidad y tiempo en tiempo real de manera profesional."
    }
  };

  compCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.comp;
      const data = componentsData[key];
      if (data) {
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.name;
        modalFunction.textContent = data.func;
        modalImportance.textContent = data.imp;
        compModal.classList.add('active');
      }
    });
  });

  function closeModal() { compModal.classList.remove('active'); }
  btnCloseModal.addEventListener('click', closeModal);
  compModal.addEventListener('click', (e) => {
    if (e.target === compModal) closeModal();
  });

  // Dropzones para fotografías reales
  const photoSlots = document.querySelectorAll('.photo-slot');
  photoSlots.forEach(slot => {
    const input = slot.querySelector('.photo-file-input');
    const preview = slot.querySelector('.photo-slot-preview');
    const btnRemove = slot.querySelector('.photo-slot-remove');

    slot.addEventListener('click', (e) => {
      if (e.target === btnRemove) {
        e.stopPropagation();
        slot.classList.remove('has-image');
        preview.src = '';
        input.value = '';
        return;
      }
      input.click();
    });

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          slot.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      }
    });

    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('dragover');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('dragover');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.src = ev.target.result;
          slot.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // =========================================================================
  // 9. SLIDE 7: SISTEMA CRONOMÉTRICO SENSOR A ---- d ---- SENSOR B
  // =========================================================================
  const canvasS7 = document.getElementById('canvas-slide-7');
  if (canvasS7) {
    const ctx = canvasS7.getContext('2d');
    let sphereX = 120;
    let timingActive = false;
    let timerVal = 0;

    function renderS7() {
      ctx.clearRect(0, 0, canvasS7.width, canvasS7.height);
      const w = canvasS7.width;
      const centerY = canvasS7.height / 2;

      // Pista
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, centerY - 14);
      ctx.lineTo(w - 80, centerY - 14);
      ctx.moveTo(80, centerY + 14);
      ctx.lineTo(w - 80, centerY + 14);
      ctx.stroke();

      const sensorAX = 320;
      const sensorBX = 780;

      // Distancia d
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sensorAX, centerY + 45);
      ctx.lineTo(sensorBX, centerY + 45);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'var(--cyan-primary)';
      ctx.font = '12px monospace';
      ctx.fillText('Distancia conocida (d = 0.10 m)', (sensorAX + sensorBX) / 2 - 90, centerY + 62);

      // Sensor A
      const isSensorAHit = (Math.abs(sphereX - sensorAX) < 14);
      ctx.strokeStyle = isSensorAHit ? '#00ff88' : 'rgba(0, 255, 136, 0.5)';
      ctx.lineWidth = isSensorAHit ? 4 : 2;
      ctx.beginPath();
      ctx.moveTo(sensorAX, centerY - 30);
      ctx.lineTo(sensorAX, centerY + 30);
      ctx.stroke();

      ctx.fillStyle = isSensorAHit ? '#00ff88' : '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('SENSOR A (t₀)', sensorAX - 36, centerY - 40);

      // Sensor B
      const isSensorBHit = (Math.abs(sphereX - sensorBX) < 14);
      ctx.strokeStyle = isSensorBHit ? '#00ff88' : 'rgba(0, 255, 136, 0.5)';
      ctx.lineWidth = isSensorBHit ? 4 : 2;
      ctx.beginPath();
      ctx.moveTo(sensorBX, centerY - 30);
      ctx.lineTo(sensorBX, centerY + 30);
      ctx.stroke();

      ctx.fillStyle = isSensorBHit ? '#00ff88' : '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('SENSOR B (t₁)', sensorBX - 36, centerY - 40);

      // Control del cronómetro animado
      if (sphereX >= sensorAX && sphereX <= sensorBX) {
        timingActive = true;
        timerVal += 0.003;
      } else if (sphereX > sensorBX) {
        timingActive = false;
      }

      // Display de cronómetro flotante
      ctx.fillStyle = timingActive ? '#00ff88' : 'var(--cyan-primary)';
      ctx.font = '14px monospace';
      ctx.fillText(`Δt cronometrado: ${timerVal.toFixed(3)} s`, (sensorAX + sensorBX) / 2 - 80, centerY - 35);

      sphereX += 2.2;
      if (sphereX > w - 60) {
        sphereX = 120;
        timerVal = 0;
        timingActive = false;
      }

      // Esfera
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sphereX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderS7);
    }
    renderS7();
  }

  // =========================================================================
  // 10. SLIDE 8: CALCULADORA DE VELOCIDAD
  // =========================================================================
  const calcDist = document.getElementById('calc-dist');
  const calcTime = document.getElementById('calc-time');
  const calcOutMs = document.getElementById('calc-out-ms');
  const calcOutKmh = document.getElementById('calc-out-kmh');
  const lblDistVal = document.getElementById('lbl-dist-val');
  const lblTimeVal = document.getElementById('lbl-time-val');
  const calcPresetBtns = document.querySelectorAll('.calc-preset-btn');

  function updateCalculator() {
    const d = parseFloat(calcDist.value) || 0;
    const t = parseFloat(calcTime.value) || 0;

    lblDistVal.textContent = `${d.toFixed(2)} m (${(d * 100).toFixed(0)} cm)`;
    lblTimeVal.textContent = `${t.toFixed(3)} s`;

    if (t > 0 && d > 0) {
      const vMs = d / t;
      const vKmh = vMs * 3.6;
      calcOutMs.textContent = vMs.toFixed(3);
      calcOutKmh.textContent = vKmh.toFixed(3);
    } else {
      calcOutMs.textContent = "0.000";
      calcOutKmh.textContent = "0.000";
    }
  }

  calcDist.addEventListener('input', updateCalculator);
  calcTime.addEventListener('input', updateCalculator);

  calcPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcDist.value = btn.dataset.d;
      calcTime.value = btn.dataset.t;
      updateCalculator();
    });
  });

  // =========================================================================
  // 11. SLIDE 11: TABLA EXPERIMENTAL Y GRÁFICA DINÁMICA OFFLINE EN CANVAS
  // =========================================================================
  let experimentalData = [
    { run: 1, time: 0.350, dist: 0.10, isExample: true },
    { run: 2, time: 0.342, dist: 0.10, isExample: true },
    { run: 3, time: 0.338, dist: 0.10, isExample: true },
    { run: 4, time: 0.345, dist: 0.10, isExample: true },
    { run: 5, time: 0.330, dist: 0.10, isExample: true }
  ];

  const expTableBody = document.getElementById('exp-table-body');
  const tblInputT = document.getElementById('tbl-input-t');
  const tblInputD = document.getElementById('tbl-input-d');
  const btnAddRow = document.getElementById('btn-add-row');
  const btnClearData = document.getElementById('btn-clear-data');
  const canvasChart = document.getElementById('canvas-chart');
  const chartTitle = document.getElementById('chart-title');
  const btnChartSpeed = document.getElementById('btn-chart-speed');
  const btnChartTime = document.getElementById('btn-chart-time');

  let activeChartMode = 'speed'; // 'speed' o 'time'

  function renderTable() {
    expTableBody.innerHTML = '';
    experimentalData.forEach(row => {
      const speedMs = row.dist / row.time;
      const speedKmh = speedMs * 3.6;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.run} ${row.isExample ? '<span style="font-size:0.65rem; color:var(--amber-warning);">[EJ]</span>' : '<span style="font-size:0.65rem; color:var(--green-laser);">[REAL]</span>'}</td>
        <td>${row.time.toFixed(3)}</td>
        <td>${row.dist.toFixed(2)}</td>
        <td style="color:var(--cyan-primary);">${speedMs.toFixed(3)}</td>
        <td style="color:var(--green-laser);">${speedKmh.toFixed(3)}</td>
      `;
      expTableBody.appendChild(tr);
    });
    renderExperimentalChart();
  }

  function renderExperimentalChart() {
    if (!canvasChart) return;
    const ctx = canvasChart.getContext('2d');
    const w = canvasChart.width;
    const h = canvasChart.height;

    ctx.clearRect(0, 0, w, h);

    if (experimentalData.length === 0) {
      ctx.fillStyle = 'var(--text-muted)';
      ctx.font = '12px monospace';
      ctx.fillText('Sin datos para graficar', w / 2 - 60, h / 2);
      return;
    }

    const padLeft = 45;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 30;

    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    // Obtener valores
    const values = experimentalData.map(d => {
      return activeChartMode === 'speed' ? (d.dist / d.time) : d.time;
    });

    const maxVal = Math.max(...values) * 1.25 || 1;
    const minVal = 0;

    // Ejes y rejilla
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padTop + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();

      const labelVal = maxVal - (maxVal / gridLines) * i;
      ctx.fillStyle = 'var(--text-dim)';
      ctx.font = '9px monospace';
      ctx.fillText(labelVal.toFixed(2), 10, y + 3);
    }

    // Dibujar línea continua de datos
    ctx.beginPath();
    experimentalData.forEach((d, idx) => {
      const x = padLeft + (idx / Math.max(experimentalData.length - 1, 1)) * chartW;
      const y = padTop + chartH - (values[idx] / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = activeChartMode === 'speed' ? '#00f0ff' : '#00ff88';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Puntos
    experimentalData.forEach((d, idx) => {
      const x = padLeft + (idx / Math.max(experimentalData.length - 1, 1)) * chartW;
      const y = padTop + chartH - (values[idx] / maxVal) * chartH;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Número de medición debajo
      ctx.fillStyle = 'var(--text-muted)';
      ctx.font = '9px monospace';
      ctx.fillText(`#${d.run}`, x - 6, h - 10);
    });
  }

  btnAddRow.addEventListener('click', () => {
    const t = parseFloat(tblInputT.value);
    const d = parseFloat(tblInputD.value);
    if (!t || t <= 0 || !d || d <= 0) {
      alert("Por favor ingresa valores válidos de tiempo y distancia.");
      return;
    }

    experimentalData.push({
      run: experimentalData.length + 1,
      time: t,
      dist: d,
      isExample: false
    });

    tblInputT.value = '';
    renderTable();
  });

  btnClearData.addEventListener('click', () => {
    experimentalData = [
      { run: 1, time: 0.350, dist: 0.10, isExample: true },
      { run: 2, time: 0.342, dist: 0.10, isExample: true },
      { run: 3, time: 0.338, dist: 0.10, isExample: true },
      { run: 4, time: 0.345, dist: 0.10, isExample: true },
      { run: 5, time: 0.330, dist: 0.10, isExample: true }
    ];
    renderTable();
  });

  btnChartSpeed.addEventListener('click', () => {
    activeChartMode = 'speed';
    btnChartSpeed.classList.add('active');
    btnChartTime.classList.remove('active');
    chartTitle.textContent = "Velocidad vs. Número de Medición";
    renderExperimentalChart();
  });

  btnChartTime.addEventListener('click', () => {
    activeChartMode = 'time';
    btnChartTime.classList.add('active');
    btnChartSpeed.classList.remove('active');
    chartTitle.textContent = "Tiempo de Tránsito vs. Número de Medición";
    renderExperimentalChart();
  });

  renderTable();

  // =========================================================================
  // 12. SLIDE 12: EXPERIMENTO EN TIEMPO REAL (PANEL DE LABORATORIO VIRTUAL)
  // =========================================================================
  const dotSensorA = document.getElementById('dot-sensor-a');
  const dotSensorB = document.getElementById('dot-sensor-b');
  const valSensorA = document.getElementById('val-sensor-a');
  const valSensorB = document.getElementById('val-sensor-b');
  const valRealtimeT = document.getElementById('val-realtime-t');
  const valRealtimeD = document.getElementById('val-realtime-d');
  const valRealtimeV = document.getElementById('val-realtime-v');
  const valRealtimeCount = document.getElementById('val-realtime-count');
  const btnTriggerRealtime = document.getElementById('btn-trigger-realtime');
  const canvasRealtime = document.getElementById('canvas-realtime-track');

  let rtSimActive = false;
  let rtSphereX = 40;
  let rtRunCount = 0;
  let rtStartTime = 0;
  let rtDistance = 0.10;

  if (canvasRealtime) {
    const ctx = canvasRealtime.getContext('2d');

    function renderRealtimeTrack() {
      ctx.clearRect(0, 0, canvasRealtime.width, canvasRealtime.height);
      const w = canvasRealtime.width;
      const centerY = canvasRealtime.height / 2;

      // Pista
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, centerY - 14);
      ctx.lineTo(w - 30, centerY - 14);
      ctx.moveTo(30, centerY + 14);
      ctx.lineTo(w - 30, centerY + 14);
      ctx.stroke();

      const sAX = 340;
      const sBX = 820;

      // Sensor A visual
      const isAHit = (Math.abs(rtSphereX - sAX) < 18);
      ctx.strokeStyle = isAHit ? '#00ff88' : 'rgba(0, 255, 136, 0.4)';
      ctx.lineWidth = isAHit ? 4 : 2;
      ctx.beginPath();
      ctx.moveTo(sAX, centerY - 28);
      ctx.lineTo(sAX, centerY + 28);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('SENSOR A', sAX - 26, centerY - 38);

      // Sensor B visual
      const isBHit = (Math.abs(rtSphereX - sBX) < 18);
      ctx.strokeStyle = isBHit ? '#00ff88' : 'rgba(0, 255, 136, 0.4)';
      ctx.lineWidth = isBHit ? 4 : 2;
      ctx.beginPath();
      ctx.moveTo(sBX, centerY - 28);
      ctx.lineTo(sBX, centerY + 28);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText('SENSOR B', sBX - 26, centerY - 38);

      // Lógica de simulación de paso
      if (rtSimActive) {
        rtSphereX += 4.5;

        // Disparo Sensor A
        if (rtSphereX >= sAX && rtSphereX < sAX + 25) {
          dotSensorA.classList.add('active');
          valSensorA.textContent = "ACTIVADO";
          valSensorA.style.color = "var(--green-laser)";
          if (rtStartTime === 0) rtStartTime = performance.now();
        }

        // Conteo del cronómetro
        if (rtStartTime > 0 && rtSphereX < sBX) {
          const elapsed = (performance.now() - rtStartTime) / 1000;
          valRealtimeT.textContent = elapsed.toFixed(6);
        }

        // Disparo Sensor B
        if (rtSphereX >= sBX && rtSphereX < sBX + 25) {
          dotSensorB.classList.add('active');
          valSensorB.textContent = "ACTIVADO";
          valSensorB.style.color = "var(--green-laser)";

          // Detener cronómetro y registrar
          const finalTimeSec = Math.max((performance.now() - rtStartTime) / 1000, 0.150);
          valRealtimeT.textContent = finalTimeSec.toFixed(6);

          const finalSpeed = rtDistance / finalTimeSec;
          valRealtimeV.textContent = finalSpeed.toFixed(3);

          rtRunCount++;
          valRealtimeCount.textContent = rtRunCount;

          // Inyectar en tabla experimental
          experimentalData.push({
            run: experimentalData.length + 1,
            time: parseFloat(finalTimeSec.toFixed(3)),
            dist: rtDistance,
            isExample: false
          });
          renderTable();

          rtSimActive = false;
        }

        if (rtSphereX > w - 40) {
          rtSimActive = false;
        }
      }

      // Esfera
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(rtSphereX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderRealtimeTrack);
    }
    renderRealtimeTrack();

    btnTriggerRealtime.addEventListener('click', () => {
      if (rtSimActive) return;
      rtSphereX = 40;
      rtStartTime = 0;
      rtSimActive = true;

      dotSensorA.classList.remove('active');
      dotSensorB.classList.remove('active');
      valSensorA.textContent = "ESPERANDO";
      valSensorA.style.color = "var(--text-dim)";
      valSensorB.textContent = "ESPERANDO";
      valSensorB.style.color = "var(--text-dim)";
      valRealtimeT.textContent = "0.000000";
      valRealtimeV.textContent = "0.000";
    });
  }

  // =========================================================================
  // 13. SLIDE 14: SIMULADOR DE VARIACIÓN DE DISTANCIA
  // =========================================================================
  const distSlider = document.getElementById('dist-slider');
  const distSliderVal = document.getElementById('dist-slider-val');
  const distTimePreview = document.getElementById('dist-time-preview');

  if (distSlider) {
    distSlider.addEventListener('input', () => {
      const d = parseFloat(distSlider.value);
      distSliderVal.textContent = d.toFixed(2);
      // Supongamos velocidad de 0.30 m/s
      const expectedT = d / 0.30;
      distTimePreview.textContent = `Δt esperado: ${expectedT.toFixed(3)} s`;
    });
  }

  // =========================================================================
  // 14. INICIALIZACIÓN
  // =========================================================================
  updateHUD();
});
