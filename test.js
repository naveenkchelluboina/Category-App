import React, { useState } from 'react';
import Select, { components } from 'react-select';
import './WarehouseDropdown.css'; // Add your CSS file here

const warehouses = [
    { label: 'RS_warehouse_name_2', value: 'RS_warehouse_name_2', snowflakeAcct: 'SF_AWS_ACCT_EAST', lineOfBusiness: 'Engineering' },
    { label: 'RS_warehouse_name_22', value: 'RS_warehouse_name_22', snowflakeAcct: 'SF_AWS_ACCT_EAST', lineOfBusiness: 'Risk' },
    { label: 'RS_warehouse_name_24', value: 'RS_warehouse_name_24', snowflakeAcct: 'SF_AWS_ACCT_WEST', lineOfBusiness: 'Product' },
    { label: 'RS_warehouse_name_21', value: 'RS_warehouse_name_21', snowflakeAcct: 'SF_AWS_ACCT_WEST', lineOfBusiness: 'Bank' },
    { label: 'RS_warehouse_name_266', value: 'RS_warehouse_name_266', snowflakeAcct: 'SF_AWS_ACCT_EAST', lineOfBusiness: 'Design' },
    { label: 'RS_warehouse_name_232', value: 'RS_warehouse_name_232', snowflakeAcct: 'SF_AWS_ACCT_WEST', lineOfBusiness: 'Sales' },
    { label: 'RS_warehouse_name_223', value: 'RS_warehouse_name_223', snowflakeAcct: 'SF_AWS_ACCT_EAST', lineOfBusiness: 'Operations' },
    { label: 'RS_warehouse_name_2223', value: 'RS_warehouse_name_2223', snowflakeAcct: 'SF_AWS_ACCT_WEST', lineOfBusiness: 'Marketing' },
    { label: 'RS_warehouse_name_21223', value: 'RS_warehouse_name_21223', snowflakeAcct: 'SF_AWS_ACCT_WEST', lineOfBusiness: 'Finance' },
    { label: 'RS_warehouse_name_214523', value: 'RS_warehouse_name_214523', snowflakeAcct: 'SF_AWS_ACCT_EAST', lineOfBusiness: 'Legal' },
];

const customComponents = {
    IndicatorSeparator: () => null,  // This removes the separator
};

// Custom option for checkboxes, but displayed in multiple columns
const CheckboxOption = ({ children, ...props }) => {
    const { label, snowflakeAcct, lineOfBusiness } = props.data;

    if (props.data.value === 'select_all') {
        // Don't render a checkbox for the "Select All" option
        return (
            <div
                onClick={props.data.onClick}
                style={{
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0',
                }}
            >
                {children}
            </div>
        );
    }

    return (
        <components.Option {...props}>
            <div className="option-container">
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                    style={{ marginRight: 10 }}
                />
                <div className="option-columns">
                    <div className="option-column warehouse-name">{label}</div>
                    <div className="option-column snowflake-acct">{snowflakeAcct}</div>
                    <div className="option-column line-of-business">{lineOfBusiness}</div>
                </div>
            </div>
        </components.Option>
    );
};

// Custom MenuList to add headers above the options and make "Select All" sticky
const CustomMenuList = (props) => {
    return (
        <components.MenuList {...props}>
            <div className="dropdown-header">
                <div className="option-column warehouse-name">Warehouse Name</div>
                <div className="option-column snowflake-acct">Snowflake Acct</div>
                <div className="option-column line-of-business">Line of Business</div>
            </div>
            <div className="scrollable-options">
                {props.children.filter(child => child.props.data.value !== 'select_all')}
            </div>
            <div className="sticky-select-all">
                {props.children.find(child => child.props.data.value === 'select_all')}
            </div>
        </components.MenuList>
    );
};

