import React from "react";
import {Dropdown} from "semantic-ui-react";

export default function SelectFilter( { value, setValue, options, multiple } ) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearchChange = (e, { searchQuery }) => setSearchQuery( searchQuery );

    const handleQueryChange = (e, data) => {
        setSearchQuery(data.searchQuery);
        setValue(data.value);
    }

    return  <Dropdown
        fluid
        multiple={multiple}
        onChange={handleQueryChange}
        onSearchChange={handleSearchChange}
        options={options}
        placeholder='Seleccione una opción'
        search
        searchQuery={searchQuery}
        selection
        value={value}
    />;
}