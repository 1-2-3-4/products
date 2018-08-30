import React from 'react';

class Dropdown extends React.Component {
	render() {
		const { label, prodOptions, handleChange, prodId } = this.props;
		return (
			<div className="products__dropdown">
				<label>{ label }</label>
				<select onChange={ (e) => handleChange(e, prodId, label) }>
					<option value="">Select</option>
					{
						prodOptions.map(prodOption => {
							return <option key={ prodOption + prodId } value={ prodOption }>{ prodOption }</option>
						})
					}
				</select>
			</div>
		)
	}
}

export default Dropdown;