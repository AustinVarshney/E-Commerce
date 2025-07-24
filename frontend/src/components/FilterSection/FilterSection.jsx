import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import './FilterSection.scss';

const colors = [
    { name: 'Red', hex: 'red' },
    { name: 'Blue', hex: 'blue' },
    { name: 'Green', hex: 'green' },
    { name: 'Yellow', hex: 'yellow' },
    { name: 'Black', hex: 'black' },
    { name: 'Purple', hex: 'purple' },
    { name: 'Orange', hex: 'orange' },
];

const ratings = [4, 3, 2, 1];

const weights = [
    'Under 1kg',
    '1kg - 1.5kg',
    '1.5kg - 2kg',
    '2kg - 2.5kg',
    '2.5kg - 3kg',
    'Above 3kg',
];
const FilterSection = ({ handleFilterSection }) => {
    const initialMinPrice = 49;
    const initialMaxPrice = 10000;
    const minGap = 5;
    const [sliderMinValue] = useState(initialMinPrice);
    const [sliderMaxValue] = useState(initialMaxPrice);

    const [minVal, setMinVal] = useState(initialMinPrice);
    const [maxVal, setMaxVal] = useState(initialMaxPrice);
    const [minInput, setMinInput] = useState(initialMinPrice);
    const [maxInput, setMaxInput] = useState(initialMaxPrice);

    const slideMin = (
        e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= sliderMinValue && maxVal - value >= minGap) {
            setMinVal(value);
            setMinInput(value);
        }
    };

    const slideMax = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value <= sliderMaxValue && value - minVal >= minGap) {
            setMaxVal(value);
            setMaxInput(value);
        }
    };

    const handleMinInput = (e) => {
        const value =
            e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
        if (value >= sliderMinValue && value < maxVal - minGap) {
            setMinInput(value);
            setMinVal(value);
        }
    };

    const handleMaxInput = (e) => {
        const value =
            e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
        if (value <= sliderMaxValue && value > minVal + minGap) {
            setMaxInput(value);
            setMaxVal(value);
        }
    };

    const handleInputKeyDown = (e, type) => {
        if (e.key === "Enter") {
            const value = parseInt(e.target.value, 10);
            if (
                type === "min" &&
                value >= sliderMinValue &&
                value < maxVal - minGap
            ) {
                setMinVal(value);
            } else if (
                type === "max" &&
                value <= sliderMaxValue &&
                value > minVal + minGap
            ) {
                setMaxVal(value);
            }
        }
    };

    const setSliderTrack = () => {
        const range = document.querySelector(".slider-track");

        if (range) {
            const minPercent =
                ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
            const maxPercent =
                ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

            range.style.left = `${minPercent}%`;
            range.style.right = `${100 - maxPercent}%`;
        }
    };

    useEffect(() => {
        setSliderTrack();
    }, [minVal, maxVal]);

    return (
        <>
            <div className='filter-section'>
                <p className='filter-close-icon'><CloseIcon onClick={handleFilterSection} /></p>
                <div className="double-slider-box">
                    <div className="input-box">
                        <div className="min-box">
                            <p style={{ paddingLeft: "0.8rem", paddingBottom: "0.2rem" }}>Min</p>
                            <input
                                type="number"
                                placeholder='min'
                                value={minInput}
                                onChange={handleMinInput}
                                onKeyDown={(e) => handleInputKeyDown(e, "min")}
                                className="min-input"
                                min={sliderMinValue}
                                max={maxVal - minGap}
                            />
                        </div>
                        <div className="max-box">
                            <p style={{ textAlign: "end", paddingRight: "0.8rem", paddingBottom: "0.2rem" }}>Max</p>
                            <input
                                type="number"
                                value={maxInput}
                                onChange={handleMaxInput}
                                onKeyDown={(e) => handleInputKeyDown(e, "max")}
                                className="max-input"
                                min={minVal + minGap}
                                max={sliderMaxValue}
                            />
                        </div>
                    </div>
                    <div className="range-slider">
                        <div className="slider-track"></div>
                        <input
                            type="range"
                            min={sliderMinValue}
                            max={sliderMaxValue}
                            value={minVal}
                            onChange={slideMin}
                            className="min-val"
                        />
                        <input
                            type="range"
                            min={sliderMinValue}
                            max={sliderMaxValue}
                            value={maxVal}
                            onChange={slideMax}
                            className="max-val"
                        />
                    </div>

                </div>
                <hr style={{ width: '95%', opacity: '0.2' }} />

                <div className='filter_features'>
                    <div className="color-container">
                        <p>Color</p>
                        <div className="color-details-wrapper">
                            {colors.map((color, index) => (
                                <div className="color-details" key={index}>
                                    <input type="checkbox" id={`color-${color.name}`} />
                                    <label htmlFor={`color-${color.name}`}>
                                        <div
                                            style={{
                                                height: '0.7rem',
                                                width: '0.7rem',
                                                borderRadius: '50%',
                                                backgroundColor: color.hex,
                                                display: 'inline-block',
                                                marginRight: '0.5rem',
                                            }}
                                        ></div>
                                        <span>{color.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Rating</h3>
                        <div className="rating-options">
                            {ratings.map((stars) => (
                                <label key={stars} className="rating-option">
                                    <input type="radio" name="rating" />
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span key={i} className={i <= stars ? 'star filled' : 'star'}>★</span>
                                        ))}
                                    </div>
                                    <span>&nbsp;& above</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Weight</h3>
                        <div className="weight-options">
                            {weights.map((weight) => (
                                <label key={weight} className="weight-option">
                                    <input type="checkbox" />
                                    <span>{weight}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='filter-page-buttons'>
                    <button>Clear Filter</button>
                    <button>Apply Filter</button>
                </div>
            </div >
        </>
    )
}

export default FilterSection
