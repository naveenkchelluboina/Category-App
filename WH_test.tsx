import React, { useState, ReactNode, ComponentType, useCallback,useRef, useEffect } from 'react';
import Select, { ClearActionMeta, components, GroupBase, MenuListProps, MultiValueProps, OptionProps, ValueContainerProps, MultiValue, ActionMeta } from 'react-select';

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

interface OptionType {
  label: string;
  value: string;
  snowflakeAcct?: string;
  lineOfBusiness?: string;
  onClick?: () => void;
}

const CheckboxOption = ({ children, ...props }: OptionProps<OptionType>) => {
  const { label, snowflakeAcct, lineOfBusiness } = props.data;

  if (props.data.value === 'select_all') {
    return (
      <div onClick={props.data.onClick}>
        {children}
      </div>
    );
  }

  return (
    <components.Option {...props}>
      <div className="option-container">
        <input type="checkbox" style={{ minWidth: 24 }} checked={props.isSelected} onChange={() => {}} />
        <div className="option-columns">
          <div className="option-column-value warehouse-name">{label}</div>
          <div className="option-column-value snowflake-acct">{snowflakeAcct}</div>
          <div className="option-column-value line-of-business">{lineOfBusiness}</div>
        </div>
      </div>
    </components.Option>
  );
};

const CustomMenuList = (props: MenuListProps<OptionType>) => {
  const childrenArray = React.Children.toArray(props.children) as ReactNode[];

  return (
    <components.MenuList {...props}>
      <div className="dropdown-header">
        <div className="option-column-header warehouse-name-header">Warehouse Name</div>
        <div className="option-column-header snowflake-acct-header">Snowflake Acct</div>
        <div className="option-column-header line-of-business-header">Line of Business</div>
      </div>
      <div className="scrollable-options">
        {childrenArray.filter((child: ReactNode) => {
          const childProps = (child as React.ReactElement<OptionProps<OptionType>>).props;
          return childProps.data && childProps.data.value !== 'select_all';
        })}
      </div>
      <div className="sticky-select-all">
        {childrenArray.find((child: ReactNode) => {
          const childProps = (child as React.ReactElement<OptionProps<OptionType>>).props;
          return childProps.data && childProps.data.value === 'select_all';
        })}
      </div>
    </components.MenuList>
  );
};

const CustomMultiValue = (props: MultiValueProps<OptionType, boolean, GroupBase<OptionType>>) => {
  const selectedItems = props.getValue(); // This function gets the selected values

  if (props.selectProps.menuIsOpen) {
    return <components.MultiValue {...props} />;
  }

  if (selectedItems.length > 3 && props.index === 0) {
    return (
      <components.MultiValue {...props}>
        {`${selectedItems.length} items selected`}
      </components.MultiValue>
    );
  }

  if (selectedItems.length > 3 && props.index > 0) return null;

  return <components.MultiValue {...props} />;
};

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <button className="h-0 inline-flex cursor-pointer items-center justify-center border-none bg-transparent p-0">
        {/* Custom remove icon or button */}
      </button>
    </components.MultiValueRemove>
  );
};

const MultiValueContainer = (props: ValueContainerProps<OptionType>) => {
  const { selectProps: { menuIsOpen, value, onChange }} = props;
  const selectedItems = value as OptionType[];

  if (!menuIsOpen && selectedItems.length > 3) {
    return (
      <components.ValueContainer {...props}>
        <div>
          {`${selectedItems.length} items selected`}
          <button
            className="h-0 inline-flex cursor-pointer items-center justify-center border-none bg-transparent p-0"
            onMouseDown={(e) => {
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

  return <components.ValueContainer {...props} />;
};

const WH = () => {
  const [selectedWarehouses, setSelectedWarehouses] = useState<OptionType[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [originalFilteredWarehouses, setOriginalFilteredWarehouses] = useState<OptionType[]>([]);
const [filteredWarehouses, setFilteredWarehouses] = useState<OptionType[]>(warehouses);
const selectRef = useRef<any>(null);

const onInputChange = useCallback((inputValue: string) => {
  const filteredOptions = warehouses.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  setFilteredWarehouses(filteredOptions);
  if (inputValue !== '' && filteredOptions.length > 0) {
    setOriginalFilteredWarehouses(filteredOptions);
  }
}, [warehouses]);

const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
  console.log("Selected options in WH handleChange:", newValue);

  if (actionMeta.action === 'clear' || newValue.length === 0) {
    setSelectedWarehouses([]); // Clear selected options
    setFilteredWarehouses(warehouses); // Reset filtered warehouses to all options
    setOriginalFilteredWarehouses([]); // Reset original filtered warehouses
  } else {
    setSelectedWarehouses([...newValue]); // Convert to mutable array
    if (originalFilteredWarehouses.length > 0) {
      setFilteredWarehouses(originalFilteredWarehouses); // Update filtered warehouses to original filtered list
    } else {
      setFilteredWarehouses(warehouses); // Reset filtered warehouses to all options
    }
  }
};
  const handleSelectAll = () => {
    if (selectedWarehouses.length === filteredWarehouses.length) {
      setSelectedWarehouses([]); // Unselect all
    } else {
      setSelectedWarehouses(filteredWarehouses); // Select all
    }
  };

  const filteredOptions = (candidate: OptionType, input: string) => {
    return candidate.value === 'select_all' || candidate.label.toLowerCase().includes(input.toLowerCase());
  };

  // Create options array with "Select All" at the start
  const optionsWithSelectAll = [{
      label: selectedWarehouses.length === filteredWarehouses.length
        ? `Unselect All (${selectedWarehouses.length} selected)`
        : 'Select All',
      value: 'select_all',
      onClick: handleSelectAll,
    }, ...filteredWarehouses];

  console.log("Filtered warehouses:", filteredWarehouses); 

  const handleInputClick = () => {
    
    if (selectRef.current) {
      setMenuIsOpen(true);  
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Element;
    if (target && !target.closest('.warehouse-dropdown')) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={`warehouse-dropdown ${menuIsOpen ? 'open' : 'closed'}`}>
      <div onClick={handleInputClick}  style={{ position: 'relative' }}> 
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        ref={selectRef}
        components={{
          Option: CheckboxOption as ComponentType<OptionProps<OptionType, true, GroupBase<OptionType>>>,
          MenuList: CustomMenuList,
          MultiValue: CustomMultiValue,
          MultiValueRemove: MultiValueRemove,
          ValueContainer: MultiValueContainer,
        }}
        value={selectedWarehouses}
        onChange={handleChange}
        filterOption={filteredOptions}
        options={optionsWithSelectAll}
        placeholder="Search or select Warehouses"
        menuShouldScrollIntoView={false}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        onInputChange={onInputChange}
        menuIsOpen={menuIsOpen} 
        classNamePrefix="custom-select"
      />
      </div>
    </div>
  );
};

export default WH;
