import clsx from 'clsx';
import {SanityColorTheme, SanityHeroPage} from '../../types';
import HeroContent from '../HeroContent.server';

type Props = {
  colorTheme?: SanityColorTheme;
  fallbackTitle: string;
  hero?: SanityHeroPage;
};

export default function HeroPage({colorTheme, fallbackTitle, hero}: Props) {
  if (!hero) {
    return (
      <h1 className="mx-auto max-w-[60rem] pb-8 pt-34 text-center text-4xl">
        {fallbackTitle}
      </h1>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-b-xl bg-peach px-4 pb-4 pt-24', //
        'md:px-8 md:pb-8 md:pt-34',
      )}
      style={{background: colorTheme?.background}}
    >
      {/* Title */}
      {hero.title && (
        <h1
          className={clsx(
            'max-w-[60rem] whitespace-pre-line text-2xl',
            'md:text-4xl',
          )}
          style={{color: colorTheme?.text || 'black'}}
        >
          {hero.title}
        </h1>
      )}

      {/* Hero content */}
      {hero.content && (
        <div className="mt-8">
          <HeroContent content={hero.content} />
        </div>
      )}
    </div>
  );
}
