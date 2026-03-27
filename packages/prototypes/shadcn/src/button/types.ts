import type { ButtonExposes, ButtonProps } from '@proto.ui/prototypes-base';

export type ShadcnButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ShadcnButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ShadcnButtonProps extends ButtonProps {
  variant?: ShadcnButtonVariant;
  size?: ShadcnButtonSize;
}

export type ShadcnButtonExposes = ButtonExposes;
