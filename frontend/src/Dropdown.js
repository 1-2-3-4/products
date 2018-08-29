import React from 'react';

class Dropdown extends React.Component {
	render() {
		const { label, prodOptions, prodKey } = this.props;
		return (
			<div className="products__dropdown">
				<label>{ label }</label>
				<select>
					<option val="">Select</option>
					{
						prodOptions.map(prodOptions => {
							return <option key={ prodOption[label] } value={ prodOption[label] }>{ prodOption[label] }</option>
						})
					}
				</select>
			</div>
		)
	}
}

export default Dropdown;