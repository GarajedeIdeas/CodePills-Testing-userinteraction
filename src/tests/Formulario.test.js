import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from "../components/Formulario";

describe('pruebas sobre componente Formulario', () => {

    test('prueba para envío de formulario', () => {

        const testData = { title: 'Título de prueba', text: 'Texto de prueba', category: 'hobbie' };

        const mockFn = jest.fn();
        render(<Formulario createTask={mockFn} />);

        const inputTitle = screen.getByLabelText('Título');
        const inputText = screen.getByLabelText('Texto');
        const selectCategory = screen.getByLabelText('Categoría');
        const button = screen.getByRole('button', {
            name: /crear nueva tarea/i
        });

        userEvent.clear(inputTitle);
        userEvent.type(inputTitle, testData.title);

        userEvent.clear(inputText);
        userEvent.type(inputText, testData.text);

        userEvent.selectOptions(selectCategory, [testData.category]);

        userEvent.click(button);

        const returnData = mockFn.mock.calls[0][0];

        expect(mockFn).toBeCalled();

        expect(returnData).toMatchObject(testData);

    });


    test('debería aparecer el popover con el hover del ratón', async () => {

        const mockFn = jest.fn();
        render(<Formulario createTask={mockFn} />);

        let popover = screen.queryByText(/podrás crear una nueva tarea/i);
        expect(popover).not.toBeInTheDocument();

        const infoP = screen.queryByText(/Quieres más información/i);
        userEvent.hover(infoP);

        popover = screen.queryByText(/podrás crear una nueva tarea/i);
        expect(popover).toBeInTheDocument();

        userEvent.unhover(infoP);
        await waitForElementToBeRemoved(popover);

        popover = screen.queryByText(/podrás crear una nueva tarea/i);
        expect(popover).not.toBeInTheDocument();
    });

})