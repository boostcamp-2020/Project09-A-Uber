/* eslint-disable camelcase */
import React, { FC } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';

import { updateLocationOrigin, updateLocationDestination } from '@reducers/location';
import { AutoLocationWrapper, StyledIcon } from './style';

interface Props {
  locationType: 'origin' | 'destination';
}

const AutoLocation: FC<Props> = ({ locationType }) => {
  const dispatch = useDispatch();
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 700,
  });
  const setPositionAction =
    locationType === 'origin' ? updateLocationOrigin : updateLocationDestination;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickCancleIcon = () => {
    setValue('');
    dispatch(setPositionAction());
  };

  const registerRef = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        dispatch(setPositionAction({ lat, lng, address: description }));
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const renderSuggestions = () =>
    data.slice(0, 2).map((suggestion) => {
      const {
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={`AutoLocation_${suggestion.place_id}`} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <AutoLocationWrapper ref={registerRef} className="location-input">
      <span className="before-placeholder">▪</span>
      <input value={value} onChange={handleInput} placeholder="어디로 가시나요?" />
      <StyledIcon type="cross" size="xxs" onClick={onClickCancleIcon}></StyledIcon>
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </AutoLocationWrapper>
  );
};

export default AutoLocation;
