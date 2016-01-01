import getFormElementType from './getFormElementType';

function selectValues( node ) {
	const result = [];
	const index = node.selectedIndex;
	const options = node.options;
	const length = options.length;
	let option;
	let i = index < 0 ? length : 0;

	for ( ; i < length; i++ ) {

		option = options[i];

		let selected = option.selected || option.getAttribute('selected')

		// IMPORTANT! IE9 doesn't update selected after form reset
		if ( ( option.selected || i === index ) &&
				// Don't return options that are disabled or in a disabled optgroup
			!option.disabled && ( !option.parentNode.disabled || option.parentNode.nodeName !== 'OPTGROUP' ) ) {
			result.push( option.value );
		}
	}
	if ( result.length < 2) {
		return result[0];
	}
	return result;
}

export default function getFormElementValues( node ) {
	const name = getFormElementType( node );

	switch ( name ) {
		case 'checkbox':
		case 'radio':
			const checked = node.getAttribute('checked') || node.checked;

			if ( checked ) {
				if ( checked === false || checked === 'false') {
					return false;
				} else {
					return true;
				}
			}
			return false;
		case 'select-multiple':
			return selectValues( node );
		default:
			return node.value;
	}
}
