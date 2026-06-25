import { ReactNode } from 'react';

export interface SectionContent {
  title: string;
  description?: string;
  content?: ReactNode | any;
  image: string;
  btnText?: string;
  slug?: string;
}

export interface StickySectionsContainerProps {
  content: SectionContent[];
}
