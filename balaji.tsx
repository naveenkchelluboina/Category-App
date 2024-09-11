import React, { useState, ReactNode } from 'react';
import Select, { ClearActionMeta, components, GroupBase, MenuListProps, MultiValueProps, OptionProps, ValueContainerProps } from 'react-select';

// Sample warehouse data
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

// Custom option for checkboxes, but displayed in multiple columns
interface OptionType {
  label: string;
  value: string;
  snowflakeAcct?: string;
  lineOfBusiness?: string;
  onClick: () => void
}

// Define the type for the CheckboxOption props
type CheckboxOptionProps = OptionProps<OptionType> & {
  children: ReactNode;
};

const CheckboxOption = ({ children, ...props }: CheckboxOptionProps) => {
  const { label, snowflakeAcct, lineOfBusiness } = props.data;

  if (props.data.value === 'select_all') {
    console.log("vds",props.data.onClick)
    return (
      <div onClick={props.data.onClick}>
        {children}
      </div>
    );
  }

  return (
    <components.Option {...props}>
      <div className="option-container">
        <input type="checkbox" style={{ minWidth: 24 }} checked={props.isSelected} onChange={() => {}}
  
 />
        <div className="option-columns">
          <div className="option-column-value warehouse-name">{label}</div>
          <div className="option-column-value snowflake-acct">{snowflakeAcct}</div>
          <div className="option-column-value line-of-business">{lineOfBusiness}</div>
        </div>
      </div>
    </components.Option>
  );
};

const customComponents = {
  IndicatorSeparator: () => null, // This removes the separator
};

// Custom MenuList to add headers above the options and make "Select All" sticky
// const CustomMenuList = (props: any) => {
//   const childrenArray = React.Children.toArray(props.children);

//   return (
//     <components.MenuList {...props}>
//       <div className="dropdown-header">
//         <div className="option-column-header warehouse-name-header">Warehouse Name</div>
//         <div className="option-column-header snowflake-acct-header">Snowflake Acct</div>
//         <div className="option-column-header line-of-business-header">Line of Business</div>
//       </div>
//       <div className="scrollable-options">
//         {childrenArray.filter((child: any) => child.props.data && child.props.data.value !== 'select_all')}
//       </div>
//       <div className="sticky-select-all">
//         {childrenArray.find((child: any) => child.props.data && child.props.data.value === 'select_all')}
//       </div>
//     </components.MenuList>
//   );
// };

interface OptionType {
  label: string;
  value: string;
  snowflakeAcct?: string;
  lineOfBusiness?: string;
}

const CustomMenuList = (props: MenuListProps<OptionType>) => {
  // Convert children to an array
  const childrenArray = React.Children.toArray(props.children) as ReactNode[];

  return (
    <components.MenuList {...props}>
      <div className="dropdown-header">
        <div className="option-column-header warehouse-name-header">Warehouse Name</div>
        <div className="option-column-header snowflake-acct-header">Snowflake Acct</div>
        <div className="option-column-header line-of-business-header">Line of Business</div>
      </div>
      <div className="scrollable-options">
        {/* Filter out the "select_all" option */}
        {childrenArray.filter((child: ReactNode) => {
          const childProps = (child as React.ReactElement<OptionProps<OptionType>>).props;
          return childProps.data && childProps.data.value !== 'select_all';
        })}
      </div>
      <div className="sticky-select-all">
        {/* Find and render the "select_all" option */}
        {childrenArray.find((child: ReactNode) => {
          const childProps = (child as React.ReactElement<OptionProps<OptionType>>).props;
          return childProps.data && childProps.data.value === 'select_all';
        })}
      </div>
    </components.MenuList>
  );
};

// Custom MultiValue to handle how selected items are displayed
interface OptionType {
  label: string;
  value: string;
}

