import React from 'react'

function Search(props) {
    // STATE 
    const [searching, setSearching] = React.useState(false);
    //
    // ─── STATE FROM ABOVE ──────────────────────────────────────────────────────────────────────
   const {search, setSearch, fetchSearch, searchres, setSearchres} = props;

    // Handel Submit
    const handleSubmit = (e)=>{
        e.preventDefault();
        // Fetch search
        fetchSearch(search);
        // Reset search
        setSearch('');
        // Set Searching
        setSearching(true);
    }

    // Handle reset search
    const handleReset = ()=>{
         setSearchres([]);
        setSearching(false);
    }

    //
    // ─── RETURN ─────────────────────────────────────────────────────────────────────
    
    return (
        <div>
            <form onSubmit={handleSubmit} >
            <input 
            className='search-input'
            placeholder='Search'
            type="text"
            value={search}
            onChange={e=> setSearch(e.target.value)}
            /> <span onClick={handleSubmit} className='search-icon-container'> 
            {searchres.length > 0 ?
            (
            <>
            <span onClick={handleSubmit} className='search-icon' role='img' aria-label='search'>🔍</span>
            <span onClick={handleReset} className='search-icon' role='img' aria-label='close'>❌</span>
            </>
            )
            :
            <>
            <span className='search-icon' role='img' aria-label='search'>🔍</span>
           
            </>
            }
            </span>
            </form>
           
        </div>
    )
}

// Export with memo
export default React.memo(Search);