import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders the correct progressive text', () => {
    render(<ProgressBar current={2} total={5} />);

    const textElement = screen.getByText(/Question 2 of 5/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the bar fill at the correct width percentage', () => {
    // 2/5 = 40%
    const { container } = render(<ProgressBar current={2} total={5} />);

    // The filled inner div is the only element with an inline width style
    const fill = container.querySelector('[style*="width"]');
    expect(fill).toBeInTheDocument();
    expect(fill).toHaveStyle({ width: '40%' });
  });
});
