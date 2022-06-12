import {Listbox} from '@headlessui/react';
import {fetchSync, useCountry} from '@shopify/hydrogen';
import clsx from 'clsx';
import {Suspense, useCallback, useState} from 'react';
import {ChevronDownIcon} from '../icons/ChevronDown';
import RadioIcon from '../icons/Radio';
import SpinnerIcon from '../icons/Spinner';

type Country = ReturnType<typeof useCountry>[number];

/**
 * A client component that selects the appropriate country to display for products on a website
 */

type Props = {
  align?: 'center' | 'left' | 'right';
};

export default function CountrySelect({align = 'center'}: Props) {
  const [listboxOpen, setListboxOpen] = useState(false);
  const [selectedCountry] = useCountry();

  const setCountry = useCallback((country: Country) => {
    if (!country) {
      return;
    }
    const {isoCode, name} = country;
    fetch(`/api/countries`, {
      body: JSON.stringify({isoCode, name}),
      method: 'POST',
    }).then(() => {
      window.location.reload();
    });
  }, []);

  if (!selectedCountry) {
    return null;
  }

  return (
    <Listbox onChange={setCountry} value={selectedCountry}>
      {({open}) => {
        setTimeout(() => setListboxOpen(open));
        return (
          <div className="relative inline-flex">
            <Listbox.Button
              className={clsx(
                'flex h-[2.4rem] items-center rounded-sm bg-darkGray bg-opacity-0 px-3 py-2 text-sm font-bold duration-150',
                'hover:bg-opacity-10',
              )}
            >
              <span className="mr-2">{selectedCountry.name}</span>
              <ChevronDownIcon className={clsx(open && 'rotate-180')} />
            </Listbox.Button>

            <Listbox.Options
              className={clsx(
                'absolute top-full z-10 mt-3 min-w-[150px] overflow-hidden rounded shadow',
                align === 'center' && 'left-1/2 -translate-x-1/2',
                align === 'left' && 'left-0',
                align === 'right' && 'right-0',
              )}
            >
              <div className="max-h-64 overflow-y-auto bg-white">
                {listboxOpen && (
                  <Suspense
                    fallback={
                      <div className="flex justify-center overflow-hidden">
                        <SpinnerIcon />
                      </div>
                    }
                  >
                    <Countries
                      selectedCountry={selectedCountry}
                      getClassName={(active: boolean) => {
                        return clsx([
                          'p-3 flex justify-between items-center text-left font-bold text-sm cursor-pointer whitespace-nowrap',
                          active ? 'bg-darkGray bg-opacity-5' : null,
                        ]);
                      }}
                    />
                  </Suspense>
                )}
              </div>
            </Listbox.Options>
          </div>
        );
      }}
    </Listbox>
  );
}

export function Countries({
  getClassName,
  selectedCountry,
}: {
  getClassName: (active: boolean) => string;
  selectedCountry: Country;
}) {
  const countries: {
    currency: {
      isoCode: string;
    };
    isoCode: string;
    name: string;
  }[] = fetchSync('/api/countries').json();

  return (
    <>
      {countries.map((country) => {
        const isSelected = country.isoCode === selectedCountry?.isoCode;
        return (
          <Listbox.Option key={country.isoCode} value={country}>
            {({active}) => (
              <div className={getClassName(active)}>
                <span className="mr-8">{country.name}</span>
                <RadioIcon checked={isSelected} hovered={active} />
              </div>
            )}
          </Listbox.Option>
        );
      })}
    </>
  );
}
