import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import styles from './App.module.css';

interface IBitnessValueObject {
	bitnessValue: BitnessEnum,
	bitnessDisplay: string
}
declare enum BitnessEnum {
	Bitness8 = 0,
	Bitness16 = 1,
	Bitness32 = 2,
	Bitness64 = 3
}

const App: Component = () => {
  const [currentBitness, setCurrentBitness] = createSignal(BitnessEnum.Bitness8);
	const [bitnessValues, setBitnessValues] = createSignal(new Array<IBitnessValueObject>);
  
  const getMaxBitPositions = (bitness: BitnessEnum): Number => {
    switch (bitness) {
      case BitnessEnum.Bitness8:
        return 8;
      case BitnessEnum.Bitness16:
        return 16;
      case BitnessEnum.Bitness32:
        return 32;
      case BitnessEnum.Bitness64:
        return 64;
      default:
        return 8;
    }
  };
  const hydrateBitnessValues = (): void => {
    const bvs = new Array<IBitnessValueObject>();
    bvs.push({
      bitnessValue: BitnessEnum.Bitness8,
      bitnessDisplay: "8 bits"
    });
    bvs.push({
      bitnessValue: BitnessEnum.Bitness16,
      bitnessDisplay: "16 bits"
    });
    bvs.push({
      bitnessValue: BitnessEnum.Bitness32,
      bitnessDisplay: "32 bits"
    });
    setBitnessValues(bvs);
    // saving 64 bits for later
    // this.bitnessValues.push({
    //   bitnessValue: BitnessEnum.Bitness64,
    //   bitnessDisplay: "64 bits"
    // });        
  }
  const bitnessChange = (e): void => {
    console.log(e.currentTarget.value);
  };
  return (
    <div class={styles.App}>
      <div>
        <span class='bit-flip-bitness'>
          <label><b>Bitness: </b></label>
          <select name='bitness' id='bitness' value={currentBitness()} onchange={bitnessChange}>
            <For each={bitnessValues()} fallback={<div>Loading...</div>}>
              {(item) => <option value={item.bitnessValue}>{item.bitnessDisplay}</option>}
            </For>
          </select>
        </span>
      </div>
    </div>
  );
};

export default App;
