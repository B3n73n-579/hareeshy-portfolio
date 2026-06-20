import { create } from 'zustand'

interface ThemeState {
  isMobile: boolean
  scrolled: boolean
  mobileMenuOpen: boolean
  setIsMobile: (v: boolean) => void
  setScrolled: (v: boolean) => void
  setMobileMenuOpen: (v: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  isMobile: false,
  scrolled: false,
  mobileMenuOpen: false,
  setIsMobile: (v) => set({ isMobile: v }),
  setScrolled: (v) => set({ scrolled: v }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
}))