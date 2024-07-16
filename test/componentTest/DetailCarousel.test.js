import { render } from '@testing-library/react';
import React from 'react';
import DetailCarousel from '../../src/components/DetailCarousel';

describe('DetailCarousel Component', () => {
  it('renders null when photos is empty', () => {
    const { container } = render(<DetailCarousel photos={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with a single photo', () => {
    const photos = ['https://example.com/photo1.jpg'];
    const { container } = render(<DetailCarousel photos={photos} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with multiple photos', () => {
    const photos = ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'];
    const { container } = render(<DetailCarousel photos={photos} />);
    expect(container).toMatchSnapshot();
  });
});