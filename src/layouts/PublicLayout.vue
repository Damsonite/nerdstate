<template>
  <div class="min-h-screen bg-background text-text">
    <header class="fixed top-0 z-50 w-full border-b border-muted/20 bg-surface/40 backdrop-blur-sm">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span class="font-display text-xl text-primary tracking-wider">
          NERD<span class="text-secondary">STATE</span>
        </span>

        <div class="flex items-center gap-6 font-mono text-muted">
          <a href="#featured" class="link">Featured</a>
          <a href="#about" class="link">About</a>
          <a href="#articles" class="link">Articles</a>
          <a href="#contribute" class="link">Contribute</a>
          <RouterLink to="/login" class="btn-primary">LOG IN</RouterLink>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="border-t border-muted/20 bg-surface/40 font-sans text-muted">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
          <!-- Brand -->
          <div class="flex flex-col gap-3">
            <span class="font-display text-xl text-primary tracking-wider">
              NERD<span class="text-secondary">STATE</span>
            </span>

            <p class="leading-relaxed text-muted/70 max-w-xs">
              A community-driven archive for retro game enthusiasts. Preserving classics, one
              cartridge at a time.
            </p>
          </div>

          <!-- Sections -->
          <div class="flex flex-col gap-3">
            <h4 class="font-mono text-secondary">Sections</h4>

            <nav class="flex flex-col gap-2">
              <a href="#featured" class="link">Featured</a>
              <a href="#about" class="link">About</a>
              <a href="#articles" class="link">Articles</a>
              <a href="#contribute" class="link">Contribute</a>
            </nav>
          </div>
        </div>

        <!-- Bottom bar -->
        <div
          class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-muted/10 pt-6 font-mono text-muted/50 md:flex-row"
        >
          <span>© 2026 Nerdstate — Preserving the classics.</span>

          <div class="flex gap-2">
            <span class="text-muted/70">Made with ❤️ by</span>

            <a
              href="https://github.com/damsonite"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted hover:text-primary transition-colors"
            >
              Damsonite
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
