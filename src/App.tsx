import type { Component } from 'solid-js';
import { createSignal, createEffect, For } from 'solid-js';
import { BitnessSelector } from './components/BitnessSelector';
import { SlideToggle } from './components/SlideToggle';
import { BitnessEnum, ConvertToNumber } from './enums';
import styles from './App.module.css';

const App: Component = () => {
  const [currentBitness, setCurrentBitness] = createSignal(BitnessEnum.Bitness8);
  const [bitMap, setBitMap] = createSignal(new Array<IBitValueObject>());
  
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
  
  createEffect(() => hydrateBitMap(currentBitness()));
  
  return (
    <div class={styles.App}>
      <div>
        <BitnessSelector bitness={currentBitness} setBitness={setCurrentBitness} />
      </div>
      <br />
      <span class={styles.bitfliphorizontal}>
        <For each={bitMap()}>
          {(item, index) => (
            <SlideToggle index={index()} bitValue={item} />
          )}
        </For>
      </span>
    </div>
  );
};

export default App;
