import { colors } from '../theme/colors';

export const theme = {
  colors,
  spacing: (unit: number) => unit * 8,
  screenPadding: 20,
};

export const styles = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 20,
  },
};