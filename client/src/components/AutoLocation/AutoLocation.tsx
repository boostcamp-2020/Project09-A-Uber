/* eslint-disable camelcase */
import React, { FC } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';

import { Input } from 'antd';
import { updateLocationOrigin, updateLocationDestination } from '@reducers/location';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { Message } from '@utils/client-message';
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
        <li
          key={`AutoLocation_${suggestion.place_id}`}
          onClick={handleSelect(suggestion)}
          onKeyDown={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong>
          <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <AutoLocationWrapper ref={registerRef} className="location-input">
      <Input
        placeholder={Message.SearchFormPlaceholder}
        prefix={<SearchOutlined />}
        value={value}
        onChange={handleInput}
      />
      <StyledIcon type="cross" size="xxs" onClick={onClickCancleIcon} />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </AutoLocationWrapper>
  );
};

export default AutoLocation;
