import React from 'react';
import { render } from 'mustache';

export interface IHtmlComponentProps {
  view?: {},
  template: string,
  init?: () => void;
  
}

/**
 * Primary UI component for user interaction
 */
export const StorybookHtmlComponent: React.FC<IHtmlComponentProps> = (props) => {
  const { view, template, init } = props;
  const __html = render(template, view);

  if (init) {
    setTimeout(init, 0);
  }

  return <div dangerouslySetInnerHTML={{ __html }}></div>;
};
