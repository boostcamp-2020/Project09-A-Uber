interface Driver {
  licenseNumber: string;
  status: string;
}

export interface InitialState {
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
}

const initialState: InitialState = {};

type Action = { type: string };

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
