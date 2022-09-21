import { createSignal } from 'solid-js';
import styles from './SlideToggle.module.css';

export function SlideToggle(props: any) {
	const [getChecked, setChecked] = createSignal(false);
	const bitFlipped = (e: any): void => {
		setChecked(!getChecked());
		props.bitValue.bitValue = getChecked();
		console.log('bit flipped!', props);
	};
	return (
		<div class={styles.slidetoggle}>
			<label class={styles.slidetogglelabel} for={'slide-toggle-input-' + props.index}>
				<span class={styles.slidetogglebar} classList={{ [styles.checked]: getChecked()}}>
					<input 
						id={'slide-toggle-input-' + props.index} 
						class={styles.slidetoggleinput} 
						type='checkbox' 
						role='switch' 
						tabIndex={0} 
						checked={getChecked()} 
						onClick={bitFlipped}
					>
					</input>
					<span class={styles.slidetogglethumbcontainer}>
						<span class={styles.slidetogglethumb}></span>
						<span class={styles.slidetogglefocusindicator}>
							<span class={styles.slidetogglepersistentripple}></span>
						</span>
					</span>
				</span>
			</label>
		</div>
	);
}
