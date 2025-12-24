(() => {
    const month = new Date().getMonth(); // 0=Jan ... 11=Dec
    if (month <=9 && month >=4) return;

    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;
  
    // Respect reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      canvas.style.display = "none";
      return;
    }
  
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
  
    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
  
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
  
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();
  
    const FLAKE_COUNT = 160;    // density
    const WIND = 0.25;          // drift
    const GRAV_MIN = 0.6;       // speed range
    const GRAV_MAX = 3.0;
  
    const rand = (min, max) => Math.random() * (max - min) + min;
  
    function spawn(initial = false) {
      const r = rand(1, 5);
      return {
        x: rand(0, w),
        y: initial ? rand(0, h) : -10,
        r,
        vy: rand(GRAV_MIN, GRAV_MAX) * (r / 2.2),
        vx: rand(-WIND, WIND),
        phase: rand(0, Math.PI * 2),
        sway: rand(0.2, 0.8),
        a: rand(0.4, 0.9),
      };
    }
  
    const flakes = Array.from({ length: FLAKE_COUNT }, () => spawn(true));

    // Function to draw a snowflake shape
    function drawSnowflake(x, y, radius, rotation, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Set shadow properties
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = radius * 0.8;
      ctx.shadowOffsetX = radius * 0.2;
      ctx.shadowOffsetY = radius * 0.2;
      
      ctx.beginPath();
      
      // Draw 6 main arms
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((Math.PI / 3) * i);
        
        // Main arm
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius);
        
        // Side branches on each arm
        const branchLength = radius * 0.4;
        const branchPos = radius * 0.6;
        
        // Left branch
        ctx.moveTo(0, -branchPos);
        ctx.lineTo(-branchLength * 0.5, -branchPos - branchLength * 0.3);
        ctx.lineTo(0, -branchPos);
        
        // Right branch
        ctx.moveTo(0, -branchPos);
        ctx.lineTo(branchLength * 0.5, -branchPos - branchLength * 0.3);
        ctx.lineTo(0, -branchPos);
        
        // Small branches near the tip
        ctx.moveTo(0, -radius * 0.85);
        ctx.lineTo(-branchLength * 0.3, -radius * 0.95);
        ctx.lineTo(0, -radius * 0.85);
        ctx.lineTo(branchLength * 0.3, -radius * 0.95);
        
        ctx.restore();
      }
      
      // Center circle
      ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = Math.max(0.5, radius * 0.15);
      ctx.stroke();
      ctx.fill();
      
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        f.phase += 0.01;
        f.x += f.vx + Math.sin(f.phase) * f.sway;
        f.y += f.vy;
        
        // Rotation based on phase for spinning effect
        const rotation = f.phase * 0.5;

        if (f.y > h + 10) flakes[i] = spawn(false);
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;

        // Draw snowflake shape instead of circle
        drawSnowflake(f.x, f.y, f.r, rotation, f.a);
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  })();
  