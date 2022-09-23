import type { Component } from 'solid-js';
import { createSignal, createEffect, For } from 'solid-js';
import { BitnessSelector } from './components/BitnessSelector';
import { SlideToggle, IBitValueObject } from './components/SlideToggle';
import { BitnessEnum, ConvertToNumber } from './enums';
import styles from './App.module.css';

const App: Component = () => {
  const [currentBitness, setCurrentBitness] = createSignal(BitnessEnum.Bitness8);
  const [bitMap, setBitMap] = createSignal(new Array<IBitValueObject>());
  const [bitsValue, setBitsValue] = createSignal('');
  
  const hydrateBitMap = (bitnessEnum: BitnessEnum): void => {
    const bitArray: Array<IBitValueObject> = new Array<IBitValueObject>();
    const maxBitPositions: Number = ConvertToNumber(bitnessEnum);
    let currentBitPos: number = 1;
    for (let index = 0; index < maxBitPositions; index++) {
      const el: IBitValueObject = {
        bitPos: currentBitPos,
        bitValue: false
      };
      bitArray.push(el);
      currentBitPos = currentBitPos * 2;
    }
    bitArray.sort((a, b) => b.bitPos - a.bitPos);
    setBitMap(bitArray);
  };
  const hydrateBitsValue = (arr: Array<IBitValueObject>): void => {
    let bitValue = '';
    for (let index = 0; index < arr.length; index++) {
      bitValue += (arr[index].bitValue ? '1' : '0');
    }
    setBitsValue(bitValue);
  };
  
  createEffect(() => hydrateBitMap(currentBitness()));
  createEffect(() => hydrateBitsValue(bitMap()));
  
  return (
    <div class={styles.App}>
      <div>
        <BitnessSelector bitness={currentBitness} setBitness={setCurrentBitness} />
      </div>
      <br />
      <span class={styles.bitfliphorizontal}>
        <For each={bitMap()}>
          {(item, index) => (
            <SlideToggle index={index()} componentData={item} />
          )}
        </For>
      </span>
      <br />
      <br />
      <span><label class={styles.bitslabel}>Bits: </label>{bitsValue()}</span>
      <br />
      <label class={styles.bitslabel}>Decimal Value: </label>
      <br />
      <label class={styles.bitslabel}>Hexadecimal Value: </label>
      <br />            
    </div>
  );
};

export default App;
