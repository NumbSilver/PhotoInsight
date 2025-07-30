
// Types for the photo detail screen

export type ContentType = 'inspiration' | 'promotion' | 'tags' | 'poem';

export interface PhotoContent {
  inspiration: string;
  promotion: string;
  tags: string[];
  poem: string;
}

export interface PhotoData {
  url: string;
  content: PhotoContent;
}

export interface ContentSectionProps {
  title: string;
  content: string;
  isPoem?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
  onCopy: () => void;
}

export interface ActionButtonProps {
  icon: string;
  isActive?: boolean;
  isAccent?: boolean;
  activeColor?: string;
  onPress: () => void;
}

export interface TagItemProps {
  tag: string;
}

export interface ToastProps {
  message: string;
  visible: boolean;
}
