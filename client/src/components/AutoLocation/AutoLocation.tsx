/* eslint-disable camelcase */
import React, { FC } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { AutoLocationWrapper } from './style';

interface Props {
  setPosition: any;
}

const AutoLocation: FC<Props> = ({ setPosition }) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    ready,
  } = usePlacesAutocomplete({
    debounce: 700,
    callbackName: 'initMap',
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const registerRef = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleSelect = ({ description }: { description: any }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPosition({ lat, lng });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const renderSuggestions = () =>
    data.slice(0, 2).map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <AutoLocationWrapper ref={registerRef} className="location-input">
      <span className="before-placeholder">▪</span>
      <input value={value} onChange={handleInput} placeholder="어디로 가시나요?" />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </AutoLocationWrapper>
  );
};

export default AutoLocation;
