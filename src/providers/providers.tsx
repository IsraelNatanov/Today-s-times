'use client'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClientProvider, QueryClient } from 'react-query'

const Providers=({children}:{children:React.ReactNode})=> {
    const queryClient = new QueryClient()
  return (

<QueryClientProvider client={queryClient} contextSharing>
<Provider store={store}>

            {children}
            </Provider>
</QueryClientProvider>

  )
}
export default Providers
