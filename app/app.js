import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track
    state = {
        title: 'Bike in a Playground',
    };

//these would be ostensibly to wire up to comboboxes. 
    // get frontGears() {
    //     return this.bike.frontGearTeeth.map(
    //         (currentValue, index) => {
    //             return {
    //                 label: currentValue, 
    //                 value: index,
    //             };
    //         }
    //     );
    // }

    // get rearGears() {
    //     return this.bike.rearGearTeeth.map(
    //         (currentValue, index) => {
    //             return {
    //                 label: currentValue, 
    //                 value: index,
    //             };
    //         }
    //     );
    // }

}
