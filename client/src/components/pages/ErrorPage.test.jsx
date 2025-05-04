import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import {it, describe} from 'vitest'

describe('renders ErrorPage component', () => {
  it('renders the Error component', ()=>{
    render(<ErrorPage />)

    screen.debug()
  })
});