const CustomMultiValue = ({ index, getValue, ...props }: MultiValueProps<OptionType, boolean, GroupBase<OptionType>>) => {
  const selectedItems = getValue(); // This function gets the selected values

  // Return the default MultiValue component when the dropdown is open
  if (props.selectProps.menuIsOpen) {
    return <components.MultiValue {...props} index={index} getValue={getValue} />;
  }

  // If more than 3 items are selected and the dropdown is closed, show "x items selected"
  if (selectedItems.length > 3 && index === 0) {
    return (
      <components.MultiValue {...props} index={index} getValue={getValue}>
        {`${selectedItems.length} items selected`}
      </components.MultiValue>
    );
  }

  // Don't render other values if more than 3 items are selected
  if (selectedItems.length > 3 && index > 0) return null;

  return <components.MultiValue {...props} index={index} getValue={getValue} />;
};


const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <button className="h-0 inline-flex cursor-pointer items-center justify-center border-none bg-transparent p-0" >
        {/* Custom remove icon or button can be added here */}
      </button>
    </components.MultiValueRemove>
  );
};

interface OptionType {
  label: string;
  value: string;
  snowflakeAcct?: string;
  lineOfBusiness?: string;
}

const MultiValueContainer = (props: ValueContainerProps<OptionType>) => {
  const { selectProps: { menuIsOpen, value, onChange }} = props;
  const selectedItems = value as OptionType[]

  // Show "x items selected" only when the menu is closed and there are more than 3 selected items
  if (!menuIsOpen && selectedItems.length > 3) {
    return (
      <components.ValueContainer {...props}>
        <div>
          {`${selectedItems.length} items selected`}
          <button
            className="h-0 inline-flex cursor-pointer items-center justify-center border-none bg-transparent p-0"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); 
              const actionMeta: ClearActionMeta<OptionType> ={
                action: 'clear',
                removedValues: selectedItems
              }
              if (props.selectProps.onChange) {
                props.selectProps.onChange([], actionMeta);
              }
            }}
          >
            &times; {/* Custom remove icon or button */}
          </button>
        </div>
      </components.ValueContainer>
    );
  }

  // If conditions aren't met, return the default ValueContainer
  return <components.ValueContainer {...props} />;
};


const WH = () => {
  const [selectedWarehouses, setSelectedWarehouses] = useState<any[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);

  // Handle changes when user selects/unselects an option
  const handleChange = (selectedOptions: any) => {
    console.log("Selected options in WH handleChange:", selectedOptions);
    // When clear action is triggered, reset the selected options
    if (selectedOptions === null || selectedOptions.length === 0) {
      setSelectedWarehouses([]); // Clear selected options
    } else {
      setSelectedWarehouses(selectedOptions); // Update with new selection
    }
  };

  // Handle "Select All" or "Unselect All"
  const handleSelectAll = () => {
    if (selectedWarehouses.length === filteredWarehouses.length) {
      setSelectedWarehouses([]); // Unselect all
    } else {
      setSelectedWarehouses(filteredWarehouses); // Select all
    }
  };

  const filteredOptions = (candidate: any, input: string) => {
    if (candidate.value === 'select_all') {
      return true;
    }
    return candidate.label.toLowerCase().includes(input.toLowerCase());
  };

  // Create options array with "Select All" at the end
  const optionsWithSelectAll: any[] = filteredWarehouses.length > 0
    ? [
        {
          label:
            selectedWarehouses.length === filteredWarehouses.length
              ? `Unselect All (${selectedWarehouses.length} selected)`
              : 'Select All',
          value: 'select_all',
          onClick: handleSelectAll,
        },
        ...filteredWarehouses,
      ]
    : filteredWarehouses;

  return (
    <div className={`warehouse-dropdown ${menuIsOpen ? 'open' : 'closed'}`}>
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option: CheckboxOption,
          MenuList: CustomMenuList,
          MultiValue: CustomMultiValue,
          MultiValueRemove: MultiValueRemove,
          ValueContainer: MultiValueContainer,
          
          ...customComponents,
        }}
        
        value={selectedWarehouses}
        onChange={handleChange}
        filterOption={filteredOptions}
        options={optionsWithSelectAll}
        placeholder="Search or select Warehouses"
        menuShouldScrollIntoView={false}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        menuIsOpen={menuIsOpen}
        onInputChange={(inputValue) => {
          const filteredOptions = warehouses.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          );
          setFilteredWarehouses(filteredOptions);
        }}
        classNamePrefix="custom-select"
      />
    </div>
  );
};

export default WH;
