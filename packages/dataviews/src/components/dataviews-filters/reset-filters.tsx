import type { RefObject } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import type { NormalizedFilter, View } from '../../types';

interface ResetFilterProps {
	filters: NormalizedFilter[];
	view: View;
	onChangeView: ( view: View ) => void;
	addFilterRef?: RefObject< HTMLButtonElement | null >;
}

export default function ResetFilter( {
	filters,
	view,
	onChangeView,
	addFilterRef,
}: ResetFilterProps ) {
	const isPrimary = ( field: string ) =>
		filters.some(
			( _filter ) => _filter.field === field && _filter.isPrimary
		);
	const isDisabled =
		! view.search &&
		! view.filters?.some(
			( _filter ) =>
				! _filter.isLocked &&
				( _filter.value !== undefined || ! isPrimary( _filter.field ) )
		);
	return (
		<Button
			disabled={ isDisabled }
			accessibleWhenDisabled
			size="compact"
			variant="tertiary"
			className="dataviews-filters__reset-button"
			onClick={ () => {
				onChangeView( {
					...view,
					page: 1,
					search: '',
					filters:
						view.filters?.filter( ( f ) => !! f.isLocked ) || [],
				} );
				// The button becomes disabled (and visually hidden) after
				// resetting, so move focus to a stable control.
				addFilterRef?.current?.focus();
			} }
		>
			{ __( 'Reset' ) }
		</Button>
	);
}
