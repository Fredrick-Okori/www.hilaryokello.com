import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Type declaration for external chat widget custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chat-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        env?: string;
        'project-id'?: string;
      };
    }
  }
}
