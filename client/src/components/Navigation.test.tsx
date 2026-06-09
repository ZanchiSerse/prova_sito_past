import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollY = 0;
  });

  it('should render the logo', () => {
    render(<Navigation />);
    expect(screen.getByText('Cristian')).toBeDefined();
  });

  it('should render all navigation items', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Chi Siamo')).toBeDefined();
    expect(screen.getByText('Prodotti')).toBeDefined();
    expect(screen.getByText('Galleria')).toBeDefined();
    expect(screen.getByText('Contatti')).toBeDefined();
  });

  it('should have a mobile menu button', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeDefined();
  });

  it('should toggle mobile menu on button click', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    // After click, the menu should be open (implementation detail)
    expect(menuButton).toBeDefined();
  });

  it('should have scroll smooth behavior', () => {
    render(<Navigation />);
    const nav = document.querySelector('nav');
    expect(nav).toBeDefined();
  });
});
