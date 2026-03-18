<template>
  <div class="crt-screen pointer-events-none absolute inset-0 overflow-hidden">
    <div class="crt-grid absolute inset-0" />

    <div class="crt-scanlines absolute inset-0" />

    <div class="crt-phosphor absolute inset-0" />

    <div class="crt-vignette absolute inset-0" />

    <div class="crt-beam absolute inset-x-0" />
  </div>
</template>

<style scoped>
.crt-screen {
  animation: flicker 10s step-end infinite;
}

.crt-grid {
  opacity: 0.14;
  background-image:
    linear-gradient(rgba(255, 154, 60, 0.45) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 154, 60, 0.45) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 92% 86% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 92% 86% at 50% 50%, black 40%, transparent 100%);
}

.crt-scanlines {
  opacity: 0.5;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.28) 2px,
    rgba(0, 0, 0, 0.28) 4px
  );
  mask-image: radial-gradient(ellipse 96% 90% at 50% 50%, black 50%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 96% 90% at 50% 50%, black 50%, transparent 100%);
}

.crt-phosphor {
  background:
    radial-gradient(ellipse 70% 58% at 50% 46%, rgba(255, 154, 60, 0.08) 0%, transparent 68%),
    radial-gradient(ellipse 38% 28% at 50% 38%, rgba(255, 230, 0, 0.06) 0%, transparent 55%);
}

.crt-vignette {
  background: radial-gradient(
    ellipse 84% 78% at 50% 50%,
    transparent 52%,
    rgba(15, 10, 8, 0.82) 100%
  );
  box-shadow: inset 0 0 140px rgba(15, 10, 8, 0.45);
}

.crt-beam {
  height: 8rem;
  top: -8rem;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 154, 60, 0.04) 50%,
    transparent 100%
  );
  animation: scan 9s linear infinite;
}

@keyframes scan {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(100vh + 8rem));
  }
}

@keyframes flicker {
  0%,
  89%,
  91%,
  93%,
  100% {
    opacity: 1;
  }
  90% {
    opacity: 0.94;
  }
  92% {
    opacity: 0.97;
  }
}
</style>
