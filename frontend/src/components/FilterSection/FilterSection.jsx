import React, { useState } from 'react'
import './FilterSection.scss'
import CloseIcon from '@mui/icons-material/Close';

const FilterSection = ({ handleFilterSection }) => {
    const initialState = {
        minVal: 1,
        maxVal: 1000,
        currentMinVal: 1,
        currentMaxVal: 1000
    };

    const [dispatch, setDispatch] = useState(initialState);

    const onMinSliderChange = (e) => {
        setDispatch({
            payload: { value: e.currentTarget.value }
        });
    };

    const onMaxSliderChange = (e) => {
        setDispatch({
            payload: { value: e.currentTarget.value }
        });
    };

    return (
        <div className='filter-section'>
            <div className='filter-headings'>
                <p className='filter-heading'>Filters</p>
                <p className='filter-close-icon'><CloseIcon onClick={handleFilterSection} /></p>
            </div>

            <div className='price-filters'>
                <div className='min-price-filter'>
                    <label htmlFor="min-price" className='min-price-label'>Min. Price</label>
                    <input type="number" id='min-price' placeholder='Price(in Rs)' className='min-price-input' />
                </div>
                <div className='max-price-filter'>
                    <label htmlFor="max-price" className='max-price-label'>Max. Price</label>
                    <input type="number" id='max-price' placeholder='Price(in Rs)' className='max-price-input' />
                </div>
            </div>

            <div className="slidervDiv">
                <label htmlFor="a">{dispatch.currentMinVal}</label>
                <input
                    name="a"
                    min={dispatch.minVal}
                    max={dispatch.maxVal}
                    onChange={onMinSliderChange}
                    type="range"
                    value={dispatch.currentMinVal}
                />
                <input
                    name="b"
                    min={dispatch.minVal}
                    max={dispatch.maxVal}
                    className="b"
                    onChange={onMaxSliderChange}
                    type="range"
                    value={dispatch.currentMaxVal}
                />
                <label htmlFor="b">{dispatch.currentMaxVal}</label>
            </div>

        </div>
    )
}

export default FilterSection
