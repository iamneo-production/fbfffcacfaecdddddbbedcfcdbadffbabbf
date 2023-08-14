import Stopwatch from "../components/Stopwatch/Stopwatch";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';


describe('Testing Stopwatch', () => {

    jest.setTimeout(30000);


    test('FE_before_start', () => {
        
        act(() => {
            render(<Stopwatch />);
            jest.advanceTimersByTime(1000);
          });
        
        
        const start = screen.getByTestId('start');
        const reset = screen.getByTestId('reset');

        const time = screen.getByTestId('time');

        expect(reset).toHaveAttribute('disabled');
        expect(time.textContent.split(' ').join('')).toBe('00:00:00');

    }, 30000);

    test('FE_running_stopwatch', async () => {

        
        act(() => {
            render(<Stopwatch />);
        });
        
        const start = screen.getByTestId('start');
        const reset = screen.getByTestId('reset');

        const time = screen.getByTestId('time');

        fireEvent.click(start);

        expect(screen.queryByTestId('start')).toBeNull();
        expect(screen.queryByTestId('pause')).toBeInTheDocument();
        expect(reset).not.toHaveAttribute('disabled');
        expect(time.textContent.split(' ').join('')).toBe('00:00:00');
        await new Promise((r) => setTimeout(r, 2000));
        await waitFor(() => {
            expect(screen.getByTestId('time').textContent.split(' ').join('')).toBe('00:00:02');
        })

        await new Promise((r) => setTimeout(r, 5000));
        await waitFor(() => {
            expect(screen.getByTestId('time').textContent.split(' ').join('')).toBe('00:00:07');
        })

        const pause = screen.queryByTestId('pause');
        fireEvent.click(pause);

        await new Promise((r) => setTimeout(r, 1000));
        await waitFor(() => {
            expect(screen.getByTestId('time').textContent.split(' ').join('')).toBe('00:00:07');
        })

        fireEvent.click(reset);
        expect(time.textContent.split(' ').join('')).toBe('00:00:00');

    })

})