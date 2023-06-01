'use client'

import { Provider } from "react-redux";
import { store } from './store/store'

const ProviderToolkit = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <Provider store={store}>
    {children}
  </Provider>
)

export default ProviderToolkit;
