/* eslint-disable camelcase */
import React, { FC } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';

import { Input, List } from 'antd';
import { updateLocationOrigin, updateLocationDestination } from '@reducers/location';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons/lib/icons';
import { Message } from '@utils/client-message';
import styled from '@theme/styled';

interface Props {
  locationType: 'origin' | 'destination';
}

const AutoLocationWrapper = styled.div`
  margin-bottom: 0.5rem;
  position: relative;

  & .ant-input {
    width: 90%;
  }

  & .ant-list {
    position: absolute;
    z-index: 5;
    background-color: white;
    width: 100%;
    height: 80px;
    overflow: scroll;
  }
`;

const StyledIcon = styled(CloseCircleOutlined)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  fill: ${({ theme }) => theme.BORDER};
  cursor: pointer;
  z-index: 3;
`;

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

  const renderSuggestions = () => {
    return (
      <List
        bordered
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={handleSelect(item)} onKeyDown={handleSelect(item)}>
            {item.structured_formatting.main_text}
          </List.Item>
        )}
      />
    );
  };

  return (
    <AutoLocationWrapper ref={registerRef} className="location-input">
      <Input
        placeholder={Message.SearchFormPlaceholder}
        prefix={<SearchOutlined />}
        value={value}
        onChange={handleInput}
      />
      <StyledIcon onClick={onClickCancleIcon} />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </AutoLocationWrapper>
  );
};

export default AutoLocation;
