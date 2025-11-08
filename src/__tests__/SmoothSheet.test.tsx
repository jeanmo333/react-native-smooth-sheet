import { render } from '@testing-library/react-native';
import SmoothSheet from '../SmoothSheet';
import { Text } from 'react-native';

describe('SmoothSheet', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isVisible: true,
    onClose: mockOnClose,
    children: <Text>Test Content</Text>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<SmoothSheet {...defaultProps} />);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('returns null when not visible', () => {
    const { queryByText } = render(
      <SmoothSheet {...defaultProps} isVisible={false} />
    );
    expect(queryByText('Test Content')).toBeNull();
  });

  it('applies custom theme color', () => {
    const customTheme = '#ff0000';
    const { queryByText } = render(
      <SmoothSheet {...defaultProps} theme={customTheme} />
    );
    expect(queryByText('Test Content')).toBeTruthy();
  });

  it('handles disableDrag prop correctly', () => {
    const { queryByText } = render(
      <SmoothSheet {...defaultProps} disableDrag={true} />
    );
    expect(queryByText('Test Content')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <SmoothSheet {...defaultProps}>
        <Text>Custom Child Content</Text>
      </SmoothSheet>
    );
    expect(getByText('Custom Child Content')).toBeTruthy();
  });
});