// Custom MultiValue to handle how selected items are displayed
const CustomMultiValue = ({ index, getValue, ...props }) => {
    const selectedItems = getValue();
    
    // Return the default MultiValue component when the dropdown is open
    if (props.selectProps.menuIsOpen) {
        return <components.MultiValue {...props} />;
    }

    // If more than 3 items are selected and the dropdown is closed, show "x items selected"
    if (selectedItems.length > 3 && index === 0) {
        return (
            <components.MultiValue {...props}>
                {`${selectedItems.length} items selected`}
                <span
                    {...props.removeProps}
                    style={{ marginLeft: '8px', cursor: 'pointer' }}
                    onClick={() => props.selectProps.onChange([], { action: 'clear' })}
                />
            </components.MultiValue>
        );
    }

    // Don't render other values if more than 3 items are selected
    if (selectedItems.length > 3 && index > 0) return null;

    return <components.MultiValue {...props} />;
};

// Custom styles to override react-select default behavior
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'transparent' : provided.backgroundColor,
        color: state.isSelected ? 'inherit' : provided.color,
        ':hover': {
            backgroundColor: '#f0f0f0',
        },
    }),
};

const WarehouseDropdown = () => {
    const [selectedWarehouses, setSelectedWarehouses] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    // Handle changes when user selects/unselects an option
    const handleChange = (selectedOptions) => {
        setSelectedWarehouses(selectedOptions || []);
    };

    // Handle "Select All" or "Unselect All"
    const handleSelectAll = () => {
        if (selectedWarehouses.length === warehouses.length) {
            setSelectedWarehouses([]); // Unselect all
        } else {
            setSelectedWarehouses(warehouses); // Select all
        }
    };

    // Create options array with "Select All" at the end
    const optionsWithSelectAll = [
        ...warehouses,
        {
            label:
                selectedWarehouses.length === warehouses.length
                    ? `Unselect All (${selectedWarehouses.length} selected)`
                    : 'Select All',
            value: 'select_all',
            onClick: handleSelectAll,
        },
    ];

    return (
        <div className={`warehouse-dropdown ${menuIsOpen ? 'open' : 'closed'}`}>
            <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ Option: CheckboxOption, MenuList: CustomMenuList, MultiValue: CustomMultiValue ,...customComponents}}
                value={selectedWarehouses}
                onChange={handleChange}
                options={optionsWithSelectAll}
                placeholder="Select Warehouses"
                styles={customStyles} // Use custom styles to remove the blue background
                menuShouldScrollIntoView={false} // Ensure independent scrolling
                onMenuOpen={() => setMenuIsOpen(true)} // Set the dropdown as open
                onMenuClose={() => setMenuIsOpen(false)} // Set the dropdown as closed
                menuIsOpen={menuIsOpen} 
                classNamePrefix="custom-select" // Pass the state to the MultiValue component
            />
        </div>
    );
};

export default WarehouseDropdown;

.warehouse-dropdown {
  width: 700px;
  margin: 10px;
}

/* Header section for the columns - sticky position */
.dropdown-header {
  display: flex;
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0;
  z-index: 10; /* Ensure it stays above the scrolling options */
}

/* Option container to align checkbox and columns */
.option-container {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

/* Optional: Add hover background color */
.option-container:hover {
  background-color: #f0f0f0;
}

/* Columns for the dropdown options */
.option-columns {
  display: flex;
  width: 100%;
}

.option-column {
  padding-right: 20px;
  text-align: left;
}

.warehouse-name {
  width: 40%;
}

.snowflake-acct {
  width: 30%;
}

.line-of-business {
  width: 30%;
}

/* Make the options scrollable */
.scrollable-options {

  overflow-y: auto;
}

/* Sticky "Select All" button */
.sticky-select-all {
  background-color: white;
  padding: 10px;
  border-top: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  position: sticky;
  bottom: 0;
  z-index: 10; /* Ensure it stays above the scrolling options */
  text-align: center;
}

.sticky-select-all:hover {
  background-color: #f0f0f0;
}

.warehouse-dropdown input[type="checkbox"] {
  margin-right: 10px;
}



/* Only rotate the dropdown arrow icon when the menu is open */
.warehouse-dropdown.open .custom-select__dropdown-indicator svg {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

/* Keep the arrow in the default down position when the menu is closed */
.warehouse-dropdown.closed .custom-select__dropdown-indicator svg {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}
