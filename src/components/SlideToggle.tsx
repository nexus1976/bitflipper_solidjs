import { createSignal } from 'solid-js';

export function SlideToggle(props: any) {
	const [getChecked, setChecked] = createSignal(false);
	const bitFlipped = (e: any): void => {
		console.log('bit flipped!', props);
		setChecked(!getChecked());
	};
	return (
		<div class='slide-toggle'>
			<label class='slide-toggle-label' for={'slide-toggle-input-' + props.index}>
				<span class='slide-toggle-bar'>
					<input 
						id={'slide-toggle-input-' + props.index} 
						class='slide-toggle-input' 
						type='checkbox' 
						role='switch' 
						tabIndex={0} 
						checked={getChecked()} 
						onClick={bitFlipped}
					>
					</input>
					<span class='slide-toggle-thumb-container'>
						<span class='slide-toggle-thumb'></span>
					</span>
				</span>
			</label>
		</div>
	);
}
