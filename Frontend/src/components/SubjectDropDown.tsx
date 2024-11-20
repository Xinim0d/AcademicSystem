import { useState } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

const MultiChoiceDropdown = ({ options, onSelectionChange }: { options: { id: string; label: string }[], onSelectionChange: (selected: string[]) => void }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleOption = (id: string) => {
        setSelectedOptions((prevSelected) => {
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter((optionId) => optionId !== id)
                : [...prevSelected, id];
            onSelectionChange(newSelected);
            return newSelected;
        });
    };

    const getDropdownTitle = () => {
        if (selectedOptions.length === 0) return "Select options";
        const selectedLabels = options
            .filter((option) => selectedOptions.includes(option.id))
            .map((option) => option.label);
        return selectedLabels.join(", ");
    };

    return (
        <DropdownButton
            variant="outline-secondary"
            title={getDropdownTitle()}
            id="multi-choice-dropdown"
        >
            {options.map((option) => (
                <Dropdown.Item
                    as="div"
                    key={option.id}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleOption(option.id);
                    }}
                >
                    <Form.Check
                        type="checkbox"
                        label={option.label}
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => toggleOption(option.id)}
                    />
                </Dropdown.Item>
            ))}
        </DropdownButton>

    );
};

export default MultiChoiceDropdown;