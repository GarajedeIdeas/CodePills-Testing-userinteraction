import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('Prueba sobre la app completa', () => {

    test('si la tarea se genera correctamente', () => {

        const testData = { title: 'Perro', text: 'Sacar al perro por la tarde', category: 'home' };

        render(<App />);

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

        const listItem = screen.getByText(testData.title);

        expect(listItem).toBeInTheDocument();

    });

});